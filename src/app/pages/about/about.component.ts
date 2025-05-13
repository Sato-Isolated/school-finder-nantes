import { Component } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css',
})
export class AboutComponent {
  constructor(private titleService: Title, private metaService: Meta) {
    this.titleService.setTitle('À propos | School finder Nantes');
    this.metaService.updateTag({
      name: 'description',
      content:
        'Présentation, vision et fonctionnement de la plateforme School finder Nantes. Découvrez notre mission et nos sources de données.',
    });
    this.metaService.updateTag({
      property: 'og:title',
      content: 'À propos | School finder Nantes',
    });
    this.metaService.updateTag({
      property: 'og:description',
      content:
        'Présentation, vision et fonctionnement de la plateforme School finder Nantes. Découvrez notre mission et nos sources de données.',
    });
    this.metaService.updateTag({
      property: 'og:type',
      content: 'website',
    });
    this.metaService.updateTag({
      property: 'og:url',
      content: 'https://sato-isolated.github.io/school-finder-nantes/about',
    });
    this.metaService.updateTag({
      property: 'og:image',
      content: '/assets/img/logo.jpg',
    });
  }
}
