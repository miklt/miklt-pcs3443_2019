import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import '../css/paginaAvaliaVoo.css';
import Naveg from '../components/Naveg';
import { Table } from 'react-bootstrap';

class Busca_Sucesso_Aluno extends Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <div>
                <br/><br/>
                <h1>Aluno: {this.props.nome}</h1>
                <h2>Situação: </h2><br/><br/>
                <label><b>Total De Horas Voo Aula:</b> {this.props.total_horas_voo}</label><br/>
                <label><b>Concluiu Aulas Teóricas?</b> {this.props.concluiu_teoria}</label><br/>
                <label><b>Concluiu Aulas Práticas?</b> {this.props.concluiu_pratica}</label><br/>
            </div>
        )
      }
}
export default Busca_Sucesso_Aluno;