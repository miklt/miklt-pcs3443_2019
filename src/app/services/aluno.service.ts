import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APIResponse, Aluno } from '../models/aluno.model';

@Injectable({
  providedIn: 'root'
})
export class AlunoService {
  public baseUrl = 'https://aeroclub-backend.herokuapp.com/api/Alunos';

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<APIResponse<Aluno[]>>(this.baseUrl);
  }

  getOne(numeroMatricula: string) {
    return this.http.get<APIResponse<Aluno>>(this.baseUrl + '/' + numeroMatricula);
  }

  create(object: Aluno) {
    return this.http.post(this.baseUrl, object);
  }

  update(object: Aluno) {
    return this.http.put(this.baseUrl, object);
  }

  delete(aluno: Aluno) {
    return this.http.request('DELETE', this.baseUrl, {
      body: aluno
    });
  }
}
