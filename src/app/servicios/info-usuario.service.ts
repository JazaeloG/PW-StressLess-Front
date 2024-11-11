import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface UserInfo {
  nombre: string;
  apellidos: string;
  email: string;
  sexo: string;
  edad: number;
  indiceEstres: number;
}

@Injectable({
  providedIn: 'root'
})
export class InfoUsuarioService {

  constructor() { }

  getUserInfo(): Observable<UserInfo> {

    const userInfo: UserInfo = {
      nombre: 'Natalia',
      apellidos: 'López Miranda',
      email: 'zs21000000@estudiantes.uv.mx',
      sexo: 'Femenino',
      edad: 19,
      indiceEstres: 23.0,
    };
    return of(userInfo);

  }
}
