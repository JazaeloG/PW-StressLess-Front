import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TestService } from 'src/app/servicios/test.service';

@Component({
  selector: 'app-inicio-test',
  templateUrl: './inicio-test.page.html',
  styleUrls: ['./inicio-test.page.scss'],
})
export class InicioTestPage implements OnInit {

  constructor(private router: Router, private testService: TestService) { }

  ngOnInit() {
  }

  navegarEncuesta() {
    this.router.navigate(['/preguntas']);
  }

}
