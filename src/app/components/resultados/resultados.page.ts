import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.page.html',
  styleUrls: ['./resultados.page.scss'],
})
export class ResultadosPage implements OnInit {
  testResult: any;

  constructor(private router: Router) {}

  ngOnInit() {
    this.testResult = history.state.enviarPuntaje;
    console.log('Resultado del test:', this.testResult);
  }

  navegarResultados() {
    this.router.navigate(['/info-usuario']);
  }

}
