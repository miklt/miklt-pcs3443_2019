import { Component, OnInit } from '@angular/core';
import { Aluno } from '../../models/aluno.model';
import { AlunoService } from '../../services/aluno.service';
import { ActivatedRoute, Router } from '@angular/router';
import { VooService } from 'src/app/services/voo.service';
import { Voo } from 'src/app/models/voo.model';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-read-aluno',
  templateUrl: './read-aluno.component.html',
  styleUrls: ['./read-aluno.component.scss']
})
export class ReadAlunoComponent implements OnInit {

  aluno: Aluno = new Aluno();
  loading = false;
  horasDeVoo: number;
  horasRestantes: number;
  horasObrigatorias: number;
  voosDoAluno: Voo[] = [];
  porcentagemCompleta: number;

  constructor(public alunoService: AlunoService, public route: ActivatedRoute,
              private router: Router, private vooService: VooService, public sessionService: SessionService) {
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
        this.horasDeVoo = 153;
        this.horasObrigatorias = 200;
        this.horasRestantes = this.horasObrigatorias - this.horasDeVoo;
        this.porcentagemCompleta = (this.horasDeVoo / (this.horasObrigatorias) * 100);
        this.load();

      });
    });
  }


  editAluno(aluno: Aluno) {
    this.router.navigate(['edit-aluno', aluno.numeroMatricula]);
  }

  load() {
    this.loading = true;
    this.vooService.getAll().subscribe(response => {
      this.voosDoAluno = response.data.map(obj => new Voo(obj)).filter(v => v.aluno === this.aluno.numeroMatricula);
      console.log(this.voosDoAluno);
      this.loading = false;
    });
  }

  goToVoo(voo: Voo) {
    this.router.navigate(['read-voo', voo.id]);
  }

  ngOnInit() {
  }

}
