import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Imovel } from '../model/imovel';
import { ImovelSeletor } from '../model/seletor/imovel.seletor';

@Injectable({
  providedIn: 'root'
})
export class ImovelService {

  private readonly API = 'http://localhost:8080/renttavel-backend/rest/imovel';

  constructor(private httpClient: HttpClient) { }

  consultarTodos(): Observable<Array<Imovel>>{
    return this.httpClient.get<Array<Imovel>>(this.API + '/todos')
  }

  consultarComSeletor(seletor: ImovelSeletor): Observable<Array<Imovel>>{
    return this.httpClient.post<Array<Imovel>>(this.API + '/filtro', seletor)
  }

  contarRegistros(seletor: ImovelSeletor): Observable<number>{
    return this.httpClient.post<number>(this.API + '/total-registros', seletor)
  }

  contarPaginas(seletor: ImovelSeletor): Observable<number>{
    return this.httpClient.post<number>(this.API + '/total-paginas', seletor)
  }
}
