import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Anfitriao } from '../model/anfitriao';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnfitriaoService {

  private readonly API = 'http://localhost:8080/renttavel-backend/rest/anfitriao';

  constructor(private httpClient: HttpClient) { }

  salvar(anfitriao: Anfitriao): Observable<Anfitriao> {
    return this.httpClient.post<Anfitriao>(this.API, anfitriao);
  }
}
