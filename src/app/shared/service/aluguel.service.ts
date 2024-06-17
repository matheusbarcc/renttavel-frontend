import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Aluguel } from '../model/aluguel';

@Injectable({
  providedIn: 'root'
})
export class AluguelService {

  private readonly API = 'http://localhost:8080/renttavel-backend/rest/aluguel';

  constructor(private httpClient: HttpClient) { }

  consultarTodos(): Observable<Array<Aluguel>>{
    return this.httpClient.get<Array<Aluguel>>(this.API + '/todos')
  }
}
