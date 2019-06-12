import { Component, OnInit } from '@angular/core';
import { Funcionario } from '../../models/funcionario.model';
import { FuncionarioService } from '../../services/funcionario.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-funcionario',
  templateUrl: './edit-funcionario.component.html',
  styleUrls: ['./edit-funcionario.component.scss']
})
export class EditFuncionarioComponent implements OnInit {

  public funcionario: Funcionario = new Funcionario();
  public loading = false;
  public success = false;
  public error = false;
  public errorMsg = null;
  constructor(public funcionarioService: FuncionarioService, public route: ActivatedRoute) {
    this.load();
  }

  load() {
    this.loading = true;
    this.route.params.subscribe(params => {
      this.funcionario.cpf = params.id;
      this.funcionarioService.getAll().subscribe(response => {
        console.log(response);
// tslint:disable-next-line: triple-equals
        const funcionario = response.data.find(a => a.cpf == this.funcionario.cpf);
        console.log(funcionario);
        this.funcionario = funcionario;
        this.loading = false;
      });
    });
  }

  salvarFuncionario(funcionario: Funcionario) {
    this.loading = true;
    this.success = false;
    this.error = false;
    this.funcionario.update(funcionario).subscribe(response => {
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
