import React, { Component } from 'react';
import '../css/paginaDefault.css';
import { Link } from 'react-router-dom';
import Naveg from '../components/Naveg';
import { Card, Button } from 'react-bootstrap';

class paginaFunc extends Component {

  render() {
    return (
      <div>
        <Naveg/>
        <br/>
        <h1 className="pagina">Portal Funcionário </h1>
        <br/>
        <br/>
        <Card style={{ width: '18rem' }} className="dashboardFunc">
        <Card.Header as="h5">Cadastro Aluno</Card.Header>
        <Card.Body>
            <Card.Title>Realize o cadastro de um novo aluno aqui.</Card.Title>
            <Button variant="primary" href="/funcionario/cadastroAluno">Clique Aqui</Button>
        </Card.Body>
        </Card>
        <Card style={{ width: '18rem' }} className="dashboardFunc">
        <Card.Header as="h5">Cadastro Instrutor</Card.Header>
        <Card.Body>
            <Card.Title>Realize o cadastro de um novo instrutor aqui.</Card.Title>
            <Button variant="primary" href="/funcionario/cadastroInstrutor">Clique Aqui</Button>
        </Card.Body>
        </Card>
        <Card style={{ width: '18rem' }} className="dashboardFunc">
        <Card.Header as="h5">Consulta Aluno</Card.Header>
        <Card.Body>
            <Card.Title>Realize a consulta dos dados de um aluno.</Card.Title>
            <Button variant="primary" href="/funcionario/buscaAluno">Clique Aqui</Button>
        </Card.Body>
        </Card>
        <Card style={{ width: '18rem' }} className="dashboardFunc">
        <Card.Header as="h5">Consulta Instrutor</Card.Header>
        <Card.Body>
            <Card.Title>Realize a consulta dos dados de um instrutor.</Card.Title>
            <Button variant="primary" href="/funcionario/buscaInstrutor">Clique Aqui</Button>
        </Card.Body>
        </Card>
        <Card style={{ width: '18rem' }} className="dashboardFunc">
        <Card.Header as="h5">Alterar Dados Aluno</Card.Header>
        <Card.Body>
            <Card.Title>Altere os dados cadastrais de um aluno.</Card.Title>
            <Button variant="primary" href="/cadastroAluno">Clique Aqui</Button>
        </Card.Body>
        </Card>
        <Card style={{ width: '18rem' }} className="dashboardFunc">
        <Card.Header as="h5">Alterar Dados Instrutor</Card.Header>
        <Card.Body>
            <Card.Title>Altere os dados cadastrais de um instrutor.</Card.Title>
            <Button variant="primary" href="/cadastroAluno">Clique Aqui</Button>
        </Card.Body>
        </Card>
        <Card style={{ width: '18rem' }} className="dashboardFunc">
        <Card.Header as="h5">Excluir Aluno</Card.Header>
        <Card.Body>
            <Card.Title>Exclua os registros de cadastro de um aluno.</Card.Title>
            <Button variant="primary" href="/cadastroAluno">Clique Aqui</Button>
        </Card.Body>
        </Card>
        <Card style={{ width: '18rem' }} className="dashboardFunc">
        <Card.Header as="h5">Excluir Instrutor</Card.Header>
        <Card.Body>
            <Card.Title>Exclua os registros de cadastro de um instrutor.</Card.Title>
            <Button variant="primary" href="/cadastroAluno">Clique Aqui</Button>
        </Card.Body>
        </Card>
        <Card style={{ width: '18rem' }} className="dashboardFunc">
        <Card.Header as="h5">Habilita Aluno</Card.Header>
        <Card.Body>
            <Card.Title>Habilita um aluno a realizar voos aula.</Card.Title>
            <Button variant="primary" href="/cadastroAluno">Clique Aqui</Button>
        </Card.Body>
        </Card>
      </div>
    );
  }
}

export default paginaFunc;
