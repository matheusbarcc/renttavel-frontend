import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImovelListagemComponent } from './imovel-listagem/imovel-listagem.component';
import { ImovelDetalheComponent } from './imovel-detalhe/imovel-detalhe.component';

const routes: Routes = [
  {path: "", component: ImovelListagemComponent},
  {path:'detalhe', component: ImovelDetalheComponent},
  {path:'detalhe/:id', component: ImovelDetalheComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImovelRoutingModule { }
