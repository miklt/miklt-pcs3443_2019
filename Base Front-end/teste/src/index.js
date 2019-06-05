import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import paginaInicial from './pages/paginaInicial';
import paginaCadastro from './pages/paginaCadastro';
import paginaBusca from './pages/paginaBusca';
import { BrowserRouter, Switch, Route } from 'react-router-dom'


ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route path="/" exact={true} component={paginaInicial} />
            <Route path="/cadastro" component={paginaCadastro} />
            <Route path="/busca" component={paginaBusca} />
        </Switch>
    </ BrowserRouter>
    , document.getElementById('root'));
