import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { EtablissementService } from '../../services/etablissement/etablissement.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  totalSchools$!: Observable<number>;

  constructor(private etablissementService: EtablissementService, private router: Router) {}

  ngOnInit(): void {
    this.totalSchools$ = this.etablissementService.getTotalSchools$();
  }

  goToSearch() {
    this.router.navigate(['/search']);
  }
}
