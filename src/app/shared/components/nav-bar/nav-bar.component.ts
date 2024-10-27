import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {
  constructor(private router: Router) { }

  openRegister() {
    this.router.navigate(['/register']);
  }

  openLogin() {
    console.log("desde el login");

    this.router.navigate(['/login']);
  }

  goToCart() {
    this.router.navigate(['/cart']); // Asegúrate de que esta ruta esté definida en tu router
  }
}
