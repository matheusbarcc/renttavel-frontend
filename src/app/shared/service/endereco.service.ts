import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Endereco } from '../model/endereco';

@Injectable({
  providedIn: 'root'
})
export class EnderecoService {

  private readonly API = 'http://localhost:8080/renttavel-backend/rest/endereco';

  constructor(private httpClient: HttpClient) { }

  consultarTodos(): Observable<Array<Endereco>>{
    return this.httpClient.get<Array<Endereco>>(this.API + '/todos')
  }
}
