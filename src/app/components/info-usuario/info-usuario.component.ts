// src/app/components/info-usuario/info-usuario.component.ts
import { Component, OnInit } from '@angular/core';
import { UserInfo, InfoUsuarioService } from '../../servicios/info-usuario.service';

@Component({
  selector: 'app-info-usuario',
  templateUrl: './info-usuario.component.html',
  styleUrls: ['./info-usuario.component.css']
})
export class InfoUsuarioComponent implements OnInit {
  userInfo: UserInfo | null = null;

  constructor(private infoUsuarioService: InfoUsuarioService) {}

  ngOnInit(): void {
    this.infoUsuarioService.getUserInfo().subscribe(data => {
      this.userInfo = data;
    });
  }
}
