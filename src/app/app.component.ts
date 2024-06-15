import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'renttavel-frontend';

  isImoveisDropdownOpen = false;
  isAlugueisDropdownOpen = false;
  isEnderecosDropdownOpen = false;
  isInquilinosDropdownOpen = false;

  [key: string]: any;

  toggleDropdown(dropdown: string) {
    this[dropdown] = !this[dropdown];
  }
}
