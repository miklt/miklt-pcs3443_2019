import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import paginaInicial from './pages/paginaInicial';
import paginaCadastro from './pages/paginaCadastro';
import paginaCadastroSucesso from './pages/paginaCadastroSucesso';
import { BrowserRouter, Switch, Route } from 'react-router-dom'


ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route path="/" exact={true} component={paginaInicial} />
            <Route path="/cadastro" component={paginaCadastro} />
            <Route path="/cadastroSucesso" component={paginaCadastroSucesso} />
        </Switch>
    </ BrowserRouter>
    , document.getElementById('root'));
