import { Component, OnInit } from '@angular/core';
import { EnderecoService } from '../../shared/service/endereco.service';
import { Endereco } from '../../shared/model/endereco';
import { EnderecoSeletor } from '../../shared/model/seletor/endereco.seletor';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-endereco-listagem',
  templateUrl: './endereco-listagem.component.html',
  styleUrls: ['./endereco-listagem.component.scss']
})
export class EnderecoListagemComponent implements OnInit {
  public enderecos: Endereco[] = [];
  public endereco: Endereco = new Endereco();
  public seletor: EnderecoSeletor = new EnderecoSeletor();
  public isModalFiltrosOpen: boolean;
  public isModalEstadoOpen: boolean;
  public isModalCidadeOpen: boolean;
  public isModalBairroOpen: boolean;
  public totalPaginas: number;
  public totalRegistros: number;
  public offset: number;
  public idAnfitriaoHeader: number;

  constructor(private enderecoService: EnderecoService,
              private router: Router) {}

  ngOnInit(): void {
    this.getIdAnfitriaoHeader()
    this.pesquisar();
  }

  getIdAnfitriaoHeader(){
    const usuarioAutenticado = localStorage.getItem('usuarioAutenticado');
    if(usuarioAutenticado) {
      const usuario = JSON.parse(usuarioAutenticado);
      this.idAnfitriaoHeader = usuario.id
    }
  }

  pesquisar() {
    this.seletor.idAnfitriao = this.idAnfitriaoHeader;
    this.enderecoService.consultarComSeletor(this.seletor).subscribe(
      resultado => {
        this.enderecos = resultado;
        this.contarRegistros();
      },
      erro => {
        console.log('Erro ao buscar endereços: ' + erro);
      }
    );
    this.contarPaginas();
  }

  alterar(enderecoSelecionado: Endereco) {
    this.router.navigate(['/home/endereco/detalhe/' + enderecoSelecionado.id]);
  }

  excluir(enderecoSelecionado: Endereco) {
    Swal.fire({
      title: 'Deseja realmente excluir este endereço?',
      text: 'Essa ação não poderá ser desfeita!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, excluir!',
      confirmButtonColor: "#ff914d",
      cancelButtonText: 'Cancelar',
      cancelButtonColor: '#cccccc',
      focusCancel: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.enderecoService.excluir(enderecoSelecionado.id).subscribe(
          resultado => {
            this.pesquisar();
          },
          erro => {
            Swal.fire('Erro ao excluir endereço!', erro.error.mensagem, 'error');
          }
        );
      }
    });
  }

  limparSeletor() {
    this.seletor = new EnderecoSeletor();
    this.pesquisar();
  }

  limparSeletorEstado() {
    this.seletor.estado = "";
    this.pesquisar();
  }

  limparSeletorCidade() {
    this.seletor.cidade = "";
    this.pesquisar();
  }

  limparSeletorBairro() {
    this.seletor.bairro = "";
    this.pesquisar();
  }

  contarRegistros() {
    this.enderecoService.contarRegistros(this.seletor).subscribe(
      (count: number) => {
        this.totalRegistros = count;
      },
      erro => {
        console.log('Erro ao contar registros de endereços', erro);
      }
    );
  }

  proximaPg() {
    this.seletor.pagina++;
    this.pesquisar();
  }

  voltarPg() {
    this.seletor.pagina--;
    this.pesquisar();
  }

  contarPaginas() {
    this.enderecoService.contarPaginas(this.seletor).subscribe(
      (count: number) => {
        this.totalPaginas = count;
      },
      erro => {
        console.log('Erro ao contar páginas de endereços', erro);
      }
    );
  }

  openModalFiltros(): void {
    this.isModalFiltrosOpen = true;
  }

  toggleFiltroEstado(): void {
    this.isModalEstadoOpen = !this.isModalEstadoOpen;
    this.isModalCidadeOpen = false;
    this.isModalBairroOpen = false;
  }

  toggleFiltroCidade(): void {
    this.isModalCidadeOpen = !this.isModalCidadeOpen;
    this.isModalEstadoOpen = false;
    this.isModalBairroOpen = false;
  }

  toggleFiltroBairro(): void {
    this.isModalBairroOpen = !this.isModalBairroOpen;
    this.isModalEstadoOpen = false;
    this.isModalCidadeOpen = false;
  }

  closeModalFiltros(): void {
    this.isModalFiltrosOpen = false;
  }

  closeFiltroEstado(): void {
    this.isModalEstadoOpen = false;
  }

  closeFiltroCidade(): void {
    this.isModalCidadeOpen = false;
  }

  closeFiltroBairro(): void {
    this.isModalBairroOpen = false;
  }
}

