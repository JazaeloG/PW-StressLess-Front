import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlobalStateService } from '../servicios/global-service'; // Importa el servicio

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:3000/auth'; // Reemplaza con la URL de tu API

  constructor(private http: HttpClient, private globalState: GlobalStateService) { }

  login(credentials: { correo: string, contrasena: string }): Observable<any> {
   
    this.globalState.correo = credentials.correo; 
    console.log('Correo en globalState:', this.globalState.correo);
    const body = {
      usuario_Correo: credentials.correo,
      usuario_Password: credentials.contrasena
    };
    return this.http.post(`${this.apiUrl}/login`, body);
  }
}