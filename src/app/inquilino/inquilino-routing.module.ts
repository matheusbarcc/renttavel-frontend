import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InquilinoListagemComponent } from './inquilino-listagem/inquilino-listagem.component';
import { InquilinoDetalheComponent } from './inquilino-detalhe/inquilino-detalhe.component';

const routes: Routes = [
  { path: "", component: InquilinoListagemComponent },
  { path: 'detalhe', component: InquilinoDetalheComponent },
  { path: 'detalhe/:id', component: InquilinoDetalheComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InquilinoRoutingModule { }
