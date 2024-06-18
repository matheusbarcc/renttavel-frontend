import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EnderecoListagemComponent } from './endereco-listagem/endereco-listagem.component';
import { EnderecoDetalheComponent } from './endereco-detalhe/endereco-detalhe.component';

const routes: Routes = [
  { path: "", component: EnderecoListagemComponent},
  { path: "detalhe", component: EnderecoDetalheComponent},
  { path:'detalhe/:id', component: EnderecoDetalheComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EnderecoRoutingModule { }
