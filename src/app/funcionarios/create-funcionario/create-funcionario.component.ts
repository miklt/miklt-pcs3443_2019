import { Component, OnInit } from '@angular/core';
import { Funcionario } from '../../models/funcionario.model';
import { FuncionarioService } from '../../services/funcionario.service';

@Component({
  selector: 'app-create-funcionario',
  templateUrl: './create-funcionario.component.html',
  styleUrls: ['./create-funcionario.component.scss']
})
export class CreateFuncionarioComponent implements OnInit {

  public novoFuncionario: Funcionario = new Funcionario();
  public success = false;
  public loading = false;
  public error = false;
  public errorMsg = null;
  constructor(public funcionarioService: FuncionarioService) { }

  ngOnInit() {
  }

  salvarFuncionario(funcionario: Funcionario) {
    this.loading = true;
    this.success = false;
    this.error = false;
    this.funcionarioService.create(funcionario).subscribe(response => {
      console.log(response);
      this.success = true;
      this.loading = false;
      this.novoFuncionario = new Funcionario();
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


}
