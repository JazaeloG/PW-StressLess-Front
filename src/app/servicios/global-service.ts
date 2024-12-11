import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalStateService {
  private _correo: string | null = null;
  private _userid: number | null = null;

  set correo(value: string) {
    this._correo = value;
  }

  get correo(): string | null {
    return this._correo;
  }

    set userid(value: number) {
        this._userid = value;
    }

    get userid(): number | null {
        return this._userid;
    }
}