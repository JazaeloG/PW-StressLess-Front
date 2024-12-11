import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalStateService } from 'src/app/servicios/global-service';
import { InfoUsuarioService, UserInfo } from 'src/app/servicios/info-usuario.service';

@Component({
  selector: 'app-info-usuario',
  templateUrl: './info-usuario.page.html',
  styleUrls: ['./info-usuario.page.scss'],
})
export class InfoUsuarioPage implements OnInit {

  constructor(
    private infoUsuarioService: InfoUsuarioService,
    private router: Router,
    private globalState: GlobalStateService) { }



  userInfo: UserInfo | null = null;

  async ngOnInit(): Promise<void> {
    console.log('InfoUsuarioPage ngOnInit');
    console.log('Correo en globalState:', this.globalState.correo);
    (this.infoUsuarioService.getUserInfo()).subscribe(data => {
      this.userInfo = data;
    });
  }

  cerrarSesion() {
    /*this.cuentaService.clearCuenta();
    this.router.navigate(['login']); */
    this.router.navigate(['/login']);
  }
}
