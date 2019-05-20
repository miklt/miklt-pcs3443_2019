import React, { Component } from 'react';
import logo from './airplane.png';
import '../css/paginaInicial.css';
import { Link } from 'react-router-dom'

class paginaInicial extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Bem-vindo ao Bandeco's Aeroclube!</h1>
          <button id="cadastro">
          <Link to="/cadastro" id="link">Cadastre-se</Link>
          </button>
        </header>
      </div>
    );
  }
}

export default paginaInicial;
