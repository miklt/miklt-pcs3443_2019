import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import paginaInicial from './pages/paginaInicial';
import paginaAluno from './pages/paginaAluno';
import paginaInstru from './pages/paginaInstru';
import paginaFunc from './pages/paginaFunc';
import paginaCadastro from './pages/paginaCadastro';
import paginaBusca from './pages/paginaBusca';
import paginaLogin from './pages/paginaLogin';
import { BrowserRouter, Switch, Route } from 'react-router-dom'


ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route path="/" exact={true} component={paginaLogin} />
            <Route path="/home" component={paginaInicial} />
            <Route path="/aluno" component={paginaAluno} />
            <Route path="/instrutor" component={paginaInstru} />
            <Route path="/funcionario" component={paginaFunc} />
            <Route path="/cadastro" component={paginaCadastro} />
            <Route path="/busca" component={paginaBusca} />
        </Switch>
    </ BrowserRouter>
    , document.getElementById('root'));
