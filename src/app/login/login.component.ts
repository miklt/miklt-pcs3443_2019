import { Component, OnInit } from '@angular/core';
import { SessionService } from '../services/session.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public email: string;
  public cpf: string;
  public error = false;
  public success = false;
  public loading = false;
  public nome: string = null;
  constructor(public sessionService: SessionService, private router: Router) {
    if (this.sessionService.estaLogado()) {
      this.sessionService.login(this.sessionService.getEmail(), this.sessionService.getCPF()).then(dados => {
        console.log(dados);
        this.success = true;
        this.loading = false;
        this.nome = dados.nome;
        this.next(dados);
      }).catch(err => {
        console.error('erro login', err);
        this.error = true;
        this.loading = false;
      });
    }
  }

  ngOnInit() {
  }

  login() {
    this.error = false;
    this.success = false;
    this.loading = true;
    this.sessionService.login(this.email, this.cpf).then(dados => {
      console.log(dados);
      this.success = true;
      this.loading = false;
      this.nome = dados.nome;
      this.next(dados);
    }).catch(err => {
      console.error('erro login', err);
      this.error = true;
      this.loading = false;
    });
  }

  next(dados: any) {
    switch (dados.ator) {
      case 'aluno':
        this.router.navigate(['read-aluno', dados.numeroMatricula]);
        break;
      case 'instrutor':
        this.router.navigate(['list-voo']);
        break;
      case 'funcionario':
        this.router.navigate(['list-aluno']);
        break;
      case 'admin':
        this.router.navigate(['list-funcionario']);
        break;

    }
  }

}
