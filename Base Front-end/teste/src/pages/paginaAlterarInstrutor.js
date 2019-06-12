import React, { Component } from 'react';
import axios from 'axios';
import '../css/Busca_Sucesso.css';
import { Link, Redirect } from 'react-router-dom';
import Busca_Alterar_Instrutor from '../components/Busca_Alterar_Instrutor';
import Busca_Sucesso_Instrutor from '../components/Busca_Sucesso_Instrutor'
import Naveg from '../components/Naveg';

class paginaAlterarInstrutor extends Component {
 constructor(props) {
   super(props);
   this.handleNumCadastroChange=this.handleNumCadastroChange.bind(this);
   this.handleEmailChange=this.handleEmailChange.bind(this);
   this.handleEnderecoChange=this.handleEnderecoChange.bind(this);
   this.handleTelefoneChange=this.handleTelefoneChange.bind(this);
   this.state = {
      nome: '',
      email: '',
      cpf: '',
      num_cadastro: '',
      breve: '',
      dataNascimento: '',
      endereco: '',
      telefone: '',
      status: '',
      successGet: false,
      successPut: false
  };
 }

handleNumCadastroChange(e) {
   this.setState({num_cadastro: e.target.value,});
}

handleEmailChange(email) {
    this.setState({email: email});
}

handleEnderecoChange(endereco) {
    this.setState({endereco: endereco,});
}

handleTelefoneChange(telefone) {
    this.setState({telefone: telefone,});
}

handleSubmitGet = event => {
   event.preventDefault();
   axios.get(`https://testeparaaviacao.herokuapp.com/api/Instrutor`,{params: {num_cadastro:this.state.num_cadastro}})
     .then(res => {
          if (res.data.status === 'success'){
             this.setState({cpf: res.data.data.cpf});
             this.setState({nome: res.data.data.nome});
             this.setState({email: res.data.data.email});   
             this.setState({dataNascimento: res.data.data.data_nascimento});
             this.setState({endereco: res.data.data.endereco});
             this.setState({telefone: res.data.data.telefone});
             this.setState({status: res.data.data.status});
             this.setState({breve: res.data.data.breve});
             this.setState({successGet: true});
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

 handleSubmitPut = event => {
    event.preventDefault();
 
    const user = {
      nome: this.state.nome,
      email: this.state.email,
      cpf: this.state.cpf,
      data_nascimento: this.state.dataNascimento,
      endereco: this.state.endereco,
      telefone: this.state.telefone,
      num_cadastro: this.state.num_cadastro,
      breve: this.state.breve,
    };
    
    axios.put(`https://testeparaaviacao.herokuapp.com/api/Instrutor`,user)
      .then(res => {
           if (res.data.status === 'success'){
            this.setState({successPut: true});
            this.setState({successGet: false});
            this.setState({cpf: res.data.data.cpf});
            this.setState({nome: res.data.data.nome});
            this.setState({email: res.data.data.email});   
            this.setState({dataNascimento: res.data.data.data_nascimento});
            this.setState({endereco: res.data.data.endereco});
            this.setState({telefone: res.data.data.telefone});
            this.setState({breve: res.data.data.breve});
            this.setState({status: res.data.data.status})
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
  if (this.state.successGet === true){
        return (
           <div className="pagina">
               <form onSubmit={this.handleSubmitPut}>
                    <h1>Dados Do Instrutor:</h1>
                    <Busca_Alterar_Instrutor
                    nome={this.state.nome}
                    cpf={this.state.cpf}
                    num_cadastro={this.state.num_cadastro}
                    email={this.state.email}
                    dataNascimento={this.state.dataNascimento}
                    endereco={this.state.endereco}
                    telefone={this.state.telefone}
                    breve={this.state.breve}
                    status={this.state.status}
                    onEmailChange={this.handleEmailChange}
                    onEnderecoChange={this.handleEnderecoChange}
                    onTelefoneChange={this.handleTelefoneChange}
                    />
               <button id="buttonSuccess" type="submit">Enviar</button>   
               </form>
               <button id="buttonDanger">
                   <Link id="link" to="/funcionario">Voltar</Link>
               </button>
            </div>
        );
    }
    if (this.state.successPut === true){
        return (
            <div className="pagina">
                <h1>Dados Alterados com sucesso!</h1>
                    <Busca_Sucesso_Instrutor
                    nome={this.state.nome}
                    cpf={this.state.cpf}
                    num_cadastro={this.state.num_cadastro}
                    breve={this.state.breve}
                    status={this.state.status}
                    email={this.state.email}
                    dataNascimento={this.state.dataNascimento}
                    endereco={this.state.endereco}
                    telefone={this.state.telefone}
                    />
                <button id="buttonDanger">
                    <Link id="link" to="/funcionario">Voltar</Link>
                </button>
             </div>
         );
     }
    return (
        <div className="pagina">
            <Naveg/>
            <form onSubmit={this.handleSubmitGet}>
                <h1>Digite o numero de cadastro do instrutor: </h1>
                <label>Numero de Cadastro</label><br/>
                <input type="text" name="cpf" value={this.state.num_cadastro} onChange={this.handleNumCadastroChange}></input><br/>
                <button id="buttonSuccess" type="submit">Enviar</button>
           </form>
           <button id="buttonDanger1">
                   <Link id="link" to="/funcionario">Voltar</Link>
            </button>
       </div>
  );
}

}
export default paginaAlterarInstrutor;