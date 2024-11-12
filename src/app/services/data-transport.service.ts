import { Injectable } from '@angular/core';
import { exercise } from 'src/app/interfaces/exercise.interface';

@Injectable({
  providedIn: 'root'
})

export class DataTransportService {

  constructor() { }

  data: exercise = {
    number: 0,
    name: "",
    description: "",
    details: "",
    image: ""
  }

  setData(data: exercise){
    sessionStorage.setItem('exercise', JSON.stringify(data))
  }

  getData(): exercise{
    return JSON.parse(sessionStorage.getItem('exercise') || '{}')
  }
}
