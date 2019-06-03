import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListAlunoComponent } from './list-aluno/list-aluno.component';
import { CreateAlunoComponent } from './create-aluno/create-aluno.component';

import {HttpClientModule} from '@angular/common/http';
import { AlunoService } from './services/aluno.service';
import { ReadAlunoComponent } from './read-aluno/read-aluno.component';
import {NgxMaskModule} from 'ngx-mask';
import { FormsModule } from '@angular/forms';
import { EditAlunoComponent } from './edit-aluno/edit-aluno.component';

@NgModule({
  declarations: [
    AppComponent,
    ListAlunoComponent,
    CreateAlunoComponent,
    ReadAlunoComponent,
    EditAlunoComponent
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
