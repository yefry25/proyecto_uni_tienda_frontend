import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private apiUrl = "http://127.0.0.1:5000"

  constructor(private http: HttpClient) { }

  GetReportOfSalesByProduct(): Observable<any>{
    return this.http.get(`${this.apiUrl}/salesByProduct`);
  }
}
