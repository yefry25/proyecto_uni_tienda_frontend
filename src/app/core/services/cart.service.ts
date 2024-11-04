import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private apiUrl = "http://127.0.0.1:5000"
  items = [];
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) { }

  // Método para obtener los registros del web service
  getRecords(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/clothes`);
  }

  addToCart(data: { idUsuario: number, idPrenda: number }): Observable<any> {
    return this.http.post(`${this.apiUrl}/createOrder`, data, { headers: this.headers }); // Envía el ID del producto
  }

  createBill(data: { OrderId: number, UserId: number }): Observable<any> {
    console.log(data)
    return this.http.post(`${this.apiUrl}/createBill`, data, { headers: this.headers });
  }

  getOrdersByUserId(idUsuario: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/orderDetail/${idUsuario}`)
  }
}
