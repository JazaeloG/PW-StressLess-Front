import { Component, OnInit } from '@angular/core';
import { InfoUsuarioService, UserInfo } from 'src/app/servicios/info-usuario.service';

@Component({
  selector: 'app-info-usuario',
  templateUrl: './info-usuario.page.html',
  styleUrls: ['./info-usuario.page.scss'],
})
export class InfoUsuarioPage implements OnInit {

  constructor(private infoUsuarioService: InfoUsuarioService) { }


  userInfo: UserInfo | null = null;

  ngOnInit(): void {
    this.infoUsuarioService.getUserInfo().subscribe(data => {
      this.userInfo = data;
    });
  }

}
