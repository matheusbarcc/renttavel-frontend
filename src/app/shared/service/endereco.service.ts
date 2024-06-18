import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Imovel } from '../model/imovel';
import { Endereco } from '../model/endereco';
import { EnderecoSeletor } from '../model/seletor/endereco.seletor';

@Injectable({
  providedIn: 'root'
})
export class EnderecoService {

  private readonly API = 'http://localhost:8080/renttavel-backend/rest/endereco';

  constructor(private httpClient: HttpClient) { }

  consultarTodos(): Observable<Array<Endereco>>{
    return this.httpClient.get<Array<Endereco>>(this.API + '/todos')
  }
  salvar(endereco: Endereco): Observable<Endereco>{
    return this.httpClient.post<Endereco>(this.API, endereco)
  }

  excluir(id: number): Observable<any>{
    return this.httpClient.delete(this.API + '/' + id)
  }

  alterar(endereco: Endereco): Observable<Endereco>{
    return this.httpClient.put<Endereco>(this.API, endereco)
  }

  consultarPorId(id: number): Observable<Endereco>{
    return this.httpClient.get<Endereco>(this.API + '/' + id)
  }

  consultarComSeletor(seletor: EnderecoSeletor): Observable<Array<Endereco>>{
    return this.httpClient.post<Array<Endereco>>(this.API + '/filtro', seletor)
  }

  contarRegistros(seletor: EnderecoSeletor): Observable<number>{
    return this.httpClient.post<number>(this.API + '/total-registros', seletor)
  }

  contarPaginas(seletor: EnderecoSeletor): Observable<number>{
    return this.httpClient.post<number>(this.API + '/total-paginas', seletor)
  }
}
