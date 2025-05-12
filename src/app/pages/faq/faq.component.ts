import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.css',
})
export class FaqComponent {
  opened: boolean[] = [false, false, false, false, false];

  toggle(idx: number) {
    this.opened[idx] = !this.opened[idx];
  }
}
