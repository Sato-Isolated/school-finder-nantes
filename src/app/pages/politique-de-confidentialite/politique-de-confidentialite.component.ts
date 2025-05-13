import { Component } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-politique-de-confidentialite',
  imports: [],
  templateUrl: './politique-de-confidentialite.component.html',
  styleUrl: './politique-de-confidentialite.component.css',
})
export class PolitiqueDeConfidentialiteComponent {
  constructor(private titleService: Title, private metaService: Meta) {
    this.titleService.setTitle(
      'Politique de confidentialité | School finder Nantes'
    );
    this.metaService.updateTag({
      name: 'description',
      content:
        'Politique de confidentialité de School finder Nantes : gestion des données personnelles, respect de la vie privée et droits des utilisateurs.',
    });
    this.metaService.updateTag({
      property: 'og:title',
      content: 'Politique de confidentialité | School finder Nantes',
    });
    this.metaService.updateTag({
      property: 'og:description',
      content:
        'Politique de confidentialité de School finder Nantes : gestion des données personnelles, respect de la vie privée et droits des utilisateurs.',
    });
    this.metaService.updateTag({
      property: 'og:type',
      content: 'website',
    });
    this.metaService.updateTag({
      property: 'og:url',
      content:
        'https://sato-isolated.github.io/school-finder-nantes/politique-de-confidentialite',
    });
    this.metaService.updateTag({
      property: 'og:image',
      content: '/assets/img/logo.jpg',
    });
  }
}
