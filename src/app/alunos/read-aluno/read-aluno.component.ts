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
  erroBreve = false;
  sucessoBreve = false;
  horasDeVoo: number;
  horasRestantes: number;
  horasObrigatorias = 10;
  notaMedia: number;
  notasVermelhas: number[] = [];
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
        this.horasDeVoo = aluno.horasTotais;
        this.horasRestantes = this.horasObrigatorias - this.horasDeVoo;
        if (this.horasRestantes < 0) {
          this.horasRestantes = 0;
        }
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

      // calcula nota média
      this.notaMedia = 0;
      this.voosDoAluno.forEach(voo => {
        if (voo.parecer < 3) {
          this.notasVermelhas.push(voo.parecer);
        }
        this.notaMedia = this.notaMedia + (voo.parecer / this.voosDoAluno.length);
      });
    });
  }

  deleteAluno(aluno: Aluno) {
    this.loading = true;
    this.alunoService.delete(aluno).subscribe(response => {
      console.log('Deletado', response);
      this.router.navigate(['list-aluno']);
    });
  }

  goToVoo(voo: Voo) {
    this.router.navigate(['read-voo', voo.id]);
  }

  goToNovoVoo(aluno: Aluno) {
    this.router.navigate(['create-voo', aluno.numeroMatricula]);
  }

  podeGerar() {
    return (this.horasDeVoo >= this.horasObrigatorias) && (this.notasVermelhas.length < 0.15 * this.voosDoAluno.length);
  }

  gerarBreve() {
    this.loading = true;
    const breve = Math.floor(100000 + Math.random() * 900000);
    const novoAluno = new Aluno(this.aluno);
    novoAluno.numeroBreve = breve.toString();

    this.alunoService.update(novoAluno).subscribe(resp => {
      this.sucessoBreve = true;
      this.loading = false;
      this.aluno.numeroBreve = breve.toString();
    }, err => {
      this.erroBreve = true;
      this.loading = false;
    });
  }

  ngOnInit() {
  }

}
