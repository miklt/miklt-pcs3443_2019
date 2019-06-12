import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  public loginUrl = 'https://aeroclub-backend.herokuapp.com/api/login';

  constructor(private http: HttpClient, private router: Router) { }

  login(email: string, cpf: string) {
    cpf = cpf.replace(/[^0-9.]/, '');
    return new Promise<any>((resolve, reject) => {
      this.http.post<any>(this.loginUrl, {email, cpf}).subscribe(response => {
        console.log(response);

        if (response.status === 'success') {
          localStorage.setItem('aero-email', email);
          localStorage.setItem('aero-cpf', cpf);
          localStorage.setItem('aero-ator', response.data.ator);
          resolve(response.data);
        } else {
          reject(response.data);
        }
      }, err => reject(err));
    });
  }

  getAtor() {
    const ator = localStorage.getItem('aero-ator');
    if (ator) {
      return ator;
    }
  }

  estaLogado() {
    const ator = localStorage.getItem('aero-ator');
    const email = localStorage.getItem('aero-email');
    const cpf = localStorage.getItem('aero-cpf');

    if (!ator || !email || !cpf) {
      return false;
    }
    return true;
  }

  logout() {
    if (this.estaLogado()) {
      localStorage.clear();
      this.router.navigate(['login']);
    }
  }
}
