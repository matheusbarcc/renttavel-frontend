import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../shared/service/dashboard.service';
import { Anfitriao } from '../../shared/model/anfitriao';
import { DiferencaDTO } from '../../shared/model/dto/diferenca.dto';
import { Aluguel } from '../../shared/model/aluguel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit{

  public anfitriaoHeader: Anfitriao = new Anfitriao();
  public idAnfitriaoHeader: number;
  public rendimentoAnual: number;
  public rendimentoMensal: number;
  public diferencaDTO: DiferencaDTO = new DiferencaDTO();
  public taxaOcupacao: number;
  public proximosAlugueis: Aluguel[] = [];
  public dadosGraficoBarra: any;
  public datasetGraficoBarra: any;
  public labelsGraficoBarra: any;

  constructor(private dashboardService: DashboardService,
              private router: Router) { }

  ngOnInit(): void {
    this.chainedRequests();
  }

  async chainedRequests() {
    await this.delay(10);
    this.getAnfitriaoHeader();
    await this.delay(10);
    this.getIdAnfitriaoHeader();
    await this.delay(10);
    this.calcularRendimentoAnual();
    await this.delay(10);
    this.calcularRendimentoMensal();
    await this.delay(10);
    this.calcularOcupacao();
    await this.delay(10);
    this.calcularDiferenca();
    await this.delay(10);
    this.getProximosAlugueis();
    await this.delay(10);
    this.getLabelsGraficoBarra();
    await this.delay(10);
    this.getDatasetsGraficoBarra();
    await this.delay(100);
    this.iniciarGraficoBarra();
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  getIdAnfitriaoHeader(){
    const usuarioAutenticado = localStorage.getItem('usuarioAutenticado');
    if(usuarioAutenticado) {
      const usuario = JSON.parse(usuarioAutenticado);
      this.idAnfitriaoHeader = usuario.id
    }
  }

  getAnfitriaoHeader(){
    const usuarioAutenticado = localStorage.getItem('usuarioAutenticado');
    if(usuarioAutenticado) {
      const usuario = JSON.parse(usuarioAutenticado);
      this.anfitriaoHeader = usuario
    }
  }

  iniciarGraficoBarra(){
    this.dadosGraficoBarra = {
      labels: this.labelsGraficoBarra,
      datasets: this.datasetGraficoBarra,
    }
  }

  getLabelsGraficoBarra(){
    this.dashboardService.getLabelsGraficoBarra(this.idAnfitriaoHeader).subscribe(
      resultado => {
        this.labelsGraficoBarra = resultado;
      },
      erro => {
        console.log('Erro ao pegar labels do grafico barra', erro.error.mensagem)
      }
    )
  }

  getDatasetsGraficoBarra(){
    this.dashboardService.getDatasetsGraficoBarra(this.idAnfitriaoHeader).subscribe(
      resultado => {
        this.datasetGraficoBarra = resultado;
      },
      erro => {
        console.log('Erro ao pegar datasets do grafico barra', erro.error.mensagem)
      }
    )
  }

  calcularRendimentoAnual(){
    this.dashboardService.calcularRendimentoAnual(this.idAnfitriaoHeader).subscribe(
      resultado => {
        this.rendimentoAnual = resultado;
      },
      erro => {
        console.log('Erro ao calcular rendimento anual', erro.error.mensagem)
      }
    )
  }

  formatarRendimentoAnual(): string {
    let rendimentoFormatado = null;
    if(this.rendimentoAnual > 999){
      rendimentoFormatado = 'R$ ' + (this.rendimentoAnual / 1000).toFixed(1) + 'k'
    } else {
      rendimentoFormatado = 'R$ ' + this.rendimentoAnual
    }

    return rendimentoFormatado;
  }

  calcularRendimentoMensal(){
    this.dashboardService.calcularRendimentoMensal(this.idAnfitriaoHeader).subscribe(
      resultado => {
        this.rendimentoMensal = resultado;
      },
      erro => {
        console.log('Erro ao calcular rendimento mensal', erro.error.mensagem)
      }
    )
  }

  formatarRendimentoMensal(): string {
    let rendimentoFormatado = null;
    if(this.rendimentoMensal > 999){
      rendimentoFormatado = 'R$ ' + (this.rendimentoMensal / 1000).toFixed(1) + 'k'
    } else {
      rendimentoFormatado = 'R$ ' + this.rendimentoMensal
    }

    return rendimentoFormatado;
  }

  calcularOcupacao(){
    this.dashboardService.calcularOcupacao(this.idAnfitriaoHeader).subscribe(
      resultado => {
        this.taxaOcupacao = resultado;
      },
      erro => {
        console.log('Erro ao calcular ocupacao de imoveis', erro.error.mensagem)
      }
    )
  }

  calcularDiferenca(){
    this.dashboardService.calcularDiferenca(this.idAnfitriaoHeader).subscribe(
      resultado => {
        this.diferencaDTO = resultado;
      },
      erro => {
        console.log('Erro ao calcular diferenca', erro.error.mensagem)
      }
    )
  }

  formatarPorcentagemDiferenca(porcentagem: number): string{
    let porcentagemFormatada = null;

    if(porcentagem >= 0) {
      porcentagemFormatada = '+' + porcentagem.toFixed(1)
    } else {
      porcentagemFormatada = '' + porcentagem.toFixed(1)
    }

    return porcentagemFormatada;
  }

  getProximosAlugueis(){
    this.dashboardService.getProximosAlugueis(this.idAnfitriaoHeader).subscribe(
      resultado => {
        this.proximosAlugueis = resultado;
      },
      erro => {
        console.log('Erro ao calcular diferenca', erro.error.mensagem)
      }
    )
  }

  verAlugueis(){
    this.router.navigate(['/home/aluguel/'])
  }
}
