import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AlunoService } from '../services/aluno.service';
import { Aluno } from '../models/aluno.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-aluno',
  templateUrl: './list-aluno.component.html',
  styleUrls: ['./list-aluno.component.scss']
})
export class ListAlunoComponent implements OnInit {

  public alunos: Aluno[];
  public loading = false;
  @ViewChild('details') detailsModal: ElementRef;

  constructor(private alunoService: AlunoService, private router: Router) {
    this.load();
  }

  ngOnInit() {
  }

  load() {
    this.loading = true;
    this.alunoService.getAll().subscribe(response => {
      this.alunos = response.data;
      this.loading = false;
    });
  }

  goToAluno(aluno: Aluno) {
    this.router.navigate(['read-aluno', aluno.numeroMatricula]);
  }

  addAluno() {
    this.router.navigate(['create-aluno']);
  }

  editAluno(aluno: Aluno) {
    this.router.navigate(['edit-aluno', aluno.numeroMatricula]);
  }

  deleteAluno(aluno: Aluno) {
    this.loading = true;
    this.alunoService.delete(aluno).subscribe(response => {
      console.log('Deletado', response);
      this.load();
    });
  }


}
