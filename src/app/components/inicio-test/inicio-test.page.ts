import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio-test',
  templateUrl: './inicio-test.page.html',
  styleUrls: ['./inicio-test.page.scss'],
})
export class InicioTestPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  navegarEncuesta() {
    this.router.navigate(['/preguntas']);
  }

}
