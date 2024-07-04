import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent,

    children: [
      {
        path: 'imovel',
        loadChildren:() => import('../imovel/imovel.module').then(m => m.ImovelModule)
      },
      {
        path: 'aluguel',
        loadChildren:() => import('../aluguel/aluguel.module').then(m => m.AluguelModule)
      },
      {
        path: 'endereco',
        loadChildren:() => import('../endereco/endereco.module').then(m => m.EnderecoModule)
      },
      {
        path: 'inquilino',
        loadChildren:() => import('../inquilino/inquilino.module').then(m => m.InquilinoModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
