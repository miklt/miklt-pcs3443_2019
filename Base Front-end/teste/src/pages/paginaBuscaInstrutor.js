import React, { Component } from 'react';
import axios from 'axios';
import '../css/Busca_Sucesso.css';
import { Link, Redirect } from 'react-router-dom';
import Busca_Sucesso_Instrutor from '../components/Busca_Sucesso_Instrutor';
import Naveg from '../components/Naveg';

class paginaBuscaInstrutor extends Component {
 constructor(props) {
   super(props);
   this.handleNumCadastroChange=this.handleNumCadastroChange.bind(this);
   this.state = {
      nome: '',
      email: '',
      cpf: '',
      breve: '',
      num_cadastro: '',
      dataNascimento: '',
      endereco: '',
      telefone: '',
      status:'',
      success: false,
  };
 }

handleNumCadastroChange(e) {
   this.setState({num_cadastro: e.target.value,});
}

handleSubmit = event => {
   event.preventDefault();
   axios.get(`https://testeparaaviacao.herokuapp.com/api/Instrutor`,{params: {num_cadastro:this.state.num_cadastro}})
     .then(res => {
          if (res.data.status === 'success'){
             this.setState({cpf: res.data.data.cpf});
             this.setState({nome: res.data.data.nome});
             this.setState({email: res.data.data.email});   
             this.setState({breve: res.data.data.breve});
             this.setState({dataNascimento: res.data.data.data_nascimento});
             this.setState({endereco: res.data.data.endereco});
             this.setState({telefone: res.data.data.telefone});
             this.setState({status: res.data.data.status});
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

 render() {
  if (this.state.success === true){
        return (
           <div className="pagina">
               <h1>Dados Cadastrais Do Aluno:</h1>
               <Busca_Sucesso_Instrutor
               nome={this.state.nome}
               cpf={this.state.cpf}
               breve={this.state.breve}
               num_cadastro={this.state.num_cadastro}
               email={this.state.email}
               dataNascimento={this.state.dataNascimento}
               status={this.state.status}
               endereco={this.state.endereco}
               telefone={this.state.telefone}
               />
               <button id="buttonDanger">
                   <Link id="link" to="/instrutor">Voltar</Link>
               </button>
            </div>
        );
      
  }
    return (
        <div className="pagina">
            <Naveg/>
            <form onSubmit={this.handleSubmit}>
                <h1>Digite seu número de Cadastro: </h1>
                <label>Número de Cadastro</label><br/>
                <input type="text" name="num_cadastro" value={this.state.num_cadastro} onChange={this.handleNumCadastroChange}></input><br/>
                <button id="buttonSuccess" type="submit">Enviar</button>
           </form>
           <button id="buttonDanger1">
                   <Link id="link" to="/instrutor">Voltar</Link>
            </button>
       </div>
  );
}

}
export default paginaBuscaInstrutor;