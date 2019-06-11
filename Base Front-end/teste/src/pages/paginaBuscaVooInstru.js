import React, { Component } from 'react';
import axios from 'axios';
import '../css/paginaBuscaVooInstru.css';
import { Link, Redirect } from 'react-router-dom';
import Naveg from '../components/Naveg';

class paginaBuscaVoo extends Component {
 constructor(props) {
   super(props);
   this.state = {
  };
 }

handleSubmit = event => {
   event.preventDefault();

   /* usar como base para metodos post
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
     })*/
 }

 render() {
   /*if (this.state.redirect === true){
       return <Cadastro_Sucesso funcao="Aluno" chave="Número de Matrícula" num_matric={this.state.num_matric} nome={this.state.nome}/>
   }*/
   return (
         <div className="pagina">
            <Naveg/>
            <button id="buttonDanger">
                   <Link id="link" to="/instrutor">Voltar</Link>
            </button>
       </div>
  );
}

}
export default paginaBuscaVoo;