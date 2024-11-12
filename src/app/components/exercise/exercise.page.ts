import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecomendacionesService } from 'src/app/servicios/recomendaciones.service';
import { exercise } from 'src/app/shared/interfaces/ejercicio.interface';

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.page.html',
  styleUrls: ['./exercise.page.scss'],
})
export class ExercisePage implements OnInit {

  reto: exercise | undefined;

  constructor(
    private route: ActivatedRoute,  
    private dataTransportService: RecomendacionesService
  ) {}

  ngOnInit() {
    
    const number = this.route.snapshot.paramMap.get('number');
    if (number) {
      this.reto = this.dataTransportService.getData().find(r => r.number === parseInt(number));  // Filtramos el reto por su id
      console.log(this.reto);
    }
  }

}