import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InquilinoRoutingModule } from './inquilino-routing.module';
import { InquilinoDetalheComponent } from './inquilino-detalhe/inquilino-detalhe.component';
import { InquilinoListagemComponent } from './inquilino-listagem/inquilino-listagem.component';

@NgModule({
  declarations: [
    InquilinoListagemComponent,
    InquilinoDetalheComponent
  ],
  imports: [
    CommonModule,
    InquilinoRoutingModule,
    FormsModule
  ],
})
export class InquilinoModule { }
