import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EtablissementService } from './services/etablissement/etablissement.service';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component'; // Import CommonModule

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, HeaderComponent, FooterComponent], // Add CommonModule here
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'School Finder Nantes';
}
