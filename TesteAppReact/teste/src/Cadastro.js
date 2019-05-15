import React, { Component } from 'react';
import logo from './airplane.png';
import './Cadastro.css';
import { Link } from 'react-router-dom'
import Ficha_Cadastro from './Ficha_Cadastro'

class Cadastro extends Component {
 render() {
 return (
    <div className="pagina">
       <Ficha_Cadastro />
       <button>
          <Link to="/">Voltar</Link>
       </button>
    </div>
 );
 }
}
export default Cadastro;