import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./components/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./components/registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: '',
    loadChildren: () => import('./components/tabs/tabs.module').then( m => m.TabsPageModule)
  },
  {
    path: 'inicio-test',
    loadChildren: () => import('./components/inicio-test/inicio-test.module').then( m => m.InicioTestPageModule)
  },
  {
    path: 'preguntas',
    loadChildren: () => import('./components/preguntas/preguntas.module').then( m => m.PreguntasPageModule)
  },
  {
    path: 'exercise/:number',
    loadChildren: () => import('./components/exercise/exercise.module').then( m => m.ExercisePageModule)
  },
  {
    path: 'resultados',
    loadChildren: () => import('./components/resultados/resultados.module').then( m => m.ResultadosPageModule)
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
