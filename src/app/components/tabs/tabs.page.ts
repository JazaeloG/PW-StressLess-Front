import { Component, OnInit } from '@angular/core';
import { InfoUsuarioService } from 'src/app/servicios/info-usuario.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
})
export class TabsPage implements OnInit {
  constructor(private infoUserService: InfoUsuarioService) {}

  ngOnInit(): void {
    this.infoUserService.getUserInfo().subscribe({
      next: (response) => {
        console.log('Información del usuario guardada:', response);
      },
      error: (error) => {
        console.error('Error al obtener información del usuario:', error);
      },
    });
  }
}
