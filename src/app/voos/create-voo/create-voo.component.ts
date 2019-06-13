import { Component, OnInit } from '@angular/core';
import { Voo } from '../../models/voo.model';
import { VooService } from '../../services/voo.service';
import { Instrutor } from '../../models/instrutor.model';
import { Aluno } from 'src/app/models/aluno.model';
import { InstrutorService } from '../../services/instrutor.service';
import { AlunoService } from 'src/app/services/aluno.service';
import { SessionService } from '../../services/session.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-voo',
  templateUrl: './create-voo.component.html',
  styleUrls: ['./create-voo.component.scss']
})
export class CreateVooComponent implements OnInit {

  public novoVoo: Voo = new Voo();
  public success = false;
  public loading = false;
  public error = false;
  public errorMsg = null;

  public instrutores: Instrutor[] = []; // variavel para popular select de instrutores
  public alunos: Aluno[] = []; // variavel para popular select de alunos
  constructor(public vooService: VooService,
              public instrutorService: InstrutorService,
              public alunoService: AlunoService,
              public sessionService: SessionService,
              public route: ActivatedRoute) {

    this.route.params.subscribe(params => {
      console.log(params);
        if (params.id)
          this.novoVoo.aluno = params.id;
        else 
          this.novoVoo.aluno = null;
      
    });
    
    // pega todos alunos existentes
    this.alunoService.getAll().subscribe(resp => {
      this.alunos = resp.data;
      
    });

    // pega todos instrutores existente
    this.instrutorService.getAll().subscribe(resp => {
      this.instrutores = resp.data;
    });

    if (this.sessionService.getAtor() === 'instrutor') {
      this.novoVoo.instrutor = Number(this.sessionService.getId());
    }
  }

  ngOnInit() {
  }

  salvarVoo(voo: Voo) {
    this.loading = true;
    this.success = false;
    this.error = false;
    this.vooService.create(voo).subscribe(response => {
      console.log(response);
      this.success = true;
      this.loading = false;
      this.novoVoo = new Voo();
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
