import React, { Component } from 'react';
//import '../css/paginaCadastroSucesso.css';
import { Link, Redirect } from 'react-router-dom';
import { Table } from 'react-bootstrap';
//import logo from '../images/sucesso.png';

class Busca_Voo_Id extends Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <Table dark>
                <thead>
                    <tr>
                        <th>ID Voo</th>
                        <th>Número Matrícula Aluno</th>
                        <th>Número Cadastro Instrutor</th>
                        <th>Data</th>
                        <th>Hora</th>
                        <th>Duração</th>
                        <th>Nota</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{this.props.voo_id}</td>
                        <td>{this.props.aluno_id}</td>
                        <td>{this.props.instrutor_id}</td>
                        <td>{this.props.data_voo}</td>
                        <td>{this.props.hora_inicio}</td>
                        <td>{this.props.horas_total}</td>
                        <td>{this.props.nota}</td>
                    </tr>
                </tbody>
            </Table>
        )
      }
}
export default Busca_Voo_Id;