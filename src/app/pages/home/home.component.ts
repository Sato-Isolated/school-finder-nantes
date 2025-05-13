import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { EtablissementService } from '../../services/etablissement/etablissement.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  totalSchools$!: Observable<number>;

  constructor(
    private etablissementService: EtablissementService,
    private router: Router,
    private titleService: Title,
    private metaService: Meta
  ) {}

  ngOnInit(): void {
    this.totalSchools$ = this.etablissementService.getTotalSchools$();
    this.titleService.setTitle(
      'School finder Nantes | Trouvez votre école, collège ou lycée à Nantes'
    );
    this.metaService.updateTag({
      name: 'description',
      content:
        'Trouvez, comparez et explorez tous les établissements scolaires publics et privés à Nantes et sa métropole. Plateforme gratuite, sans publicité, respectueuse de la vie privée.',
    });
    this.metaService.updateTag({
      property: 'og:title',
      content:
        'School finder Nantes | Trouvez votre établissement scolaire à Nantes',
    });
    this.metaService.updateTag({
      property: 'og:description',
      content:
        "Recherche avancée d'écoles, collèges et lycées à Nantes. Plateforme gratuite, résultats fiables, respect de la vie privée.",
    });
    this.metaService.updateTag({
      property: 'og:type',
      content: 'website',
    });
    this.metaService.updateTag({
      property: 'og:url',
      content: 'https://sato-isolated.github.io/school-finder-nantes/',
    });
    this.metaService.updateTag({
      property: 'og:image',
      content: '/assets/img/logo.jpg',
    });
    this.metaService.updateTag({
      name: 'canonical',
      content: 'https://sato-isolated.github.io/school-finder-nantes/',
    });
  }

  goToSearch() {
    this.router.navigate(['/search']);
  }
}
