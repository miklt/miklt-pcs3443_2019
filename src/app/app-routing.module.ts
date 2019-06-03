import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateAlunoComponent } from './create-aluno/create-aluno.component';
import { ListAlunoComponent } from './list-aluno/list-aluno.component';
import { EditAlunoComponent } from './edit-aluno/edit-aluno.component';
import { ReadAlunoComponent } from './read-aluno/read-aluno.component';

const routes: Routes = [
  { path: 'create-aluno', component: CreateAlunoComponent },
  { path: 'list-aluno', component: ListAlunoComponent },
  { path: 'edit-aluno/:id', component: EditAlunoComponent },
  { path: 'read-aluno/:id', component: ReadAlunoComponent },
  {path : '', component : ListAlunoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
