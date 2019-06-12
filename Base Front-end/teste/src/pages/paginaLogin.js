import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import logo from '../images/airplane.png';
import axios from 'axios';
import '../css/paginaLogin.css';
import paginaInicial from '../pages/paginaInicial';

class paginaLogin extends Component {
 constructor(props) {
   super(props);
   this.handleUsuarioChange=this.handleUsuarioChange.bind(this);
   this.handleSenhaChange=this.handleSenhaChange.bind(this);
   this.state = {
      usuario: '',
      senha: '',
      success: false,
  };
 }

 handleUsuarioChange(e) {
   this.setState({usuario: e.target.value,});
}

handleSenhaChange(e) {
  this.setState({senha: e.target.value,});
}

handleSubmit = event => {
   event.preventDefault();
   
   axios.get(`https://testeparaaviacao.herokuapp.com/api/Login`,{params: {user:this.state.usuario, password:this.state.senha}})
   .then(res => {
        if (res.data.status === 'success'){
           this.setState({success: true});
        }
        console.log(res.data.status);
        console.log(res);
        console.log(res.data);
        
  })
   .catch(function (error) {
        if (error.response) {
           alert(error.response.data.message);
           console.log(error.response.status);
           console.log(error.response.headers);
        } else if (error.request) {
           console.log(error.request);
        } else {

           console.log('Error', error.message);
        }
        console.log(error.config);
   })

}

 render(){
  if (this.state.success == true){
        return <Redirect to="/home"/>
        }
  return (
      <div className="login ">
      <h1 className="h1">Bandeco's Aeroclube</h1>
      <form onSubmit={this.handleSubmit}>
          <h2>Faça seu login: </h2>
          <label className="label">Usuario</label><br/>
          <input className="input" type="text" name="usuario" value={this.state.usuario} onChange={this.handleUsuarioChange}></input><br/>
          <label className="label">Senha</label><br/>
          <input className="input" type="password" name="senha" value={this.state.senha} onChange={this.handleSenhaChange}></input><br/>
          <button id="buttonSuccess" type="submit">Enviar</button>
     </form>
     <footer>
         <img src={logo} className="App-logo" alt="logo" />
      </footer>
     </div>
  );
}

}
export default paginaLogin;