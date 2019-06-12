import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateAlunoComponent } from './alunos/create-aluno/create-aluno.component';
import { ListAlunoComponent } from './alunos/list-aluno/list-aluno.component';
import { EditAlunoComponent } from './alunos/edit-aluno/edit-aluno.component';
import { ReadAlunoComponent } from './alunos/read-aluno/read-aluno.component';
import { CreateInstrutorComponent } from './instrutores/create-instrutor/create-instrutor.component';
import { ListInstrutorComponent } from './instrutores/list-instrutor/list-instrutor.component';
import { EditInstrutorComponent } from './instrutores/edit-instrutor/edit-instrutor.component';
import { ReadInstrutorComponent } from './instrutores/read-instrutor/read-instrutor.component';
import { CreateVooComponent } from './voos/create-voo/create-voo.component';
import { ListVooComponent } from './voos/list-voo/list-voo.component';
import { EditVooComponent } from './voos/edit-voo/edit-voo.component';
import { ReadVooComponent } from './voos/read-voo/read-voo.component';
import { LoginComponent } from './login/login.component';
import { CreateFuncionarioComponent } from './funcionarios/create-funcionario/create-funcionario.component';
import { EditFuncionarioComponent } from './funcionarios/edit-funcionario/edit-funcionario.component';
import { ListFuncionarioComponent } from './funcionarios/list-funcionario/list-funcionario.component';
import { ReadFuncionarioComponent } from './funcionarios/read-funcionario/read-funcionario.component';

const routes: Routes = [
  // Login
  { path: 'login', component: LoginComponent },
  // Alunos
  { path: 'create-aluno', component: CreateAlunoComponent },
  { path: 'list-aluno', component: ListAlunoComponent },
  { path: 'edit-aluno/:id', component: EditAlunoComponent },
  { path: 'read-aluno/:id', component: ReadAlunoComponent },
  // Instrutores
  { path: 'create-instrutor', component: CreateInstrutorComponent },
  { path: 'list-instrutor', component: ListInstrutorComponent },
  { path: 'edit-instrutor/:id', component: EditInstrutorComponent },
  { path: 'read-instrutor/:id', component: ReadInstrutorComponent },
  // Voos
  { path: 'create-voo', component: CreateVooComponent },
  { path: 'list-voo', component: ListVooComponent },
  { path: 'edit-voo/:id', component: EditVooComponent },
  { path: 'read-voo/:id', component: ReadVooComponent },
  //Funcionarios
  { path: 'create-funcionario', component: CreateFuncionarioComponent },
  { path: 'list-funcionario', component: ListFuncionarioComponent },
  { path: 'edit-funcionario/:id', component: EditFuncionarioComponent },
  { path: 'read-funcionario/:id', component: ReadFuncionarioComponent },

  {path : '', component : ListAlunoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
