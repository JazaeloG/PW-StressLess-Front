import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { exercise } from '../shared/interfaces/ejercicio.interface';
import { retos } from '../components/home/data/retos.data';

@Injectable({
  providedIn: 'root'
})
export class RecomendacionesService {

  constructor(private http: HttpClient) {}

  data: exercise[] = retos; 

  setData(data: exercise[]) {
    localStorage.setItem('exercises', JSON.stringify(data));
  }
  getData(): exercise[] {
    const data = localStorage.getItem('exercises');
    if (data) {
      return JSON.parse(data);
    } else {
      return this.data;
    }
  }
}
