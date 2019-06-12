import React, { Component } from 'react';
import axios from 'axios';
import '../css/Busca_Sucesso.css';
import { Link, Redirect } from 'react-router-dom';
import Exclui_Voo_Sucesso from '../components/Exclui_Voo_Sucesso';
import Naveg from '../components/Naveg';

class paginaExcluiVoo extends Component {
 constructor(props) {
   super(props);
   this.handleVooIdChange=this.handleVooIdChange   .bind(this);
   this.state = {
      voo_id: '',
      success: false,
  };
 }

handleVooIdChange(e) {
   this.setState({voo_id: e.target.value,});
}

handleSubmit = event => {
   event.preventDefault();

   axios.delete(`https://testeparaaviacao.herokuapp.com/api/Voo`,{params: {voo_id:this.state.voo_id}})
     .then(res => {
          if (res.status === '204')
             this.setState({success: true})
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
     console.log({params: {voo_id:this.state.voo_id}})
 }

 render() {
  if (this.state.success === true){
        return (
           <div className="pagina">
               <h1>Dados Cadastrais Do Aluno:</h1>
               <Exclui_Voo_Sucesso
               voo_id={this.state.voo_id}
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
                <h1>Digite o id do voo que deseja excluir: </h1>
                <label>Identificador do voo</label><br/>
                <input type="text" name="cpf" value={this.state.voo_id} onChange={this.handleVooIdChange}></input><br/>
                <button id="buttonSuccess" type="submit">Enviar</button>
           </form>
           <button id="buttonDanger1">
                   <Link id="link" to="/instrutor">Voltar</Link>
            </button>
       </div>
  );
}

}
export default paginaExcluiVoo;