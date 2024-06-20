import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Aluguel } from '../model/aluguel';
import { AluguelSeletor } from '../model/seletor/aluguel.seletor';

@Injectable({
  providedIn: 'root'
})
export class AluguelService {

  private readonly API = 'http://localhost:8080/renttavel-backend/rest/aluguel';

  constructor(private httpClient: HttpClient) { }

  consultarTodos(): Observable<Aluguel[]> {
    return this.httpClient.get<Aluguel[]>(`${this.API}/todos`);
  }

  salvar(aluguel: Aluguel): Observable<Aluguel> {
    return this.httpClient.post<Aluguel>(this.API, aluguel);
  }

  excluir(id: number): Observable<any> {
    return this.httpClient.delete(`${this.API}/${id}`);
  }

  alterar(aluguel: Aluguel): Observable<Aluguel> {
    return this.httpClient.put<Aluguel>(this.API, aluguel);
  }

  consultarPorId(id: number): Observable<Aluguel> {
    return this.httpClient.get<Aluguel>(`${this.API}/${id}`);
  }

  consultarComSeletor(seletor: AluguelSeletor): Observable<Aluguel[]> {
    return this.httpClient.post<Aluguel[]>(`${this.API}/filtro`, seletor);
  }

  contarRegistros(seletor: AluguelSeletor): Observable<number> {
    return this.httpClient.post<number>(`${this.API}/total-registros`, seletor);
  }

  contarPaginas(seletor: AluguelSeletor): Observable<number> {
    return this.httpClient.post<number>(`${this.API}/total-paginas`, seletor);
  }
}
