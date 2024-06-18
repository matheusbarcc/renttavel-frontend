import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EnderecoRoutingModule } from './endereco-routing.module';
import { EnderecoListagemComponent } from './endereco-listagem/endereco-listagem.component';
import { EnderecoDetalheComponent } from './endereco-detalhe/endereco-detalhe.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    EnderecoListagemComponent,
    EnderecoDetalheComponent,
  ],
  imports: [
    CommonModule,
    EnderecoRoutingModule,
    FormsModule,
  ]
})
export class EnderecoModule { }
