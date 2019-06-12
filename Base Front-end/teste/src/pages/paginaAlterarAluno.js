import React, { Component } from 'react';
import axios from 'axios';
import '../css/Busca_Sucesso.css';
import { Link, Redirect } from 'react-router-dom';
import Busca_Alterar_Aluno from '../components/Busca_Alterar_Aluno';
import Busca_Sucesso_Aluno from '../components/Busca_Sucesso_Aluno'
import Naveg from '../components/Naveg';

class paginaAlterarAluno extends Component {
 constructor(props) {
   super(props);
   this.handleNumMatricChange=this.handleNumMatricChange.bind(this);
   this.handleEmailChange=this.handleEmailChange.bind(this);
   this.handleEnderecoChange=this.handleEnderecoChange.bind(this);
   this.handleTelefoneChange=this.handleTelefoneChange.bind(this);
   this.state = {
      nome: '',
      email: '',
      cpf: '',
      num_matric: '',
      dataNascimento: '',
      endereco: '',
      telefone: '',
      total_horas_voo: '',
      concluiu_pratica: '',
      concluiu_teorica: '',
      successGet: false,
      successPut: false
  };
 }

handleNumMatricChange(e) {
   this.setState({num_matric: e.target.value,});
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
   axios.get(`https://testeparaaviacao.herokuapp.com/api/Aluno`,{params: {num_matric:this.state.num_matric}})
     .then(res => {
          if (res.data.status === 'success'){
             this.setState({cpf: res.data.data.cpf});
             this.setState({nome: res.data.data.nome});
             this.setState({email: res.data.data.email});   
             this.setState({dataNascimento: res.data.data.data_nascimento});
             this.setState({endereco: res.data.data.endereco});
             this.setState({telefone: res.data.data.telefone});
             this.setState({total_horas_voo: res.data.data.total_horas_voo});
             this.setState({concluiu_pratica: res.data.data.concluiu_pratica});
             this.setState({concluiu_teoria: res.data.data.concluiu_teoria});
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
      num_matric: this.state.num_matric
    };
    
    axios.put(`https://testeparaaviacao.herokuapp.com/api/Aluno`,user)
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
                    <h1>Dados Do Aluno:</h1>
                    <Busca_Alterar_Aluno
                    nome={this.state.nome}
                    cpf={this.state.cpf}
                    num_matric={this.state.num_matric}
                    email={this.state.email}
                    dataNascimento={this.state.dataNascimento}
                    endereco={this.state.endereco}
                    telefone={this.state.telefone}
                    total_horas_voo={this.state.total_horas_voo}
                    concluiu_pratica={this.state.concluiu_pratica}
                    concluiu_teoria={this.state.concluiu_teoria}
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
                    <Busca_Sucesso_Aluno
                    nome={this.state.nome}
                    cpf={this.state.cpf}
                    num_matric={this.state.num_matric}
                    email={this.state.email}
                    dataNascimento={this.state.dataNascimento}
                    endereco={this.state.endereco}
                    telefone={this.state.telefone}
                    total_horas_voo={this.state.total_horas_voo}
                    concluiu_pratica={this.state.concluiu_pratica}
                    concluiu_teoria={this.state.concluiu_teoria}
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
                <h1>Digite o numero de matricula do aluno: </h1>
                <label>Numero de Matricula</label><br/>
                <input type="text" name="cpf" value={this.state.num_matric} onChange={this.handleNumMatricChange}></input><br/>
                <button id="buttonSuccess" type="submit">Enviar</button>
           </form>
           <button id="buttonDanger1">
                   <Link id="link" to="/funcionario">Voltar</Link>
            </button>
       </div>
  );
}

}
export default paginaAlterarAluno;