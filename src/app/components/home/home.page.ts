import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { RecomendacionesService } from 'src/app/servicios/recomendaciones.service';
import { exercise } from 'src/app/shared/interfaces/ejercicio.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(
    private platform: Platform, 
    private dataTransportService: RecomendacionesService, 
    private router: Router) { }
  
  ngOnInit(): void {
    console.log("ngOnInit Inicializado");
    this.retos = this.dataTransportService.getData();
    console.log(this.retos);
  }

  reto = {} as exercise;
  retos: exercise[] = [];
  colores: string[][] = [
    ["--ion-color-stressLess-exercise-clear-background1", '--ion-color-stressLess-exercise-dark-background1'],
    ['--ion-color-stressLess-exercise-clear-background2', '--ion-color-stressLess-exercise-dark-background2'],
    ['--ion-color-stressLess-exercise-clear-background3', '--ion-color-stressLess-exercise-dark-background3'],
    ['--ion-color-stressLess-exercise-clear-background4', '--ion-color-stressLess-exercise-dark-background4']
  ];

  descripcion: String = "";
  elementoVisible: boolean = false;

  getColor(index: number, type: number) {
    return this.colores[index][type];
  }

  abrirDescripcion(texto: String) {
    const anchoPantalla = this.platform.width();
    if (anchoPantalla <= 550) {
      this.descripcion = texto;
      this.elementoVisible = !this.elementoVisible;
    }
  }

  sendData(data: exercise) {
    this.dataTransportService.setData([data]);
  }
}
