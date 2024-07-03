import { Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2'
import { Inquilino } from '../../shared/model/inquilino';
import { InquilinoService } from '../../shared/service/inquilino.service';


@Component({
  selector: 'app-inquilino-detalhe',
  templateUrl: './inquilino-detalhe.component.html',
  styleUrls: ['./inquilino-detalhe.component.scss']
})

export class InquilinoDetalheComponent implements OnInit {

  public inquilino: Inquilino = new Inquilino();
  public idInquilino: number;

  constructor(
    private inquilinoService: InquilinoService,
    private router: Router,
    private route: ActivatedRoute,
    private renderer: Renderer2
  ) { }

  ngOnInit(): void {
    this.verificarId();
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
    this.router.navigate(['/inquilino']);
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
