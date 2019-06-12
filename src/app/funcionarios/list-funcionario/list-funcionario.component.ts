import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FuncionarioService } from '../../services/funcionario.service';
import { Funcionario } from '../../models/funcionario.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-funcionario',
  templateUrl: './list-funcionario.component.html',
  styleUrls: ['./list-funcionario.component.scss']
})
export class ListFuncionarioComponent implements OnInit {

  public funcionarios: Funcionario[];
  public loading = false;
  @ViewChild('details') detailsModal: ElementRef;

  constructor(private funcionarioService: FuncionarioService, private router: Router) {
    this.load();
  }

  ngOnInit() {
  }

  load() {
    this.loading = true;
    this.funcionarioService.getAll().subscribe(response => {
      this.funcionarios = response.data;
      this.loading = false;
    });
  }

  goToFuncionario(funcionario: Funcionario) {
    this.router.navigate(['read-funcionario', funcionario.id]);
  }

  addFuncionario() {
    this.router.navigate(['create-funcionario']);
  }

  editFuncionario(funcionario: Funcionario) {
    this.router.navigate(['edit-funcionario', funcionario.cpf]);
  }

  deleteFuncionario(funcionario: Funcionario) {
    this.loading = true;
    this.funcionarioService.delete(funcionario).subscribe(response => {
      console.log('Deletado', response);
      this.load();
    });
  }

}
