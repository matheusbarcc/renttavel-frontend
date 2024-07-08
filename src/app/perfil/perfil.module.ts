import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PerfilRoutingModule } from './perfil-routing.module';
import { FormsModule } from '@angular/forms';
import { PerfilListagemComponent } from './perfil-listagem/perfil-listagem.component';
import { PerfilDetalheComponent } from './perfil-detalhe/perfil-detalhe.component';



@NgModule({
  declarations: [
    PerfilListagemComponent,
    PerfilDetalheComponent,
  ],
  imports: [
    CommonModule,
    PerfilRoutingModule,
    FormsModule,
  ]
})
export class PerfilModule { }
