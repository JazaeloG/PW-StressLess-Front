import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TestService {
  private baseUrl = 'http://localhost:3000/test'; 

  constructor(private http: HttpClient) {}

  crearTest(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}`, data);
  }
  getTests(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}`);
  }
  
  //testResultado
  crearTestResultado(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}-resultado`, data);
  }

}
