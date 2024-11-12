import { Component } from '@angular/core';
import { retos } from '../data/retos.data';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';

import { DataTransportService } from '../services/data-transport.service';
import { exercise } from 'src/app/interfaces/exercise.interface';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    private platform: Platform, 
    private dataTransportService: DataTransportService, 
    private router: Router) {
  }

  retos: exercise[] = retos;
  colores: string[][] = [
    ["--ion-color-stressLess-exercise-clear-background1", '--ion-color-stressLess-exercise-dark-background1'],
    ['--ion-color-stressLess-exercise-clear-background2', '--ion-color-stressLess-exercise-dark-background2'],
    ['--ion-color-stressLess-exercise-clear-background3', '--ion-color-stressLess-exercise-dark-background3'],
    ['--ion-color-stressLess-exercise-clear-background4', '--ion-color-stressLess-exercise-dark-background4']
  ]

  descripcion: String = ""
  elementoVisible: boolean = false;

  getColor(index: number, type: number){
    return this.colores[index][type];
  }

  abrirDescripcion(texto: String){
    const anchoPantalla = this.platform.width()
    if(anchoPantalla<=550){
      this.descripcion = texto
      this.elementoVisible = !this.elementoVisible
    }
  }

  sendData(data: exercise){
    this.dataTransportService.setData(data)
    this.router.navigate(['/exercise'])
  }
}
