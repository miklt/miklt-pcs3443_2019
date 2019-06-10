import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListAlunoComponent } from './alunos/list-aluno/list-aluno.component';
import { CreateAlunoComponent } from './alunos/create-aluno/create-aluno.component';

import {HttpClientModule} from '@angular/common/http';
import { AlunoService } from './services/aluno.service';
import { ReadAlunoComponent } from './alunos/read-aluno/read-aluno.component';
import {NgxMaskModule} from 'ngx-mask';
import { FormsModule } from '@angular/forms';
import { EditAlunoComponent } from './alunos/edit-aluno/edit-aluno.component';
import { CreateInstrutorComponent } from './instrutores/create-instrutor/create-instrutor.component';
import { EditInstrutorComponent } from './instrutores/edit-instrutor/edit-instrutor.component';
import { ReadInstrutorComponent } from './instrutores/read-instrutor/read-instrutor.component';
import { ListInstrutorComponent } from './instrutores/list-instrutor/list-instrutor.component';
import { ListVooComponent } from './voos/list-voo/list-voo.component';
import { CreateVooComponent } from './voos/create-voo/create-voo.component';
import { EditVooComponent } from './voos/edit-voo/edit-voo.component';
import { ReadVooComponent } from './voos/read-voo/read-voo.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    ListAlunoComponent,
    CreateAlunoComponent,
    ReadAlunoComponent,
    EditAlunoComponent,
    CreateInstrutorComponent,
    EditInstrutorComponent,
    ReadInstrutorComponent,
    ListInstrutorComponent,
    ListVooComponent,
    CreateVooComponent,
    EditVooComponent,
    ReadVooComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxMaskModule.forRoot(),
    FormsModule
  ],
  providers: [
    AlunoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
