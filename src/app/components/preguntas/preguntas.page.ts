import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TestService } from 'src/app/servicios/test.service';

@Component({
  selector: 'app-preguntas',
  templateUrl: './preguntas.page.html',
  styleUrls: ['./preguntas.page.scss'],
})
export class PreguntasPage implements OnInit {
  preguntas: any[] = [];
  answers: { [key: number]: number } = {}; 
  test: any = {};

  constructor(private router: Router, private testService: TestService) {}

  ngOnInit() {
    this.getTests();
  }

  goToResults() {
    const usuarioID = localStorage.getItem("id_Usuario");
    const puntaje = this.testPuntaje();
    const testResult = {
      usuarioId: usuarioID,
      testId:  this.test.id_Test,
      testResultado_Puntaje: puntaje,
      testResultado_Comentarios: 'Test realizado',
    };
    const enviarPuntaje = testResult.testResultado_Puntaje;
    this.testService.crearTestResultado(testResult).subscribe({
      next: (response) => {
        console.log('Resultado del test guardado:', response);
      },
      error: (error) => {
        console.error('Error al guardar resultado del test:', error);
      },
    });

    this.router.navigate(['/resultados'], { state: { enviarPuntaje } }); 
  }

  getTests() {
    this.testService.getTests().subscribe({
      next: (response) => {
        if (response && response[0] && response[0].preguntas) {
          this.preguntas = response[0].preguntas;
          this.test = response[0];
        }
      },
      error: (error) => {
        console.error('Error al obtener preguntas:', error);
      },
    });
  }

  testPuntaje() {
    let puntaje = 0;
    for (const key in this.answers) {
      if (this.answers.hasOwnProperty(key)) {
        puntaje += this.answers[key]; 
      }
    }
    return puntaje;
  }

  isFormComplete() {
    return Object.keys(this.answers).length === this.preguntas.length;
  }
}
