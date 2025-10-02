import { Routes } from '@angular/router';
import { PesquisadorComponent } from './features/pesquisador/pesquisador.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/pesquisador',
    pathMatch: 'full',
  },
  {
    path: 'pesquisador',
    component: PesquisadorComponent,
  },
];
