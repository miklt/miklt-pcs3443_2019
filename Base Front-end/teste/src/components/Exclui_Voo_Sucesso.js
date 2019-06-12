import React, { Component } from 'react';
import '../css/Cadastro_Sucesso.css';
import { Link, Redirect } from 'react-router-dom';
import logo from '../images/sucesso.png';

class Exclui_Voo_Sucesso extends Component {
 render() {
     return (
         <div className="App">
             <header className="App-header">
                 <img src={logo} className="App-logo" alt="logo" />
                 <h1 className="App-title">Voo de id = {this.props.voo_id} excluido com sucesso</h1><br/>
                 <button id="inicio">
                     <Link to="/instrutor" id="link">Voltar</Link>
                 </button>
                 </header>
         </div>
    );
 }
}
export default Exclui_Voo_Sucesso;