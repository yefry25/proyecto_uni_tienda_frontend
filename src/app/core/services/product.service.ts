import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = "http://127.0.0.1:5000"
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) { }

  GetCommon(pathName: string): Observable<any>{
    return this.http.get(`${this.apiUrl}/${pathName}`);
  }

  addProduct(data: { Name: string, CategoryId: number, BrandId: number, Price: number, Stock: number, Description: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/addProduct`, data, { headers: this.headers }); // Envía el ID del producto
  }

  updateProduct(id: string | null,data: { Name: string, CategoryId: number, BrandId: number, Price: number, Stock: number, Description: string }): Observable<any> {
    return this.http.put(`${this.apiUrl}/updateProduct/${id}`, data, { headers: this.headers });
  }

  getProductById(id: string | null){
    return this.http.get(`${this.apiUrl}/getProductById/${id}`);
  }
}
