// src/app/services/registro.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {
  private apiUrl = 'https://api.example.com/register'; 

  constructor(private http: HttpClient) {}

  //registrarUsuario(data: any): Observable<any> {
  //  return this.http.post(this.apiUrl, data);
  //}
  registrarUsuario(data: any): Observable<any> {
    console.log('Simulación de envío de datos:', data);
    return of({ success: true, message: 'Registro simulado exitoso' });
  }
}
