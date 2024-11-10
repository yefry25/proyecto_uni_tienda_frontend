import { Component } from '@angular/core';
import { CartService } from '../../../core/services/cart.service';
import { CurrencyPipe, CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart-view',
  standalone: true,
  imports: [CurrencyPipe, CommonModule],
  templateUrl: './cart-view.component.html',
  styleUrl: './cart-view.component.scss'
})
export class CartViewComponent {
  cartItems: any[] = [];
  userId = parseInt(localStorage.getItem('userId') || '0', 10);
  orderId: number = 0;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.loadCart();
  }

  totalValue(): number {
    return this.cartItems[0].Total;
  }

  loadCart() {
    this.cartService.getOrdersByUserId(this.userId).subscribe(items => {
      this.cartItems = items; // Asigna los items al componente
    });
  }

  finalizePurchase(){
    console.log("entra a finalizar o no?")
    this.cartService.createBill({OrderId: this.cartItems[0].OrderId, UserId: this.userId}).subscribe({
      next: () => {

        Swal.fire({
          title: 'Compra finalizada',
          text: `La factura ha sido creada correctamente.`,
          icon: 'success',
          confirmButtonText: 'Aceptar'
        });

        this.loadCart();
      },
      error: (err) => {
        console.error('Error al finalizar el pedido', err);
      }
    })
  }

  removeFromCart(productId: number) {
    /*this.cartService.removeFromCart(productId).subscribe(() => {
      this.loadCart(); // Recargar el carrito después de eliminar un item
    });*/
  }
}

export interface Product {
  OrderId: number;
  ProductId: number;
  ProductName: string;
  ProductDescription : string;
  ProductAmount: number;  
  Imagen: string;
  SubTotal: number;
  Total: number;
}
