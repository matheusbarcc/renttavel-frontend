import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImovelListagemComponent } from './imovel-listagem/imovel-listagem.component';

const routes: Routes = [
  {path: "", component: ImovelListagemComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImovelRoutingModule { }
