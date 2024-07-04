import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2'
import { Inquilino } from '../../shared/model/inquilino';
import { InquilinoService } from '../../shared/service/inquilino.service';
import { Anfitriao } from '../../shared/model/anfitriao';


@Component({
  selector: 'app-inquilino-detalhe',
  templateUrl: './inquilino-detalhe.component.html',
  styleUrls: ['./inquilino-detalhe.component.scss']
})

export class InquilinoDetalheComponent implements OnInit {

  public inquilino: Inquilino = new Inquilino();
  public anfitriao: Anfitriao = new Anfitriao()
  public idInquilino: number;
  public idAnfitriaoHeader: number;

  constructor(
    private inquilinoService: InquilinoService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getIdAnfitriaoHeader();
    this.setAnfitriaoImovel();
    this.verificarId();
  }

  getIdAnfitriaoHeader(){
    const usuarioAutenticado = localStorage.getItem('usuarioAutenticado');
    if(usuarioAutenticado) {
      const usuario = JSON.parse(usuarioAutenticado);
      this.idAnfitriaoHeader = usuario.id
    }
  }

  setAnfitriaoImovel() {
    const usuarioAutenticado = localStorage.getItem('usuarioAutenticado');
    if (usuarioAutenticado) {
      const usuario = JSON.parse(usuarioAutenticado);
      this.anfitriao = usuario; // Define o anfitrião como o usuário autenticado
      this.inquilino.anfitriao = this.anfitriao; // Define o anfitrião do imóvel
    }
  }

  verificarId() {
    this.route.params.subscribe((params) => {
      this.idInquilino = params['id'];
      if (this.idInquilino) {
        this.consultarPorId();
      }
    });
  }

  salvar(): void {
    if (this.idInquilino) {
      this.alterar();
    } else {
      this.inserir();
    }
  }

  inserir() {
    this.inquilinoService.salvar(this.inquilino).subscribe(
      resultado => {
        Swal.fire({
          title: "Inquilino cadastrado com sucesso!",
          text: "",
          icon: "success",
          showConfirmButton: true,
          confirmButtonColor: "#ff914d"
        });
        this.voltar();
      },
      erro => {
        Swal.fire({
          title: "Erro ao salvar inquilino",
          html: erro.error.mensagem,
          icon: "error",
          showConfirmButton: true,
          confirmButtonColor: "#ff914d"
        });
      }
    );
  }

  alterar() {
    this.inquilinoService.alterar(this.inquilino).subscribe(
      resultado => {
        Swal.fire({
          title: "Inquilino editado com sucesso!",
          text: "",
          icon: "success",
          showConfirmButton: true,
          confirmButtonColor: "#ff914d"
        });
        this.voltar();
      },
      erro => {
        Swal.fire({
          title: "Erro ao editar inquilino",
          html: erro.error.mensagem,
          icon: "error",
          showConfirmButton: true,
          confirmButtonColor: "#ff914d"
        });
      }
    );
  }

  voltar(): void {
    this.router.navigate(['/home/inquilino']);
  }

  consultarPorId() {
    this.inquilinoService.consultarPorId(this.idInquilino).subscribe(
      resultado => {
        this.inquilino = resultado;
      },
      erro => console.log('Erro ao consultar inquilino por id' + erro)
    );
  }
}
