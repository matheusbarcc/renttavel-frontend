import { Component, OnInit } from '@angular/core';
import { Anfitriao } from '../../shared/model/anfitriao';
import { AnfitriaoService } from '../../shared/service/anfitriao.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.scss'
})
export class CadastroComponent implements OnInit{

  public anfitriao: Anfitriao = new Anfitriao();

  constructor(private anfitriaoService: AnfitriaoService,
              private router: Router,
              private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.anfitriao.perfilAcesso = "ANFITRIAO";
  }

  salvar(){
    this.anfitriaoService.salvar(this.anfitriao).subscribe(
      resultado => {
        Swal.fire({
          title: "Cadastro realizado com sucesso!",
          text: "",
          icon: "success",
          showConfirmButton: true,
          confirmButtonColor: "#ff914d"
        })
        this.voltar();
      },
      erro => {
        Swal.fire({
          title: "Erro realizar cadastro",
          html: erro.error.mensagem,
          icon: "error",
          showConfirmButton: true,
          confirmButtonColor: "#ff914d"
        })
      }
    )
  }

  voltar(): void{
    this.router.navigate(['/login'])
  }
}
