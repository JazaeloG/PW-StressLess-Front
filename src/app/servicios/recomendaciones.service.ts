import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { exercise } from '../shared/interfaces/ejercicio.interface';
import { retos } from '../components/home/data/retos.data';

@Injectable({
  providedIn: 'root'
})
export class RecomendacionesService {

  constructor(private http: HttpClient) {}

  retosExtraidos: exercise[] = retos;

  setData(retosExtraidos: exercise[]) {
    localStorage.setItem('exercises', JSON.stringify(retosExtraidos));
  }
  
  getData(): exercise[] {
    const retosExtraidos = localStorage.getItem('exercises');
    if (retosExtraidos) {
      return JSON.parse(retosExtraidos); 
    } else {
      return this.retosExtraidos;
    }
  }
  getExerciseById(id: number): exercise | undefined {
    const exercises = this.getData();
    return exercises.find(exercise => exercise.id_Recomendacion === id);
  }
}