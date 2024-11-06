import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  private apiUrl = "http://127.0.0.1:5000"
  items = [];

  constructor(private http: HttpClient) { }

  // Método para obtener los registros del web service
  GetProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/products`);
  }

  AddToCart(data: { UserId: number, ProductId: number, Amount: number }): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(`${this.apiUrl}/createOrder`, data, { headers }); // Envía el ID del producto
  }
 
  getOrdersByUserId(idUsuario: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/orderDetail/${idUsuario}`)
  }

  deleteProduct(ProductId: number): Observable<any>{
    return this.http.delete(`${this.apiUrl}/deleteProduct/${ProductId}`)
  }
}
