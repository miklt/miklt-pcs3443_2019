import { Component, OnInit } from '@angular/core';
import { Aluno } from '../models/aluno.model';
import { AlunoService } from '../services/aluno.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-aluno',
  templateUrl: './edit-aluno.component.html',
  styleUrls: ['./edit-aluno.component.scss']
})
export class EditAlunoComponent implements OnInit {

  public aluno: Aluno = new Aluno();
  public loading = false;
  public success = false;
  public error = false;
  public errorMsg = null;
  constructor(public alunoService: AlunoService, public route: ActivatedRoute) {
    this.load();
  }

  load() {
    this.loading = true;
    this.route.params.subscribe(params => {
      this.aluno.numeroMatricula = params.id;
      this.alunoService.getAll().subscribe(response => {
        console.log(response);
// tslint:disable-next-line: triple-equals
        const aluno = response.data.find(a => a.numeroMatricula == this.aluno.numeroMatricula);
        console.log(aluno);
        this.aluno = aluno;
        this.loading = false;
      });
    });
  }

  salvarAluno(aluno: Aluno) {
    this.loading = true;
    this.success = false;
    this.error = false;
    this.alunoService.update(aluno).subscribe(response => {
      console.log(response);
      this.success = true;
      this.loading = false;
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

  ngOnInit() {
  }

}
