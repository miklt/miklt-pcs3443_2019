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
import { BrowserRouter, Switch, Route } from 'react-router-dom'


ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route path="/" exact={true} component={paginaLogin} />
            <Route path="/home" component={paginaInicial} />
            <Route path="/aluno" component={paginaAluno} />
            <Route path="/instrutor" component={paginaInstru} />
            <Route path="/cadastroInstrutor" component={paginaCadastroInstrutor} />
            <Route path="/buscaInstrutor" component={paginaBuscaInstrutor} />
            <Route path="/funcionario" component={paginaFunc} />
            <Route path="/cadastroAluno" component={paginaCadastroAluno} />
            <Route path="/buscaAluno" component={paginaBuscaAluno} />
            <Route path="/buscaVooAluno" component={paginaBuscaVooAluno} />
            <Route path="/avaliaVoo" component={paginaAvaliaVoo} />
            <Route path="/buscaVooInstru" component={paginaBuscaVooInstru} />
            <Route path="/excluiVoo" component={paginaExcluiVoo} />
        </Switch>
    </ BrowserRouter>
    , document.getElementById('root'));
