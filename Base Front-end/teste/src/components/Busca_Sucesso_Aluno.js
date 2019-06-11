import React, { Component } from 'react';
//import '../css/paginaCadastroSucesso.css';
import { Link, Redirect } from 'react-router-dom';
import { Table } from 'react-bootstrap';
//import logo from '../images/sucesso.png';

class Busca_Sucesso_Aluno extends Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <Table dark>
                <thead>
                    <tr>
                        <th>CPF</th>
                        <th>Número de Matrícula</th>
                        <th>Nome</th>
                        <th>E-mail</th>
                        <th>Data de Nascimento</th>
                        <th>Endereço</th>
                        <th>Telefone de Contato</th>
                        <th>Total de Horas de Voo</th>
                        <th>Concluiu Aula teórica</th>
                        <th>Concluiu Aula prática</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{this.props.cpf}</td>
                        <td>{this.props.num_matric}</td>
                        <td>{this.props.nome}</td>
                        <td>{this.props.email}</td>
                        <td>{this.props.dataNascimento}</td>
                        <td>{this.props.endereco}</td>
                        <td>{this.props.telefone}</td>
                        <td>{this.props.total_horas_voo}</td>
                        <td>{this.props.concluiu_teoria}</td>
                        <td>{this.props.concluiu_pratica}</td>
                    </tr>
                </tbody>
            </Table>
        )
      }
}
export default Busca_Sucesso_Aluno;