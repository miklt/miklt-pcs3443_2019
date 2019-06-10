import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import paginaInicial from '../components/paginaInicial';
import Naveg from '../components/Naveg';

class paginaLogin extends Component {
 constructor(props) {
   super(props);
   this.handleUsuarioChange=this.handleUsuarioChange.bind(this);
   this.handleSenhaChange=this.handleSenhaChange.bind(this);
   this.state = {
      usuario: '',
      senha: '',
  };
 }

 handleUsuarioChange(usuario) {
   this.setState({usuario: usuario,});
}

handleSenhaChange(senha) {
  this.setState({senha: senha,});
}

handleSubmit = event => {
   event.preventDefault();

   const user = {
     usuario: this.state.usuario,
     senha: this.state.senha,
   };
}

 render(){
  if (this.state.usuario === "Admin" && this.state.senha === "lab_engsoft"){
         return <paginaInicial/>
        }
    return (
      <div className="login">
      <Naveg/>
      <form onSubmit={this.handleSubmit}>
          <h1>Faça seu login: </h1>
          <label>Usuario</label><br/>
          <input type="text" name="usuario" value={this.state.usuario} onChange={this.handleUsuarioChange}></input><br/>
          <label>Senha</label><br/>
          <input type="text" name="senha" value={this.state.senha} onChange={this.handleSenhaChange}></input><br/>
          <button id="buttonSuccess" type="submit">Enviar</button>
     </form>
 </div>
  );
}

}
export default paginaLogin;