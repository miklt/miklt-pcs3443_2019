import React, { Component } from 'react';
import axios from 'axios';
import '../css/paginaAvaliaVoo.css';
import Ficha_Avalia_Voo from '../components/Ficha_Avalia_Voo';
import Cadastro_Sucesso from '../components/Cadastro_Sucesso';
import { Link, Redirect } from 'react-router-dom';
import Naveg from '../components/Naveg';

class paginaAvaliaVoo extends Component {
   constructor(props) {
      super(props);
      this.handleDataVooChange=this.handleDataVooChange.bind(this);
      this.handleHoraVooChange=this.handleHoraVooChange.bind(this);
      this.handleHorasTotalChange=this.handleHorasTotalChange.bind(this);
      this.handleNotaChange=this.handleNotaChange.bind(this);
      this.handleInstrutorIdChange=this.handleInstrutorIdChange.bind(this);
      this.handleAlunoIdChange=this.handleAlunoIdChange.bind(this);
      this.state = {
         data_voo: '',
         hora_voo: '',
         horas_total: '',
         nota: '',
         instrutor_id: '',
         aluno_id: '',
         redirect: false
     };
    }
   
   handleDataVooChange(data_voo) {
       this.setState({data_voo: data_voo,});
    }
   
   handleHoraVooChange(hora_voo) {
      this.setState({hora_voo: hora_voo,});
   }

   handleHorasTotalChange(horas_total) {
      this.setState({horas_total: horas_total,});
   }
   
   handleNotaChange(nota) {
      this.setState({nota: nota,});
   }
   
   handleInstrutorIdChange(instrutor_id) {
      this.setState({instrutor_id: instrutor_id,});
   }
   
   handleAlunoIdChange(aluno_id) {
      this.setState({aluno_id: aluno_id,});
   }
   
   handleSubmit = event => {
      event.preventDefault();
   
      const voo = {
        data_voo: this.state.data_voo,
        hora_voo: this.state.hora_voo,
        horas_total: this.state.horas_total,
        nota: this.state.nota,
        instrutor_id: this.state.instrutor_id,
        aluno_id: this.state.aluno_id
      };
      
      axios.post('https://testeparaaviacao.herokuapp.com/api/Voo',voo)
        .then(res => {
             if (res.data.status === 'success'){
                this.setState({redirect: true});
                this.setState({num_matric: res.data.data.num_matric});
             }
             console.log(voo);
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
   if (this.state.redirect === true){
       return <Cadastro_Sucesso funcao="Voo" chave="Id do Voo" num_matric={this.state.num_matric} nome={this.state.nome}/>
   }
   return (
         <div className="pagina">
            <Naveg/>
            <form onSubmit={this.handleSubmit}>
               <Ficha_Avalia_Voo 
               data_voo={this.state.data_voo}
               hora_voo={this.state.hora_voo}
               horas_total={this.state.horas_total}
               nota={this.state.nota}
               instrutor_id={this.state.instrutor_id}
               aluno_id={this.state.aluno_id}
               onDataVooChange={this.handleDataVooChange}
               onHoraVooChange={this.handleHoraVooChange}
               onHotasTotalChange={this.handleHorasTotalChange}
               onNotaChange={this.handleNotaChange}
               onInstrutorIdChange={this.handleInstrutorIdChange}
               onAlunoIdChange={this.handleAlunoIdChange}/>
               <button id="buttonSuccess" type="submit">Enviar</button> 
            </form>
            <button id="buttonDanger">
                   <Link id="link" to="/instrutor">Voltar</Link>
            </button>
       </div>
  );
}

}
export default paginaAvaliaVoo;