// Composant Angular pour la modale de détails d'un établissement scolaire
import { Component, Inject, AfterViewInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import * as L from 'leaflet';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-school-details-modal',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './school-details-modal.component.html',
  styleUrl: './school-details-modal.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SchoolDetailsModalComponent implements AfterViewInit, OnDestroy {
  // Indique si l'écran est petit (mobile)
  isSmallScreen = false;
  // Souscription pour observer les changements de taille d'écran
  private breakpointSub: Subscription;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any, // Données injectées dans la modale
    private dialogRef: MatDialogRef<SchoolDetailsModalComponent>, // Référence à la modale pour la fermer
    private breakpointObserver: BreakpointObserver // Service pour détecter la taille de l'écran
  ) {
    // Souscription à l'observateur de breakpoint pour adapter l'affichage mobile
    this.breakpointSub = this.breakpointObserver.observe([Breakpoints.Handset, '(max-width: 600px)'])
      .subscribe(result => {
        this.isSmallScreen = result.matches;
      });
  }

  // Ferme la modale
  closeModal() {
    this.dialogRef.close();
  }

  // Ferme la modale puis redirige vers la page de contact avec les infos pré-remplies
  contactSchool() {
    this.dialogRef.close();
    window.setTimeout(() => {
      window.location.href =
        '/contact?mail=' +
        encodeURIComponent(this.data.mail) +
        '&etab=' +
        encodeURIComponent(this.data.nom_etablissement);
    }, 150);
  }

  // Initialise la carte Leaflet après le rendu de la vue
  ngAfterViewInit(): void {
    if (this.data.latitude && this.data.longitude) {
      // Correction du chemin des icônes Leaflet pour Angular
      // @ts-ignore
      delete L.Icon.Default.prototype._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl:
          'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        shadowUrl:
          'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      });
      // Création de la carte centrée sur l'établissement
      const map = L.map('school-map', {
        center: [this.data.latitude, this.data.longitude],
        zoom: 16,
        scrollWheelZoom: true, // Permet le zoom à la molette
        attributionControl: false,
      });
      // Ajout des tuiles OpenStreetMap
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);
      // Ajout du marqueur sur la carte
      L.marker([this.data.latitude, this.data.longitude])
        .addTo(map)
        .bindPopup(this.data.nom_etablissement || 'Établissement')
        .openPopup();
      // Correction du redimensionnement de la carte
      setTimeout(() => {
        map.invalidateSize();
      }, 200);
    }
  }

  // Désabonnement lors de la destruction du composant pour éviter les fuites mémoire
  ngOnDestroy(): void {
    this.breakpointSub.unsubscribe();
  }
}
