import { Component } from '@angular/core';
import { SessionService } from './services/session.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'aeroclube-frontend-angular';
  constructor(public sessionService: SessionService) {}

  logout() {
    this.sessionService.logout();
  }

  isAluno() {
    return this.sessionService.getAtor() === 'aluno';
  }

  isInstrutor() {
    return this.sessionService.getAtor() === 'instrutor';
  }

  isFuncionario() {
    return this.sessionService.getAtor() === 'funcionario';
  }
}
