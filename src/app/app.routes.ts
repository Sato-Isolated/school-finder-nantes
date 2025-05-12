import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SearchComponent } from './pages/search/search.component';
import { ContactComponent } from './pages/contact/contact.component';
import { AboutComponent } from './pages/about/about.component';
import { FaqComponent } from './pages/faq/faq.component';
import { MentionsLegalesComponent } from './pages/mentions-legales/mentions-legales.component';
import { PolitiqueDeConfidentialiteComponent } from './pages/politique-de-confidentialite/politique-de-confidentialite.component';
export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'search', component: SearchComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'about', component: AboutComponent },
  { path: 'faq', component: FaqComponent },
  { path: 'mentions-legales', component: MentionsLegalesComponent },
  { path: 'politique-de-confidentialite', component: PolitiqueDeConfidentialiteComponent },
];
