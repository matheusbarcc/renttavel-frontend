import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImovelRoutingModule } from './imovel-routing.module';
import { ImovelListagemComponent } from './imovel-listagem/imovel-listagem.component';


@NgModule({
  declarations: [
    ImovelListagemComponent
  ],
  imports: [
    CommonModule,
    ImovelRoutingModule
  ],
})
export class ImovelModule { }
