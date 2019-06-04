import { Component, OnInit } from '@angular/core';
import { Voo } from '../../models/voo.model';
import { VooService } from '../../services/voo.service';
import { ActivatedRoute } from '@angular/router';
import { AlunoService } from 'src/app/services/aluno.service';
import { InstrutorService } from '../../services/instrutor.service';
import { Instrutor } from '../../models/instrutor.model';
import { Aluno } from 'src/app/models/aluno.model';

@Component({
  selector: 'app-edit-voo',
  templateUrl: './edit-voo.component.html',
  styleUrls: ['./edit-voo.component.scss']
})
export class EditVooComponent implements OnInit {

  public voo: Voo = new Voo();
  public loading = false;
  public success = false;
  public error = false;
  public errorMsg = null;

  public instrutores: Instrutor[] = []; // variavel para popular select de instrutores
  public alunos: Aluno[] = []; // variavel para popular select de alunos

  constructor(public vooService: VooService,
              public instrutorService: InstrutorService,
              public alunoService: AlunoService,
              public route: ActivatedRoute) {
    this.load();
  }

  load() {
    this.loading = true;

    // pega todos alunos existentes
    this.alunoService.getAll().subscribe(resp => {
      this.alunos = resp.data;
    });

    // pega todos instrutores existente
    this.instrutorService.getAll().subscribe(resp => {
      this.instrutores = resp.data;
    });

    // pega informacoes do voo
    this.route.params.subscribe(params => {
      this.voo.id = params.id;
      this.vooService.getAll().subscribe(response => {
        console.log(response);
// tslint:disable-next-line: triple-equals
        const voo = response.data.find(a => a.id == this.voo.id);
        console.log(voo);
        this.voo = voo;
        this.loading = false;
      });
    });
  }

  salvarVoo(voo: Voo) {
    this.loading = true;
    this.success = false;
    this.error = false;
    this.vooService.update(voo).subscribe(response => {
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
      errorText += `<b>${e}:</b> ${errResponse.error[e]} <br>`;
    }

    return errorText;
  }

  ngOnInit() {
  }

}
