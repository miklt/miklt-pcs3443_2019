import React, { Component } from 'react';
import axios from 'axios';
import '../css/Busca_Sucesso.css';
import { Link, Redirect } from 'react-router-dom';
import Busca_Deletar_Instrutor from '../components/Busca_Deletar_Instrutor';
import Busca_Sucesso_Aluno from '../components/Busca_Sucesso_Aluno'
import Naveg from '../components/Naveg';

class paginaDeletarInstrutor extends Component {
 constructor(props) {
   super(props);
   this.handleNumCadastroChange=this.handleNumCadastroChange.bind(this);
   this.state = {
      nome: '',
      email: '',
      cpf: '',
      num_cadastro: '',
      dataNascimento: '',
      breve: '',
      status: '',
      endereco: '',
      telefone: '',
      successGet: false,
      successPut: false
  };
 }

handleNumCadastroChange(e) {
   this.setState({num_cadastro: e.target.value,});
}

handleSubmitGet = event => {
   event.preventDefault();
   axios.get(`https://testeparaaviacao.herokuapp.com/api/Instrutor`,{params: {num_cadastro:this.state.num_cadastro}})
     .then(res => {
          if (res.data.status === 'success'){
             this.setState({cpf: res.data.data.cpf});
             this.setState({nome: res.data.data.nome});
             this.setState({email: res.data.data.email});   
             this.setState({num_cadastro: res.data.data.num_cadastro});
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
    
    axios.delete('https://testeparaaviacao.herokuapp.com/api/Instrutor',{params: {num_cadastro: this.state.num_cadastro}})
      .then(res => {
           if (res.status == 204){
            this.setState({successPut: true});
            this.setState({successGet: false});
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
           <Naveg/>
               <form onSubmit={this.handleSubmitPut}>
                    <h1>Dados Do Instrutor:</h1>
                    <h2>Tome cuidado, essa ação é irreversível!</h2>
                    <Busca_Deletar_Instrutor
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
               <button id="buttonDanger" type="submit">Desativar</button>   
               </form>
               <button id="buttonSuccess">
                   <Link id="link" to="/funcionario">Voltar</Link>
               </button>
            </div>
        );
    }
    if (this.state.successPut === true){
        return (
            
            <div className="pagina">
            <Naveg/>
                <h1>Instrutor desativado com sucesso!</h1>
                <button id="buttonDanger">
                    <Link id="link" to="/funcionario">Voltar</Link>
                </button>
             </div>
         );
     }
    return (
        <div className="pagina">
            
            <form onSubmit={this.handleSubmitGet}>
            <Naveg/>
                <h1>Digite o numero de cadastro do instrutor a ser desativado: </h1>
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
export default paginaDeletarInstrutor;