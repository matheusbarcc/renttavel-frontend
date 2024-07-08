import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InquilinoRoutingModule } from './inquilino-routing.module';
import { InquilinoDetalheComponent } from './inquilino-detalhe/inquilino-detalhe.component';
import { InquilinoListagemComponent } from './inquilino-listagem/inquilino-listagem.component';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';

@NgModule({
  declarations: [
    InquilinoListagemComponent,
    InquilinoDetalheComponent,
  ],
  imports: [
    CommonModule,
    InquilinoRoutingModule,
    FormsModule,
    NgxMaskDirective,
    NgxMaskPipe
  ],
  providers: [
    provideNgxMask()
  ]
})
export class InquilinoModule { }
