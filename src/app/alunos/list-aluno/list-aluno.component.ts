import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AlunoService } from '../../services/aluno.service';
import { Aluno } from '../../models/aluno.model';
import { Router } from '@angular/router';
import { SessionService } from '../../services/session.service';
import { VooService } from 'src/app/services/voo.service';
import { Voo } from 'src/app/models/voo.model';

@Component({
  selector: 'app-list-aluno',
  templateUrl: './list-aluno.component.html',
  styleUrls: ['./list-aluno.component.scss']
})
export class ListAlunoComponent implements OnInit {

  public alunos: Aluno[];
  public voosAlunos: Voo[];
  public loading = false;
  public horasObrigatorias = 150;

  @ViewChild('details') detailsModal: ElementRef;

  constructor(private alunoService: AlunoService,
              private router: Router,
              public sessionService: SessionService,
              public voosService: VooService) {
    this.load();
  }

  ngOnInit() {
  }

  load() {
    this.loading = true;
    this.alunoService.getAll().subscribe(response => {
      this.alunos = response.data;
      this.loading = false;
      this.voosService.getAll().subscribe(resp => {
        this.voosAlunos = resp.data;
        this.alunos.forEach(aluno => {
          aluno.voos = resp.data.map(obj => new Voo(obj)).filter(v => v.aluno === aluno.numeroMatricula);
        });
      });

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

  podeGerar(aluno: Aluno) {
    const notasVermelhas = [];
    aluno.voos.forEach(voo => {
      if (voo.parecer < 3) {
        notasVermelhas.push(voo.parecer);
      }
     });
    console.log(aluno.email);
    console.log(notasVermelhas);
    console.log(aluno.horasTotais);
    console.log(aluno.horasTotais >= this.horasObrigatorias);
    console.log(notasVermelhas.length < 0.15 * aluno.voos.length);
    console.log(aluno.voos.length);
    return (aluno.horasTotais >= this.horasObrigatorias) && (notasVermelhas.length < 0.15 * aluno.voos.length);
  }


}
