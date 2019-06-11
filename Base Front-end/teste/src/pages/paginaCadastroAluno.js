import React, { Component } from 'react';
import axios from 'axios';
import '../css/paginaCadastro.css';
import { Link, Redirect } from 'react-router-dom';
import Ficha_Cadastro_Aluno from '../components/Ficha_Cadastro_Aluno';
import Cadastro_Sucesso from '../components/Cadastro_Sucesso';
import Naveg from '../components/Naveg';

class paginaCadastroAluno extends Component {
 constructor(props) {
   super(props);
   this.handleNameChange=this.handleNameChange.bind(this);
   this.handleEmailChange=this.handleEmailChange.bind(this);
   this.handleCpfChange=this.handleCpfChange.bind(this);
   this.handleDataNascimentoChange=this.handleDataNascimentoChange.bind(this);
   this.handleTelefoneChange=this.handleTelefoneChange.bind(this);
   this.handleEnderecoChange=this.handleEnderecoChange.bind(this);
   this.state = {
      nome: '',
      num_matric: '',
      email: '',
      cpf: '',
      dataNascimento: '',
      endereco: '',
      telefone: '',
      redirect: false
  };
 }

 handleNameChange(nome) {
    this.setState({nome: nome,});
 }

handleEmailChange(email) {
   this.setState({email: email,});
}

handleCpfChange(cpf) {
   this.setState({cpf: cpf,});
}

handleDataNascimentoChange(dataNascimento) {
   this.setState({dataNascimento: dataNascimento,});
}

handleEnderecoChange(endereco) {
   this.setState({endereco: endereco,});
}

handleTelefoneChange(telefone) {
   this.setState({telefone: telefone,});
}

handleSubmit = event => {
   event.preventDefault();

   const user = {
     nome: this.state.nome,
     email: this.state.email,
     cpf: this.state.cpf,
     data_nascimento: this.state.dataNascimento,
     endereco: this.state.endereco,
     telefone: this.state.telefone
   };
   
   axios.post(`https://testeparaaviacao.herokuapp.com/api/Aluno`,user)
     .then(res => {
          if (res.data.status === 'success'){
             this.setState({redirect: true});
             this.setState({num_matric: res.data.data.num_matric});
          }
          console.log(res.data.status);
          console.log(res);
          console.log(res.data);
    })
     .catch(function (error) {
          if (error.response) {
             alert(error.response.data.message);
             console.log(error.response.data);
             console.log(error.response.headers);
          } else if (error.request) {
             console.log(error.request);
          } else {

             console.log('Error', error.message);
          }
          console.log(error.config);
     })
 }

 render() {
   if (this.state.redirect === true){
       return <Cadastro_Sucesso num_matric={this.state.num_matric} nome={this.state.nome}/>
   }
   return (
         <div className="pagina">
            <Naveg/>
            <form onSubmit={this.handleSubmit}>
               <Ficha_Cadastro_Aluno 
               nome={this.state.nome}
               email={this.state.email}
               cpf={this.state.cpf}
               dataNascimento={this.state.dataNascimento}
               endereco={this.state.endereco}
               telefone={this.state.telefone}
               onNameChange={this.handleNameChange}
               onEmailChange={this.handleEmailChange}
               onCpfChange={this.handleCpfChange}
               onDataNascimentoChange={this.handleDataNascimentoChange}
               onEnderecoChange={this.handleEnderecoChange}
               onTelefoneChange={this.handleTelefoneChange}/>
               <button id="buttonSuccess" type="submit">Enviar</button> 
            </form>
            <button id="buttonDanger">
                   <Link id="link" to="/funcionario">Voltar</Link>
            </button>
       </div>
  );
}

}
export default paginaCadastroAluno;