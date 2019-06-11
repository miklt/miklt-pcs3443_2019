import React, { Component } from 'react';
import axios from 'axios';
import '../css/Busca_Sucesso.css';
import { Link, Redirect } from 'react-router-dom';
import Busca_Sucesso_Aluno from '../components/Busca_Sucesso_Aluno';
import Naveg from '../components/Naveg';

class paginaBuscaAluno extends Component {
 constructor(props) {
   super(props);
   this.handleNumMatricChange=this.handleNumMatricChange.bind(this);
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
      success: false,
  };
 }

handleNumMatricChange(e) {
   this.setState({num_matric: e.target.value,});
}

handleSubmit = event => {
   event.preventDefault();
   axios.get(`https://testeparaaviacao.herokuapp.com/api/Aluno`,{params: {num_matric:this.state.num_matric}})
     .then(res => {
          if (res.data.status === 'success')
             this.setState({cpf: res.data.data.cpf});
             this.setState({nome: res.data.data.nome});
             this.setState({email: res.data.data.email});   
             this.setState({dataNascimento: res.data.data.data_nascimento});
             this.setState({endereco: res.data.data.endereco});
             this.setState({telefone: res.data.data.telefone});
             this.setState({total_horas_voo: res.data.data.total_horas_voo});
             this.setState({concluiu_pratica: res.data.data.concluiu_pratica});
             this.setState({concluiu_teoria: res.data.data.concluiu_teoria});
             this.setState({success: true});
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
                   <Link id="link" to="/home">Voltar</Link>
               </button>
            </div>
        );
      
  }
    return (
        <div className="pagina">
            <Naveg/>
            <form onSubmit={this.handleSubmit}>
                <h1>Digite o numero de matricula do aluno que deseja buscar: </h1>
                <label>Numero de Matricula</label><br/>
                <input type="text" name="cpf" value={this.state.num_matric} onChange={this.handleNumMatricChange}></input><br/>
                <button id="buttonSuccess" type="submit">Enviar</button>
           </form>
           <button id="buttonDanger1">
                   <Link id="link" to="/home">Voltar</Link>
            </button>
       </div>
  );
}

}
export default paginaBuscaAluno;