import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { AluguelService } from './../../shared/service/aluguel.service';
import { ImovelService } from './../../shared/service/imovel.service';
import { Aluguel } from '../../shared/model/aluguel';
import { Imovel } from '../../shared/model/imovel';
import { Inquilino } from '../../shared/model/inquilino';
import { InquilinoService } from '../../shared/service/inquilino.service';


@Component({
  selector: 'app-aluguel-detalhe',
  templateUrl: './aluguel-detalhe.component.html',
  styleUrls: ['./aluguel-detalhe.component.scss']
})
export class AluguelDetalheComponent implements OnInit {
  public aluguel: Aluguel = new Aluguel();
  public imoveis: Imovel[] = [];
  public inquilinos: Inquilino[] = [];
  public idAluguel: number;

  constructor(
    private aluguelService: AluguelService,
    private imovelService: ImovelService,
    private inquilinoService: InquilinoService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.verificarId();
    this.consultarTodosImoveis();
    this.consultarTodosInquilinos();
  }

  verificarId() {
    this.route.params.subscribe((params) => {
      this.idAluguel = params['id'];
      if (this.idAluguel) {
        this.consultarPorId();
      }
    })
  }

  salvar(): void {
    if (this.idAluguel) {
      this.alterar();
    } else {
      this.inserir();
    }
  }

  consultarPorId() {
    this.aluguelService.consultarPorId(this.idAluguel).subscribe(
      resultado => {
        this.aluguel = resultado;
      },
      erro => console.log('Erro ao consultar aluguel por id: ' + erro)
    )
  }

  inserir() {
    this.aluguelService.salvar(this.aluguel).subscribe(
      resultado => {
        Swal.fire({
          title: "Aluguel cadastrado com sucesso!",
          text: "",
          icon: "success",
          showConfirmButton: true,
          confirmButtonColor: "#ff914d"
        })
        this.voltar();
      },
      erro => {
        Swal.fire({
          title: "Erro ao salvar aluguel",
          html: erro.error.mensagem,
          icon: "error",
          showConfirmButton: true,
          confirmButtonColor: "#ff914d"
        })
      }
    )
  }

  alterar() {
    this.aluguelService.alterar(this.aluguel).subscribe(
      resultado => {
        Swal.fire({
          title: "Aluguel editado com sucesso!",
          text: "",
          icon: "success",
          showConfirmButton: true,
          confirmButtonColor: "#ff914d"
        })
        this.voltar();
      },
      erro => {
        Swal.fire({
          title: "Erro ao editar aluguel",
          html: erro.error.mensagem,
          icon: "error",
          showConfirmButton: true,
          confirmButtonColor: "#ff914d"
        })
      }
    )
  }

  calcularValorTotal(){
    this.aluguel.valorTotal = (this.aluguel.valorDiaria * this.aluguel.qtdDias) + this.aluguel.valorLimpeza + this.aluguel.valorMulta
  }

  calcularDias(){
    if (this.aluguel.dataCheckoutPrevisto && this.aluguel.dataCheckin) {
      const diferencaMilissegundos = this.aluguel.dataCheckoutPrevisto.getTime() - this.aluguel.dataCheckin.getTime();

      // Converte milissegundos para dias
      const diferencaDias = Math.ceil(diferencaMilissegundos / (1000 * 60 * 60 * 24));

      // Atribui a diferença em dias para this.aluguel.qtdDias
      this.aluguel.qtdDias = diferencaDias;
    }
  }

  voltar(): void {
    this.router.navigate(['/aluguel'])
  }

  consultarTodosImoveis(): void {
    this.imovelService.consultarTodos().subscribe(
      resultado => {
        this.imoveis = resultado;
      },
      (error) => {
        console.error('Erro ao carregar imóveis', error);
      }
    );
  }

  consultarTodosInquilinos(): void {
    this.inquilinoService.consultarTodos().subscribe(
      resultado => {
        this.inquilinos = resultado;
      },
      (error) => {
        console.error('Erro ao carregar inquilinos', error);
      }
    );
  }
  public compareById(r1: any, r2: any): boolean {
    return r1 && r2 ? r1.id === r2.id : r1 === r2
  }
}
