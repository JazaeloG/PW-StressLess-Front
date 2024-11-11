import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InicioTestPage } from './inicio-test.page';

const routes: Routes = [
  {
    path: '',
    component: InicioTestPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InicioTestPageRoutingModule {}
