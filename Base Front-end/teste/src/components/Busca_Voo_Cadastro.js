import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Table } from 'react-bootstrap';

class Busca_Voo_Cadastro extends Component {
    constructor(props){
        super(props);
    }
    render() {
        const dados = this.props.dados_voo_instrutor
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
                {dados.map(voo => (
                    <tbody>
                    <tr>
                        <td>{voo.voo_id}</td>
                        <td>{voo.aluno_id}</td>
                        <td>{voo.instrutor_id}</td>
                        <td>{voo.data_voo}</td>
                        <td>{voo.hora_inicio}</td>
                        <td>{voo.horas_total}</td>
                        <td>{voo.nota}</td>
                    </tr>
                </tbody>   
                ) 
                )}
            </Table>
        )
      }
}
export default Busca_Voo_Cadastro;
