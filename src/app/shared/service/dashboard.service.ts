import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Aluguel } from '../model/aluguel';
import { BarraDTO } from '../model/dto/barra.dto';
import { DiferencaDTO } from '../model/dto/diferenca.dto';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private readonly API = 'http://localhost:8080/renttavel-backend/rest/restrito/dashboard';

  constructor(private httpClient: HttpClient) { }

  calcularRendimentoAnual(idAnfitriao: number): Observable<number> {
    return this.httpClient.get<number>(this.API + '/rendimento-anual/' + idAnfitriao);
  }

  calcularRendimentoMensal(idAnfitriao: number): Observable<number> {
    return this.httpClient.get<number>(this.API + '/rendimento-mensal/' + idAnfitriao);
  }

  calcularOcupacao(idAnfitriao: number): Observable<number> {
    return this.httpClient.get<number>(this.API + '/ocupacao/' + idAnfitriao);
  }

  calcularDiferenca(idAnfitriao: number): Observable<DiferencaDTO> {
    return this.httpClient.get<DiferencaDTO>(this.API + '/diferenca/' + idAnfitriao);
  }

  getProximosAlugueis(idAnfitriao: number): Observable<Array<Aluguel>> {
    return this.httpClient.get<Array<Aluguel>>(this.API + '/proximos-alugueis/' + idAnfitriao);
  }

  getLabelsGraficoBarra(idAnfitriao: number): Observable<Array<string>> {
    return this.httpClient.get<Array<string>>(this.API + '/barra-labels/' + idAnfitriao);
  }

  getDatasetsGraficoBarra(idAnfitriao: number): Observable<Array<BarraDTO>> {
    return this.httpClient.get<Array<BarraDTO>>(this.API + '/barra-datasets/' + idAnfitriao);
  }
}
