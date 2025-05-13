import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-mentions-legales',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './mentions-legales.component.html',
  styleUrl: './mentions-legales.component.css',
})
export class MentionsLegalesComponent {
  constructor(private titleService: Title, private metaService: Meta) {
    this.titleService.setTitle('Mentions légales | School finder Nantes');
    this.metaService.updateTag({
      name: 'description',
      content:
        "Mentions légales du site School finder Nantes : informations sur l'éditeur, la propriété, la responsabilité et la protection des données.",
    });
    this.metaService.updateTag({
      property: 'og:title',
      content: 'Mentions légales | School finder Nantes',
    });
    this.metaService.updateTag({
      property: 'og:description',
      content:
        "Mentions légales du site School finder Nantes : informations sur l'éditeur, la propriété, la responsabilité et la protection des données.",
    });
    this.metaService.updateTag({
      property: 'og:type',
      content: 'website',
    });
    this.metaService.updateTag({
      property: 'og:url',
      content:
        'https://sato-isolated.github.io/school-finder-nantes/mentions-legales',
    });
    this.metaService.updateTag({
      property: 'og:image',
      content: '/assets/img/logo.jpg',
    });
    this.metaService.updateTag({
      rel: 'canonical',
      href: 'https://sato-isolated.github.io/school-finder-nantes/mentions-legales',
    });
    this.metaService.updateTag({
      name: 'keywords',
      content: 'école, collège, lycée, Nantes, recherche, établissement scolaire, inscription, éducation, carte, comparaison, public, privé'
    });
  }
}
