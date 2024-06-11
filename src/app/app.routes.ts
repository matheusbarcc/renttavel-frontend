import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'imovel',
    loadChildren:() => import('./imovel/imovel.module').then(m => m.ImovelModule),
  }
];
