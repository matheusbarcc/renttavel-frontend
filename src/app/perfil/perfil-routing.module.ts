import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PerfilListagemComponent } from './perfil-listagem/perfil-listagem.component';
import { PerfilDetalheComponent } from './perfil-detalhe/perfil-detalhe.component';

const routes: Routes = [
  { path: "", component: PerfilListagemComponent},
  { path: "detalhe", component: PerfilDetalheComponent},
  { path: 'detalhe/:id', component: PerfilDetalheComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PerfilRoutingModule { }
