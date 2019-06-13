import { Component } from '@angular/core';
import { SessionService } from './services/session.service';
import { Router } from '@angular/router';
import { Instrutor } from './models/instrutor.model';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'aeroclube-frontend-angular';
  constructor(public sessionService: SessionService, private router: Router) {}

  isAluno() {
    return this.sessionService.getAtor() === 'aluno';
  }

  isInstrutor() {
    return this.sessionService.getAtor() === 'instrutor';
  }

  isFuncionario() {
    return this.sessionService.getAtor() === 'funcionario';
  }

  goToInstrutor() {
    this.router.navigate(['read-instrutor', this.sessionService.getId()]);
  }

  logout() {
    this.sessionService.logout();
    this.router.navigate(['login']);
  }
}
