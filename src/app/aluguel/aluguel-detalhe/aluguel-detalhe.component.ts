import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  calcularQtdDias(): void {
    if (this.aluguel.dataCheckin) {
      const checkoutDate = this.aluguel.dataCheckoutEfetivo || this.aluguel.dataCheckoutPrevisto;
      if (checkoutDate) {
        this.aluguel.qtdDias = this.calculateDayDifference(this.aluguel.dataCheckin, checkoutDate);
      } else {
        this.aluguel.qtdDias = 0;
      }
    } else {
      this.aluguel.qtdDias = 0;
    }
  }

  private calculateDayDifference(startDate: Date, endDate: Date): number {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const timeDifference = end.getTime() - start.getTime();
    const dayDifference = timeDifference / (1000 * 3600 * 24);
    const dayDifferenceRounded = Math.round(dayDifference);
    return dayDifferenceRounded > 0 ? dayDifferenceRounded : 0;
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
    if(!this.aluguel.valorMulta) {
      this.aluguel.valorTotal = (this.aluguel.valorDiaria * this.aluguel.qtdDias) + this.aluguel.valorLimpeza
    } else {
      this.aluguel.valorTotal = (this.aluguel.valorDiaria * this.aluguel.qtdDias) + this.aluguel.valorLimpeza + this.aluguel.valorMulta
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
