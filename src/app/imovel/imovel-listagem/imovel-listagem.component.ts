import { Component, OnInit } from '@angular/core';
import { Imovel } from '../../shared/model/imovel';
import { ImovelService } from '../../shared/service/imovel.service';
import { ImovelSeletor } from '../../shared/model/seletor/imovel.seletor';
import { EnderecoService } from '../../shared/service/endereco.service';
import { Endereco } from '../../shared/model/endereco';

@Component({
  selector: 'app-imovel-listagem',
  templateUrl: './imovel-listagem.component.html',
  styleUrl: './imovel-listagem.component.scss'
})
export class ImovelListagemComponent implements OnInit{

  public imoveis: Imovel[] = [];
  public enderecos: Endereco[] = [];
  public seletor: ImovelSeletor = new ImovelSeletor();
  public isModalOpen: boolean;
  public totalPaginas: number;
  public totalRegistros: number;
  public offset: number;

  constructor(private imovelService: ImovelService,
              private enderecoService: EnderecoService) { }

  ngOnInit(): void {
    this.pesquisar()
    this.consultarTodosEnderecos()
  }

  pesquisar(){
    this.imovelService.consultarComSeletor(this.seletor).subscribe(
      resultado => {
        this.imoveis = resultado
        this.contarRegistros()
      },
      erro => {
        console.log('Erro ao buscar imoveis ' + erro)
      }
    )
    this.contarPaginas()
  }

  limparSeletor(){
    this.seletor = new ImovelSeletor()
    this.pesquisar()
  }

  contarRegistros(){
    this.imovelService.contarRegistros(this.seletor).subscribe(
      (count: number) => {
        this.totalRegistros = count
      },
      erro => {
        console.log('Erro ao contar registros de imoveis', erro)
      }
    )
  }

  proximaPg(){
    this.seletor.pagina++;
    this.pesquisar();
  }

  voltarPg(){
    this.seletor.pagina--;
    this.pesquisar();
  }

  contarPaginas(){
    this.imovelService.contarPaginas(this.seletor).subscribe(
      (count: number) => {
        this.totalPaginas = count
      },
      erro => {
        console.log('Erro ao contar paginas de imoveis', erro)
      }
    )
  }


  consultarTodosEnderecos(){
    this.enderecoService.consultarTodos().subscribe(
      resultado => {
        this.enderecos = resultado
      },
      erro => {
        console.log('Erro ao buscar enderecos ' + erro)
      }
    )
  }


  abrirFiltros(): void {
    this.isModalOpen = true;
  }

  fecharFiltros(): void {
    this.isModalOpen = false;
  }

}
