import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InicioTestPageRoutingModule } from './inicio-test-routing.module';

import { InicioTestPage } from './inicio-test.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InicioTestPageRoutingModule
  ],
  declarations: [InicioTestPage]
})
export class InicioTestPageModule {}
