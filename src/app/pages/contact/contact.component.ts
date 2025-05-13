import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ActivatedRoute } from '@angular/router';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatCheckboxModule,
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
})
export class ContactComponent {
  mail: string | null = null;
  etab: string | null = null;
  contactForm: FormGroup;
  submitted = false;
  successMsg = '';
  errorMsg = '';

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private titleService: Title,
    private metaService: Meta
  ) {
    this.route.queryParamMap.subscribe((params) => {
      this.mail = params.get('mail');
      this.etab = params.get('etab');
    });
    this.contactForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      objet: [
        this.etab ? `Contact établissement : ${this.etab}` : '',
        Validators.required,
      ],
      message: [
        this.etab
          ? `Bonjour, je souhaite contacter l'établissement ${this.etab}.`
          : '',
        Validators.required,
      ],
      cgu: [false, Validators.requiredTrue],
    });

    this.titleService.setTitle('Contact | School finder Nantes');
    this.metaService.updateTag({
      name: 'description',
      content:
        'Formulaire de contact fictif pour School finder Nantes. Retrouvez ici comment nous joindre ou poser vos questions.',
    });
    this.metaService.updateTag({
      property: 'og:title',
      content: 'Contact | School finder Nantes',
    });
    this.metaService.updateTag({
      property: 'og:description',
      content:
        'Formulaire de contact fictif pour School finder Nantes. Retrouvez ici comment nous joindre ou poser vos questions.',
    });
    this.metaService.updateTag({
      property: 'og:type',
      content: 'website',
    });
    this.metaService.updateTag({
      property: 'og:url',
      content: 'https://sato-isolated.github.io/school-finder-nantes/contact',
    });
    this.metaService.updateTag({
      property: 'og:image',
      content: '/assets/img/logo.jpg',
    });
    this.metaService.updateTag({
      name: 'keywords',
      content: 'école, collège, lycée, Nantes, recherche, établissement scolaire, inscription, éducation, carte, comparaison, public, privé'
    });
  }

  onSubmit() {
    this.submitted = true;
    this.successMsg = '';
    this.errorMsg = '';
    if (this.contactForm.invalid) {
      return;
    }
    // Simulate sending (mock)
    setTimeout(() => {
      this.successMsg = 'Votre message a bien été envoyé à l’établissement.';
      this.contactForm.reset({
        objet: this.contactForm.value.objet,
        message: this.contactForm.value.message,
        cgu: false,
      });
      this.submitted = false;
    }, 1000);
  }
}
