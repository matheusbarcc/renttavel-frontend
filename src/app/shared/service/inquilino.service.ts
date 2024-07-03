import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Inquilino } from '../model/inquilino';
import { InquilinoSeletor } from '../model/seletor/inquilino';


@Injectable({
  providedIn: 'root'
})
export class InquilinoService {

  private readonly API = 'http://localhost:8080/renttavel-backend/rest/inquilino';

  constructor(private httpClient: HttpClient) { }

  salvar(inquilino: Inquilino): Observable<Inquilino> {
    return this.httpClient.post<Inquilino>(this.API, inquilino);
  }

  excluir(id: number): Observable<any> {
    return this.httpClient.delete(`${this.API}/${id}`);
  }

  alterar(inquilino: Inquilino): Observable<Inquilino> {
    return this.httpClient.put<Inquilino>(this.API, inquilino);
  }

  consultarTodos(): Observable<Array<Inquilino>> {
    return this.httpClient.get<Array<Inquilino>>(this.API + '/todos');
  }

  consultarPorId(id: number): Observable<Inquilino> {
    return this.httpClient.get<Inquilino>(`${this.API}/${id}`);
  }

  consultarComSeletor(seletor: InquilinoSeletor): Observable<Array<Inquilino>> {
    return this.httpClient.post<Array<Inquilino>>(this.API + '/filtro', seletor);
  }

  contarRegistros(seletor: InquilinoSeletor): Observable<number> {
    return this.httpClient.post<number>(this.API + '/total-registros', seletor);
  }

  contarPaginas(seletor: InquilinoSeletor): Observable<number> {
    return this.httpClient.post<number>(this.API + '/total-paginas', seletor);
  }
}
