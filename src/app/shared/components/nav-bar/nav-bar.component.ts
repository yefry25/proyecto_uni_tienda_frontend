import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {
  cartItemCount = 0;

  constructor(private router: Router) { }

  openSign() {
    this.router.navigate(['/sign']);
  }

  openLogin() {
    this.router.navigate(['/login']);
  }

  reports(){
    this.router.navigate(['/report-page'])
  }

  goToCart() {
    this.router.navigate(['/cart']); // Asegúrate de que esta ruta esté definida en tu router
  }

  addProduct(){
    this.router.navigate(['/add-product'])
  }
}
