import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Imovel } from '../model/imovel';

@Injectable({
  providedIn: 'root'
})
export class ImovelService {

  private readonly API = 'http://localhost:8080/renttavel-backend/rest/imovel';

  constructor(private httpClient: HttpClient) { }

  consultarTodos(): Observable<Array<Imovel>>{
    return this.httpClient.get<Array<Imovel>>(this.API + '/todos')
  }
}
