import { Component, OnInit } from '@angular/core';
import { AluguelService } from '../../shared/service/aluguel.service';
import { Aluguel } from '../../shared/model/aluguel';
import { AluguelSeletor } from '../../shared/model/seletor/aluguel.seletor';
import { Imovel } from '../../shared/model/imovel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-aluguel-listagem',
  templateUrl: './aluguel-listagem.component.html',
  styleUrl: './aluguel-listagem.component.scss'
})
export class AluguelListagemComponent implements OnInit{

  public alugueis: Aluguel[] = [];
  public aluguel: Aluguel = new Aluguel();
  public seletor: AluguelSeletor = new AluguelSeletor();
  public totalPaginas: number;
  public totalRegistros: number;
  public offset: number;

  constructor(private aluguelService: AluguelService,
              private router: Router){}

  ngOnInit(): void {
    this.consultarTodos();
  }

  consultarTodos(){
    this.aluguelService.consultarTodos().subscribe(
      resultado => {
        this.alugueis = resultado
      },
      erro => {
        console.log('Erro ao buscar alugueis ' + erro)
      }
    )
  }

  alterar(imovelSelecionado: Imovel){
    this.router.navigate(['/imovel/detalhe/'+ imovelSelecionado.id])
  }
}
