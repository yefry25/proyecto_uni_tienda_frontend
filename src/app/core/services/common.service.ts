import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  private apiUrl = "http://127.0.0.1:5000"

  constructor(private http: HttpClient) { }

  GetCommon(pathName: string): Observable<any>{
    return this.http.get(`${this.apiUrl}/${pathName}`);
  }
}
