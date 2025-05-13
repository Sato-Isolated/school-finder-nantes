import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.css',
})
export class FaqComponent {
  opened: boolean[] = [false, false, false, false, false];

  constructor(private titleService: Title, private metaService: Meta) {
    this.titleService.setTitle('FAQ | School finder Nantes');
    this.metaService.updateTag({
      name: 'description',
      content:
        "Questions fréquentes sur l'utilisation de School finder Nantes, la fiabilité des données et la confidentialité.",
    });
    this.metaService.updateTag({
      property: 'og:title',
      content: 'FAQ | School finder Nantes',
    });
    this.metaService.updateTag({
      property: 'og:description',
      content:
        "Questions fréquentes sur l'utilisation de School finder Nantes, la fiabilité des données et la confidentialité.",
    });
    this.metaService.updateTag({
      property: 'og:type',
      content: 'website',
    });
    this.metaService.updateTag({
      property: 'og:url',
      content: 'https://sato-isolated.github.io/school-finder-nantes/faq',
    });
    this.metaService.updateTag({
      property: 'og:image',
      content: '/assets/img/logo.jpg',
    });
  }

  toggle(idx: number) {
    this.opened[idx] = !this.opened[idx];
  }
}
