import { Component, OnInit } from '@angular/core';
import { Imovel } from '../../shared/model/imovel';
import { ImovelService } from '../../shared/service/imovel.service';

@Component({
  selector: 'app-imovel-listagem',
  templateUrl: './imovel-listagem.component.html',
  styleUrl: './imovel-listagem.component.scss'
})
export class ImovelListagemComponent implements OnInit{

  public imoveis: Imovel[] = [];

  constructor(private imovelService: ImovelService) { }

  ngOnInit(): void {
    this.imovelService.consultarTodos().subscribe(
      resultado => {
        this.imoveis = resultado
      },
      erro => {
        console.log('Erro ao consultar imoveis', erro)
      }
    )
  }
}
