import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import paginaInicial from './pages/paginaInicial';
import paginaAluno from './pages/paginaAluno';
import paginaInstru from './pages/paginaInstru';
import paginaFunc from './pages/paginaFunc';
import paginaCadastroAluno from './pages/paginaCadastroAluno';
import paginaBuscaAluno from './pages/paginaBuscaAluno';
import paginaBuscaVooAluno from './pages/paginaBuscaVooAluno';
import paginaLogin from './pages/paginaLogin';
import paginaCadastroInstrutor from './pages/paginaCadastroInstrutor';
import paginaBuscaInstrutor from './pages/paginaBuscaInstrutor';
import paginaAvaliaVoo from './pages/paginaAvaliaVoo';
import paginaBuscaVooInstru from './pages/paginaBuscaVooInstru';
import paginaExcluiVoo from './pages/paginaExcluiVoo';
import paginaAlterarAluno from './pages/paginaAlterarAluno';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import paginaAlterarInstrutor from './pages/paginaAlterarInstrutor';
import paginaHabilitarAluno from './pages/paginaHabilitarAluno';


ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route path="/" exact={true} component={paginaLogin} />
            <Route path="/home" component={paginaInicial} />
            <Route path="/aluno" exact={true} component={paginaAluno} />
            <Route path="/aluno/buscaDados" component={paginaBuscaAluno} />
            <Route path="/aluno/alteraDados" component={paginaAlterarAluno} />
            <Route path="/aluno/buscaVoo" component={paginaBuscaVooAluno} />
            <Route path="/instrutor" exact={true} component={paginaInstru} />
            <Route path="/instrutor/buscaDados" component={paginaBuscaInstrutor} />
            <Route path="/instrutor/avaliaVoo" component={paginaAvaliaVoo} />
            <Route path="/instrutor/buscaVoo" component={paginaBuscaVooInstru} />
            <Route path="/instrutor/excluiVoo" component={paginaExcluiVoo} />
            <Route path="/instrutor/alteraDados" component={paginaAlterarInstrutor} />
            <Route path="/funcionario" exact={true} component={paginaFunc} />
            <Route path="/funcionario/cadastroAluno" component={paginaCadastroAluno} />
            <Route path="/funcionario/buscaAluno" component={paginaBuscaAluno} />
            <Route path="/funcionario/cadastroInstrutor" component={paginaCadastroInstrutor} />
            <Route path="/funcionario/buscaInstrutor" component={paginaBuscaInstrutor} />
            <Route path="/funcionario/habilitaAluno" component={paginaHabilitarAluno} />
            <Route path="/funcionario/alteraAluno" component={paginaAlterarAluno} />
            <Route path="/funcionario/alteraInstrutor" component={paginaAlterarInstrutor} />
        </Switch>
    </ BrowserRouter>
    , document.getElementById('root'));
