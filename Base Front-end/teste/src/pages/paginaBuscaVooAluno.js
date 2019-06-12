import React, { Component } from 'react';
import axios from 'axios';
import '../css/paginaBuscaVooAluno.css';
import { Link, Redirect } from 'react-router-dom';
import Naveg from '../components/Naveg';
import Busca_Voo_Id from '../components/Busca_Voo_Id';

class paginaBuscaVooAluno extends Component {
 constructor(props) {
   super(props);
   this.handleEscolhaChange=this.handleEscolhaChange.bind(this);
   this.handleInputChange=this.handleInputChange.bind(this);
   this.state = {
      escolha: '',
      input: '',
      data_voo: '',
      hora_inicio: '',
      horas_total: '',
      nota: '',
      instrutor_id: '',
      aluno_id: '',
      voo_id: '',
      dados_voo_aluno: '',
      success: false
  };
}

handleEscolhaChange(e) {
   this.setState({escolha: e.target.value,});
}

handleInputChange(e) {
   this.setState({input: e.target.value,});
}

handleSubmit = event => {
   event.preventDefault();
   if(this.state.escolha == 1) {
      axios.get('https://testeparaaviacao.herokuapp.com/api/Voo',{params: {voo_id:this.state.input}})
     .then(res => {
          if (res.data.status === 'success'){
             this.setState({data_voo: res.data.data.data_voo});
             this.setState({hora_inicio: res.data.data.hora_inicio});
             this.setState({horas_total: res.data.data.horas_total});
             this.setState({nota: res.data.data.nota});
             this.setState({instrutor_id: res.data.data.instrutor_id});
             this.setState({aluno_id: res.data.data.aluno_id});
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
   else if (this.state.escolha == 2) {
      // busca por número de Matrícula
   }
   
}

 render() {
   if (this.state.escolha == 1 && this.state.success == true){
       return (
               <div className="pagina">
                  <Busca_Voo_Id 
                  voo_id={this.state.input}
                  aluno_id={this.state.aluno_id}
                  instrutor_id={this.state.instrutor_id}
                  data_voo={this.state.data_voo}
                  hora_inicio={this.state.hora_inicio}
                  horas_total={this.state.horas_total}
                  nota={this.state.nota}
                  />
                  <button id="buttonDanger" type="submit">
                     <Link id="link" to="/aluno">Voltar</Link>
                  </button>
              </div>
            );
   }
   else if (this.state.escolha == 2 && this.state.success == true){
       return <h1></h1>
   }
   return (
      <div className="pagina">
      <Naveg/>
      <form onSubmit={this.handleSubmit}>
          <h1>Busca Voo Aluno</h1><br/><br/>
          <h2 className="info">Escolha se deseja buscar por Id do voo ou listar todos os voos por número de matrícula</h2>
          <br/>
          <select type="text" name="escolha" value={this.props.escolha} onChange={this.handleEscolhaChange}>
                        <option value={''}>Modo de Busca</option>
                        <option value={1}>Id Voo</option>
                        <option value={2}>Número De Matrícula</option>
          </select> 
          <input type="text" name="input" value={this.state.input} onChange={this.handleInputChange}></input><br/>
          <button id="buttonSuccess" type="submit">Enviar</button>
     </form>
     <button id="buttonDanger1">
             <Link id="link" to="/aluno">Voltar</Link>
     </button>
     </div>
  );
}

}
export default paginaBuscaVooAluno;