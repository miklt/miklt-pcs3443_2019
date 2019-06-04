import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APIResponse, Instrutor } from '../models/instrutor.model';

@Injectable({
  providedIn: 'root'
})
export class InstrutorService {
  public baseUrl = 'https://aeroclub-backend.herokuapp.com/api/Instrutores';

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<APIResponse<Instrutor[]>>(this.baseUrl);
  }

  getOne(numeroMatricula: string) {
    return this.http.get<APIResponse<Instrutor>>(this.baseUrl + '/' + numeroMatricula);
  }

  create(object: Instrutor) {
    return this.http.post(this.baseUrl, object);
  }

  update(object: Instrutor) {
    return this.http.put(this.baseUrl, object);
  }

  delete(instrutor: Instrutor) {
    return this.http.request('DELETE', this.baseUrl, {
      body: instrutor
    });
  }
}
