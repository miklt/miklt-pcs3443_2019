import React, { Component } from 'react';
import '../css/paginaCadastro.css';
import { Link } from 'react-router-dom'
import Ficha_Cadastro from '../components/Ficha_Cadastro'

class paginaCadastro extends Component {
 constructor(props) {
   super(props);
   this.handleNameChange=this.handleNameChange.bind(this)
   this.handleEmailChange=this.handleEmailChange.bind(this)
   this.handleCpfChange=this.handleCpfChange.bind(this)
   this.handleDataNascimentoChange=this.handleDataNascimentoChange.bind(this)
   this.handleTelefoneChange=this.handleTelefoneChange.bind(this)
   this.state = {
      nome: '',
      email: '',
      cpf: '',
      dataNascimento: '',
      telefone: '',
  }
 }

 handleNameChange(nome) {
    this.setState({nome: nome,})
 }

handleEmailChange(email) {
   this.setState({email: email,})
}

handleCpfChange(cpf) {
   this.setState({cpf: cpf,})
}

handleDataNascimentoChange(dataNascimento) {
   this.setState({dataNascimento: dataNascimento,})
}

handleTelefoneChange(telefone) {
   this.setState({telefone: telefone,})
}

handleSubmit = event => {
        
   event.preventDefault();
   
   // Aqui vai a requisiçao axios

}

 render() {
 return (
    <div className="pagina">
      <form onSubmit={this.handleSubmit}>
            <Ficha_Cadastro 
            nome={this.state.nome}
            email={this.state.email}
            cpf={this.state.cpf}
            dataNascimento={this.state.dataNascimento}
            telefone={this.state.telefone}
            onNameChange={this.handleNameChange}
            onEmailChange={this.handleEmailChange}
            onCpfChange={this.handleCpfChange}
            onDataNascimentoChange={this.handleDataNascimentoChange}
            onTelefoneChange={this.handleTelefoneChange}/>
            <button type="submit">Enviar</button> 
            <button>
               <Link to="/">Voltar</Link>
            </button>
         </form>
    </div>
 );
 }
}
export default paginaCadastro;