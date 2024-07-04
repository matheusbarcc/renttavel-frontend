import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Imovel } from '../model/imovel';
import { ImovelSeletor } from '../model/seletor/imovel.seletor';

@Injectable({
  providedIn: 'root'
})
export class ImovelService {

  private readonly API = 'http://localhost:8080/renttavel-backend/rest/restrito/imovel';

  constructor(private httpClient: HttpClient) { }

  salvar(imovel: Imovel): Observable<Imovel>{
    return this.httpClient.post<Imovel>(this.API, imovel)
  }

  excluir(id: number): Observable<any>{
    return this.httpClient.delete(this.API + '/' + id)
  }

  alterar(imovel: Imovel): Observable<Imovel>{
    return this.httpClient.put<Imovel>(this.API, imovel)
  }

  consultarTodos(): Observable<Array<Imovel>>{
    return this.httpClient.get<Array<Imovel>>(this.API + '/todos')
  }

  consultarPorId(id: number): Observable<Imovel>{
    return this.httpClient.get<Imovel>(this.API + '/' + id)
  }

  consultarComSeletor(seletor: ImovelSeletor): Observable<Array<Imovel>>{
    return this.httpClient.post<Array<Imovel>>(this.API + '/filtro', seletor)
  }

  consultarPorAnfitriao(idAnfitriao: number): Observable<Array<Imovel>>{
    return this.httpClient.get<Array<Imovel>>(this.API + '/anfitriao/' + idAnfitriao)
  }

  contarRegistros(seletor: ImovelSeletor): Observable<number>{
    return this.httpClient.post<number>(this.API + '/total-registros', seletor)
  }

  contarPaginas(seletor: ImovelSeletor): Observable<number>{
    return this.httpClient.post<number>(this.API + '/total-paginas', seletor)
  }
}
