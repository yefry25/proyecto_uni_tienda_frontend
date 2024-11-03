import { Component } from '@angular/core';
import Swal from "sweetalert2"
import { CardService } from '../../../core/services/card.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-card-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './card-list.component.html',
  styleUrl: './card-list.component.scss'
})
export class CardListComponent {
  products: any[] = []

  constructor(private webService: CardService) { }

  ngOnInit(): void {
    this.webService.GetProducts().subscribe(data => {
      this.products = data;
    })
  }

  addToCart(ProductId: number, Amount: number) {
    let UserId = parseInt(localStorage.getItem('userId') || '0', 10);

    this.webService.AddToCart({ UserId, ProductId, Amount}).subscribe({
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
}
