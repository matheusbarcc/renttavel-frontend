import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AluguelListagemComponent } from './aluguel-listagem/aluguel-listagem.component';
import { AluguelDetalheComponent } from './aluguel-detalhe/aluguel-detalhe.component';

const routes: Routes = [
  {path: "", component: AluguelListagemComponent},
  {path:'detalhe', component: AluguelDetalheComponent},
  {path:'detalhe/:id', component: AluguelDetalheComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AluguelRoutingModule { }
