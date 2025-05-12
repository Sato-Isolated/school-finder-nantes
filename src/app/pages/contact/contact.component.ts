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

  constructor(private route: ActivatedRoute, private fb: FormBuilder) {
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
