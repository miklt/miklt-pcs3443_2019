import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APIResponse, Voo } from '../models/voo.model';

@Injectable({
  providedIn: 'root'
})
export class VooService {
  public baseUrl = 'https://aeroclub-backend.herokuapp.com/api/Voos';

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<APIResponse<Voo[]>>(this.baseUrl);
  }

  getOne(id: number) {
    return this.http.get<APIResponse<Voo>>(this.baseUrl + '/' + id);
  }

  create(object: Voo) {
    return this.http.post(this.baseUrl, object);
  }

  update(object: Voo) {
    return this.http.put(this.baseUrl, object);
  }

  delete(voo: Voo) {
    return this.http.request('DELETE', this.baseUrl, {
      body: voo
    });
  }
}
