import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent,

    children: [
      {
        path: 'dashboard',
        loadChildren:() => import('../dashboard/dashboard.module').then(m => m.DashboardModule)
      },
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
      {
        path: 'perfil',
        loadChildren:() => import('../perfil/perfil.module').then(m => m.PerfilModule),
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
