import { Component, OnInit } from '@angular/core';
import { Imovel } from '../../shared/model/imovel';
import { ImovelService } from '../../shared/service/imovel.service';
import { ImovelSeletor } from '../../shared/model/seletor/imovel.seletor';
import { EnderecoService } from '../../shared/service/endereco.service';
import { Endereco } from '../../shared/model/endereco';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

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
  public idAnfitriaoHeader: number;

  constructor(private imovelService: ImovelService,
              private enderecoService: EnderecoService,
              private router: Router) { }

  ngOnInit(): void {
    this.getIdAnfitriaoHeader()
    this.pesquisar()
    this.consultarEnderecos()
  }

  getIdAnfitriaoHeader(){
    const usuarioAutenticado = localStorage.getItem('usuarioAutenticado');
    if(usuarioAutenticado) {
      const usuario = JSON.parse(usuarioAutenticado);
      this.idAnfitriaoHeader = usuario.id
    }
  }

  pesquisar(){
    this.seletor.idAnfitriao = this.idAnfitriaoHeader;
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

  alterar(imovelSelecionado: Imovel){
    this.router.navigate(['/home/imovel/detalhe/'+ imovelSelecionado.id])
  }

  excluir(imovelSelecionado: Imovel){
    Swal.fire({
      title: 'Deseja realmente excluir esse imóvel?',
      text: 'Essa ação não poderá ser desfeita!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, excluir!',
      confirmButtonColor: "#ff914d",
      cancelButtonText: 'Cancelar',
      cancelButtonColor: '#cccccc',
      focusCancel: true
    }).then((result) => {
      if(result.isConfirmed){
        this.imovelService.excluir(imovelSelecionado.id).subscribe(
          resultado => {
            this.pesquisar();
          },
          erro => {
            Swal.fire('Erro ao excluir imóvel!', erro.error.mensagem, 'error')
          }
        );
      }
    })
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

  consultarEnderecos(){
    this.enderecoService.consultarPorAnfitriao(this.idAnfitriaoHeader).subscribe(
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
