// src/app/services/registro.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {
  private apiUrl = 'http://localhost:3000/auth/'; 

  constructor(private http: HttpClient) {}

  loginUsuario(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}login`, data);
  }

  registrarUsuario(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}registrar`, data);
  }
}
