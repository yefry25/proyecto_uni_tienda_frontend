import { Component } from '@angular/core';
import Swal from "sweetalert2"
import { CardService } from '../../../core/services/card.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-list.component.html',
  styleUrl: './card-list.component.scss'
})
export class CardListComponent {
  registros: any[] = []

  constructor(private webService: CardService) { }

  ngOnInit(): void {
    this.webService.getRecords().subscribe(data => {
      this.registros = data;

      console.log(this.registros)
    })
  }

  addToCart(productId: number) {
    let userId = parseInt(localStorage.getItem('userId') || '0', 10);

    this.webService.addToCart({ idUsuario: userId, idPrenda: productId }).subscribe({
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
