import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://127.0.0.1:5000'; // Cambia esto por tu URL
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient, private router: Router) {}

  register(user: any) {
    return this.http.post(`${this.apiUrl}/createUser`, user, { headers:this.headers });
  }

  login(credentials: { nickName: string, password: string }): Observable<any> {
    // Hacemos la petición POST al servidor con las credenciales en el body
    return this.http.post(`${this.apiUrl}/login`, credentials, { headers: this.headers });
  }

  redirectToHome() {
    this.router.navigate(['/']); // Cambia esto a tu ruta principal
  }
}
