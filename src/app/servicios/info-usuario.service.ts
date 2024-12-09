import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

export interface UserInfo {
  id: number;
  nombre: string;
  apellidos: string;
  email: string;
  sexo: string;
  edad: number;
  indiceEstres?: number;
}

@Injectable({
  providedIn: 'root',
})
export class InfoUsuarioService {
  private apiURL = 'http://localhost:3000/auth/obtener-perfil';

  constructor(private http: HttpClient) {}

  getUserInfo(): Observable<UserInfo> {
    return this.http.get<any>(this.apiURL).pipe(
      map((response) => ({
        id: response.id_Usuario,
        nombre: response.usuario_Nombre,
        apellidos: response.usuario_Apellido,
        email: response.usuario_Correo,
        sexo: response.usuario_Sexo,
        edad: response.usuario_Edad,
        indiceindiceEstres: 23.0
      })),
      tap((userInfo) => {
        // Guardar en localStorage
        localStorage.setItem('nombre', userInfo.nombre);
        localStorage.setItem('apellidos', userInfo.apellidos);
        localStorage.setItem('email', userInfo.email);
        localStorage.setItem('sexo', userInfo.sexo);
        localStorage.setItem('edad', userInfo.edad.toString());
        
      })
    );
  }
}
