import { Component } from '@angular/core';
import { CartService } from '../../../core/services/cart.service';
import { CurrencyPipe, CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart-view',
  standalone: true,
  imports: [CurrencyPipe, CommonModule],
  templateUrl: './cart-view.component.html',
  styleUrl: './cart-view.component.scss'
})
export class CartViewComponent {
  cartItems: Product[] = [];

  constructor(private webService: CartService) { }

  ngOnInit(): void {
    this.loadCart();
  }

  totalValue(): number {
    console.log(this.cartItems);


    return this.cartItems.reduce((total, item) => total + Number(item.Valor), 0);
  }

  loadCart() {
    let userId = parseInt(localStorage.getItem('userId') || '0', 10);

    this.webService.getOrdersByUserId(userId).subscribe(items => {
      this.cartItems = items; // Asigna los items al componente
    });
  }

  removeFromCart(productId: number) {
    /*this.cartService.removeFromCart(productId).subscribe(() => {
      this.loadCart(); // Recargar el carrito después de eliminar un item
    });*/
  }
}

export interface Product {
  IdOrden: number;
  IdUsuario: number;
  IdPrenda: number;
  Marca: string;
  Valor: number;
  Imagen: string;
  FechaCreacion: Date;
}
