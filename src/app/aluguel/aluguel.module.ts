import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AluguelRoutingModule } from './aluguel-routing.module';
import { AluguelListagemComponent } from './aluguel-listagem/aluguel-listagem.component';
import { AluguelDetalheComponent } from './aluguel-detalhe/aluguel-detalhe.component';
import { FormsModule } from '@angular/forms';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';


@NgModule({
  declarations: [
    AluguelListagemComponent,
    AluguelDetalheComponent
  ],
  imports: [
    CommonModule,
    AluguelRoutingModule,
    FormsModule,
    NgxMaskDirective,
    NgxMaskPipe
  ],
  providers: [
    provideNgxMask()
  ]
})
export class AluguelModule { }
