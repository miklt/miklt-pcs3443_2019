import { Component, OnInit } from '@angular/core';
import { Funcionario } from '../../models/funcionario.model';
import { FuncionarioService } from '../../services/funcionario.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-read-funcionario',
  templateUrl: './read-funcionario.component.html',
  styleUrls: ['./read-funcionario.component.scss']
})
export class ReadFuncionarioComponent implements OnInit {
 
  funcionario: Funcionario = new Funcionario();
  loading = false;
  constructor(public funcionarioService: FuncionarioService, public route: ActivatedRoute, private router: Router) {
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


  editFuncionario(funcionario: Funcionario) {
    this.router.navigate(['edit-funcionario', funcionario.cpf]);
  }

  ngOnInit() {
  }
}
