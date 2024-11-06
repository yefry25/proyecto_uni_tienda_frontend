import { Component } from '@angular/core';
import Swal from "sweetalert2"
import { CardService } from '../../../core/services/card.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './card-list.component.html',
  styleUrl: './card-list.component.scss'
})
export class CardListComponent {
  products: any[] = []

  constructor(private cardService: CardService, private router: Router) { }

  ngOnInit(): void {
    this.cardService.GetProducts().subscribe(data => {
      this.products = data;
    })
  }

  addToCart(ProductId: number, Amount: number) {
    let UserId = parseInt(localStorage.getItem('userId') || '0', 10);

    this.cardService.AddToCart({ UserId, ProductId, Amount }).subscribe({
      next: () => {

        Swal.fire({
          title: 'Producto agregado.',
          text: `El producto se ha agregado al carrito correctamente.`,
          icon: 'success',
          confirmButtonText: 'Aceptar'
        });
      },
      error: (err) => {
        console.error('Error al agregar al carrito', err);
      }
    });
  }

  deleteProduct(ProductId: number) {
    this.cardService.deleteProduct(ProductId).subscribe({
      next: (data) => {
        Swal.fire({
          title: 'Producto eliminado.',
          text: `${data.message}`,
          icon: 'success',
          confirmButtonText: 'Aceptar'
        });

        this.ngOnInit();
      },
      error: (err) => {
        Swal.fire({
          title: 'Error',
          text: `${err.message}`,
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      }
    })
  }

  updateProduct(id: number){
    this.router.navigate(['/add-product', id]);
  }
}
