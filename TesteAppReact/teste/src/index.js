import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import paginaCadastro from './pages/paginaCadastro';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import paginaInicial from './pages/paginaInicial';

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route path="/" exact={true} component={paginaInicial} />
            <Route path="/cadastro" component={paginaCadastro} />
        </Switch>
    </ BrowserRouter>
    , document.getElementById('root'));
