import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APIResponse, Funcionario } from '../models/funcionario.model';

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {
  public baseUrl = 'https://aeroclub-backend.herokuapp.com/api/Funcionario';

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<APIResponse<Funcionario[]>>(this.baseUrl);
  }

  getOne(cpf: string) {
    return this.http.get<APIResponse<Funcionario>>(this.baseUrl + '/' + cpf);
  }

  create(object: Funcionario) {
    return this.http.post(this.baseUrl, object);
  }

  update(object: Funcionario) {
    return this.http.put(this.baseUrl, object);
  }

  delete(funcionario: Funcionario) {
    return this.http.request('DELETE', this.baseUrl, {
      body: funcionario
    });
  }
}
