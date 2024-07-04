import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { Anfitriao } from '../../shared/model/anfitriao';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule
  ],
})
export class HomeComponent implements OnInit{

  public anfAutenticado = Anfitriao;

  isImoveisDropdownOpen = false;
  isAlugueisDropdownOpen = false;
  isEnderecosDropdownOpen = false;
  isInquilinosDropdownOpen = false;

  constructor(private router: Router) { }


  ngOnInit(): void {
    let usuarioNoStorage = localStorage.getItem('usuarioAutenticado');

    if(usuarioNoStorage){
      this.anfAutenticado = JSON.parse(usuarioNoStorage);
    } else {
      this.router.navigate(['/login'])
    }
  }

  [key: string]: any;
  toggleDropdown(dropdown: string) {
    this[dropdown] = !this[dropdown];
  }

  logout(){
    localStorage.removeItem('usuarioAutenticado');
    this.router.navigate(['/login'])
  }
}
