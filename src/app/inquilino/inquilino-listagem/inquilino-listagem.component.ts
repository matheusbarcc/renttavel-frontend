import { Component, OnInit } from '@angular/core';
import { Inquilino } from '../../shared/model/inquilino';
import { InquilinoService } from '../../shared/service/inquilino.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { InquilinoSeletor } from '../../shared/model/seletor/inquilino';

@Component({
  selector: 'app-inquilino-listagem',
  templateUrl: './inquilino-listagem.component.html',
  styleUrl: './inquilino-listagem.component.scss'
})
export class InquilinoListagemComponent implements OnInit {

  public inquilinos: Inquilino[] = [];
  public seletor: InquilinoSeletor = new InquilinoSeletor();
  public isModalOpen: boolean;
  public totalPaginas: number;
  public totalRegistros: number;
  public offset: number;
  public idAnfitriaoHeader: number;

  constructor(private inquilinoService: InquilinoService,
              private router: Router) { }

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
    this.inquilinoService.consultarComSeletor(this.seletor).subscribe(
      resultado => {
        this.inquilinos = resultado;
        this.contarRegistros();
      },
      erro => {
        console.log('Erro ao buscar inquilinos ' + erro);
      }
    );
    this.contarPaginas();
  }

  alterar(inquilinoSelecionado: Inquilino) {
    this.router.navigate(['/home/inquilino/detalhe/' + inquilinoSelecionado.id]);
  }

  excluir(inquilinoSelecionado: Inquilino) {
    Swal.fire({
      title: 'Deseja realmente excluir esse inquilino?',
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
        this.inquilinoService.excluir(inquilinoSelecionado.id).subscribe(
          resultado => {
            this.pesquisar();
          },
          erro => {
            Swal.fire('Erro ao excluir inquilino!', erro.error.mensagem, 'error');
          }
        );
      }
    });
  }

  limparSeletor() {
    this.seletor = new InquilinoSeletor();
    this.pesquisar();
  }

  contarRegistros() {
    this.inquilinoService.contarRegistros(this.seletor).subscribe(
      (count: number) => {
        this.totalRegistros = count;
      },
      erro => {
        console.log('Erro ao contar registros de inquilinos', erro);
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
    this.inquilinoService.contarPaginas(this.seletor).subscribe(
      (count: number) => {
        this.totalPaginas = count;
      },
      erro => {
        console.log('Erro ao contar paginas de inquilinos', erro);
      }
    );
  }

  abrirFiltros(): void {
    this.isModalOpen = true;
  }

  fecharFiltros(): void {
    this.isModalOpen = false;
  }

}
