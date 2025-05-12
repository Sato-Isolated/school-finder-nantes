import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';
import { SchoolDetailsModalComponent } from '../../components/modal/school-details-modal.component';
import { EtablissementService } from '../../services/etablissement/etablissement.service';
import { EtablissementModel, Result } from '../../models/etablissement.model';
import { DOCUMENT } from '@angular/common';
import { fromEvent, Subject } from 'rxjs';
import { takeUntil, filter, throttleTime } from 'rxjs/operators';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-search',
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatProgressBarModule,
    MatIconModule,
    MatGridListModule,
    MatChipsModule,
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
  providers: [EtablissementService],
})
export class SearchComponent implements OnInit, OnDestroy {
  searchTerm: string = '';
  loading = false;
  filters = {
    type: '',
    statut: '',
    onlyAvailable: false,
    elevesMin: null as number | null,
    elevesMax: null as number | null,
    restauration: false,
    hebergement: false,
    ulis: false,
    voie_generale: false,
    voie_technologique: false,
    voie_professionnelle: false,
    anneeMin: null as number | null,
    anneeMax: null as number | null,
    section_sport: false,
    section_europeenne: false,
  };
  results: Array<{
    name: string;
    type: string;
    description: string;
    available?: boolean;
  }> = [];
  schools: Result[] = [];
  page = 0;
  limit = 20;
  hasMore = true;
  showScrollTop = false;
  totalCount: number | null = null;
  expandedCards: boolean[] = [];
  private destroy$ = new Subject<void>();
  isSmallScreen = false;

  constructor(
    private etablissementService: EtablissementService,
    @Inject(DOCUMENT) private document: Document,
    private dialog: MatDialog,
    private breakpointObserver: BreakpointObserver
  ) {
    this.breakpointObserver.observe([Breakpoints.Handset, '(max-width: 600px)'])
      .subscribe(result => {
        this.isSmallScreen = result.matches;
      });
  }

  ngOnInit() {
    this.etablissementService.getSchools(1, 0).subscribe({
      next: (data) => {
        this.totalCount = data.total_count;
      },
      error: () => {
        this.totalCount = null;
      },
    });
    this.loadSchools();
    fromEvent(window, 'scroll')
      .pipe(throttleTime(200), takeUntil(this.destroy$))
      .subscribe(() => {
        // Infinite scroll : ne charge que si on a scrollé à 80% ou plus de la page
        const scrollPosition = window.scrollY + window.innerHeight;
        const pageHeight = this.document.body.offsetHeight;
        const percentScrolled = scrollPosition / pageHeight;
        if (this.hasMore && !this.loading && percentScrolled >= 0.8) {
          this.loadSchools();
        }
        // Affichage du bouton scroll top
        this.showScrollTop = window.scrollY > 600;
      });
  }

  get filteredSchools(): Result[] {
    if (!this.searchTerm.trim()) {
      return this.schools;
    }
    const term = this.searchTerm.trim().toLowerCase();
    return this.schools.filter(
      (ecole) =>
        ecole.nom_etablissement.toLowerCase().includes(term) ||
        ecole.type_etablissement.toLowerCase().includes(term) ||
        ecole.statut_public_prive.toLowerCase().includes(term) ||
        ecole.nom_commune.toLowerCase().includes(term) ||
        ecole.code_postal.toLowerCase().includes(term)
    );
  }

  onStatutChange(statut: string) {
    this.filters.statut = statut;
    this.page = 0;
    this.schools = [];
    this.hasMore = true;
    this.updateTotalCount();
    this.loadSchools(true);
  }

  onAnyFilterChange() {
    this.page = 0;
    this.schools = [];
    this.hasMore = true;
    this.updateTotalCount();
    this.loadSchools(true);
  }

  resetFilters() {
    this.filters = {
      type: '',
      statut: '',
      onlyAvailable: false,
      elevesMin: null,
      elevesMax: null,
      restauration: false,
      hebergement: false,
      ulis: false,
      voie_generale: false,
      voie_technologique: false,
      voie_professionnelle: false,
      anneeMin: null,
      anneeMax: null,
      section_sport: false,
      section_europeenne: false,
    };
    this.page = 0;
    this.schools = [];
    this.hasMore = true;
    this.updateTotalCount();
    this.loadSchools(true);
  }

  updateTotalCount() {
    this.etablissementService
      .getSchools(1, 0, {
        statut: this.filters.statut,
        type: this.filters.type,
        elevesMin: this.filters.elevesMin,
        elevesMax: this.filters.elevesMax,
        restauration: this.filters.restauration,
        hebergement: this.filters.hebergement,
        ulis: this.filters.ulis,
        voie_generale: this.filters.voie_generale,
        voie_technologique: this.filters.voie_technologique,
        voie_professionnelle: this.filters.voie_professionnelle,
        anneeMin: this.filters.anneeMin,
        anneeMax: this.filters.anneeMax,
        section_sport: this.filters.section_sport,
        section_europeenne: this.filters.section_europeenne,
      })
      .subscribe({
        next: (data) => {
          this.totalCount = data.total_count;
        },
        error: () => {
          this.totalCount = null;
        },
      });
  }

  loadSchools(reset = false) {
    if (this.loading || !this.hasMore) return;
    this.loading = true;
    const pageToLoad = reset ? 0 : this.page;
    this.etablissementService
      .getSchools(this.limit, pageToLoad * this.limit, {
        statut: this.filters.statut,
        type: this.filters.type,
        elevesMin: this.filters.elevesMin,
        elevesMax: this.filters.elevesMax,
        restauration: this.filters.restauration,
        hebergement: this.filters.hebergement,
        ulis: this.filters.ulis,
        voie_generale: this.filters.voie_generale,
        voie_technologique: this.filters.voie_technologique,
        voie_professionnelle: this.filters.voie_professionnelle,
        anneeMin: this.filters.anneeMin,
        anneeMax: this.filters.anneeMax,
        section_sport: this.filters.section_sport,
        section_europeenne: this.filters.section_europeenne,
      })
      .subscribe({
        next: (data) => {
          this.schools = reset
            ? data.results || []
            : [...this.schools, ...(data.results || [])];
          this.page = pageToLoad + 1;
          this.hasMore = (data.results?.length || 0) === this.limit;
          this.loading = false;
          // Réinitialise l'état d'expansion des cards
          if (reset) {
            this.expandedCards = new Array(this.schools.length).fill(false);
          } else {
            this.expandedCards = this.expandedCards.concat(
              new Array(data.results?.length || 0).fill(false)
            );
          }
        },
        error: () => {
          this.loading = false;
        },
      });
  }

  openDetails(ecole: any) {
    this.dialog.open(SchoolDetailsModalComponent, {
      data: ecole,
      width: '480px',
      maxWidth: '95vw',
      autoFocus: false,
      restoreFocus: false,
    });
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
