import { Component, OnInit } from '@angular/core';
import { DataTransportService } from '../services/data-transport.service';
import { exercise } from '../interfaces/exercise.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.page.html',
  styleUrls: ['./exercise.page.scss'],
})
export class ExercisePage implements OnInit {

  constructor(
    private dataTransPortService: DataTransportService,
    private router: Router) {}

  ejercicio: exercise = {
    number: 0,
    name: "",
    description: "",
    details: "",
    image: ""
  }

  ngOnInit() {
    this.ejercicio = this.dataTransPortService.getData()
  }

  returnToHome(){
    this.router.navigate(['/home'])
  }

}
