import React, { Component } from 'react';
import axios from 'axios';
import '../css/Busca_Sucesso.css';
import Progresso from '../components/Progresso';
import { Link, Redirect } from 'react-router-dom';
import Naveg from '../components/Naveg';

class paginaProgressoAluno extends Component {
 constructor(props) {
   super(props);
   this.handleNumMatricChange=this.handleNumMatricChange.bind(this);
   this.state = {
      nome: '',
      num_matric: '',
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
          if (res.data.status === 'success'){
             this.setState({nome: res.data.data.nome});
             this.setState({total_horas_voo: res.data.data.total_horas_voo});
             this.setState({concluiu_pratica: res.data.data.concluiu_pratica});
             this.setState({concluiu_teoria: res.data.data.concluiu_teoria});
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
               <Naveg/>
               <br/>
               <h1>Progresso Aluno:</h1>
               <Progresso
               nome={this.state.nome}
               total_horas_voo={this.state.total_horas_voo}
               concluiu_pratica={this.state.concluiu_pratica}
               concluiu_teoria={this.state.concluiu_teoria}
               />
               <button id="buttonDanger">
                   <Link id="link" to="/aluno">Voltar</Link>
               </button>
            </div>
        );
      
  }
    return (
        <div className="pagina">
            <Naveg/>
            <form onSubmit={this.handleSubmit}>
                <h1>Progresso Aluno</h1>
                <label>Digite Seu Número de Matricula</label><br/>
                <input type="text" name="cpf" value={this.state.num_matric} onChange={this.handleNumMatricChange}></input><br/>
                <button id="buttonSuccess" type="submit">Enviar</button>
           </form>
           <button id="buttonDanger1">
                   <Link id="link" to="/aluno">Voltar</Link>
            </button>
       </div>
  );
}

}
export default paginaProgressoAluno;