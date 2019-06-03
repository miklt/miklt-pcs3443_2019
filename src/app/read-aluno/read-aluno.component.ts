import { Component, OnInit } from '@angular/core';
import { Aluno } from '../models/aluno.model';
import { AlunoService } from '../services/aluno.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-read-aluno',
  templateUrl: './read-aluno.component.html',
  styleUrls: ['./read-aluno.component.scss']
})
export class ReadAlunoComponent implements OnInit {

  aluno: Aluno = new Aluno();
  loading = false;
  constructor(public alunoService: AlunoService, public route: ActivatedRoute, private router: Router) {
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


  editAluno(aluno: Aluno) {
    this.router.navigate(['edit-aluno', aluno.numeroMatricula]);
  }

  ngOnInit() {
  }

}
