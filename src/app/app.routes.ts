import { Routes } from '@angular/router';
import { AluguelModule } from './aluguel/aluguel.module';

export const routes: Routes = [
  {
    path: 'imovel',
    loadChildren:() => import('./imovel/imovel.module').then(m => m.ImovelModule),
  },
  {
    path: 'aluguel',
    loadChildren:() => import('./aluguel/aluguel.module').then(m => m.AluguelModule),
  },
  {
    path: 'endereco',
    loadChildren:() => import('./endereco/endereco.module').then(m => m.EnderecoModule),
  },
];
