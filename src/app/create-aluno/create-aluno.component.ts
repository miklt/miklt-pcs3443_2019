import { Component, OnInit } from '@angular/core';
import { Aluno } from '../models/aluno.model';
import { AlunoService } from '../services/aluno.service';

@Component({
  selector: 'app-create-aluno',
  templateUrl: './create-aluno.component.html',
  styleUrls: ['./create-aluno.component.scss']
})
export class CreateAlunoComponent implements OnInit {

  public novoAluno: Aluno = new Aluno();
  public success = false;
  public loading = false;
  public error = false;
  public errorMsg = null;
  constructor(public alunoService: AlunoService) { }

  ngOnInit() {
  }

  salvarAluno(aluno: Aluno) {
    this.loading = true;
    this.success = false;
    this.error = false;
    this.alunoService.create(aluno).subscribe(response => {
      console.log(response);
      this.success = true;
      this.loading = false;
      this.novoAluno = new Aluno();
    }, errResponse => {
      console.log(errResponse);
      this.loading = false;
      this.error = true;
      this.errorMsg = this.printError(errResponse);
    });
  }

  printError(errResponse: any) {
    let errorText = '';
// tslint:disable-next-line: forin
    for (const e in errResponse.error) {
      errorText += `<b>${e}:</b> ${errResponse.error[e][0]} <br>`;
    }

    return errorText;
  }

}
