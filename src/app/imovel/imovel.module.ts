import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImovelRoutingModule } from './imovel-routing.module';
import { ImovelListagemComponent } from './imovel-listagem/imovel-listagem.component';
import { FormsModule } from '@angular/forms'

@NgModule({
  declarations: [
    ImovelListagemComponent
  ],
  imports: [
    CommonModule,
    ImovelRoutingModule,
    FormsModule,
  ],
})
export class ImovelModule { }
