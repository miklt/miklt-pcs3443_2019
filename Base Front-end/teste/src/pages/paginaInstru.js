import React, { Component } from 'react';
import '../css/paginaDefault.css';
import { Link } from 'react-router-dom';
import Naveg from '../components/Naveg';
import { Card, Button } from 'react-bootstrap';

class paginaInstru extends Component {

  render() {
    return (
      <div>
        <Naveg/>
        <br/>
        <h1 className="pagina">Portal Instrutor </h1>
        <br/>
        <br/>
        <Card style={{ width: '18rem' }} className="dashboardIns">
        <Card.Header as="h5">Avaliar Voo</Card.Header>
        <Card.Body>
            <Card.Title>Avalie a performance de um aluno no voo aula.</Card.Title>
            <Button variant="primary" href="/instrutor/avaliaVoo">Clique Aqui</Button>
        </Card.Body>
        </Card>
        <Card style={{ width: '18rem' }} className="dashboardIns">
        <Card.Header as="h5">Consulta Voo</Card.Header>
        <Card.Body>
            <Card.Title>Realize a consulta de seus voos aula.</Card.Title>
            <Button variant="primary" href="/instrutor/buscaVoo">Clique Aqui</Button>
        </Card.Body>
        </Card>
        <Card style={{ width: '18rem' }} className="dashboardIns">
        <Card.Header as="h5">Exluir Voo</Card.Header>
        <Card.Body>
            <Card.Title>Exclua um voo aula regitrado.</Card.Title>
            <Button variant="primary" href="/instrutor/excluiVoo">Clique Aqui</Button>
        </Card.Body>
        </Card>
        <Card style={{ width: '18rem' }} className="dashboardInsH">
        <Card.Header as="h5">Dados Cadastrais</Card.Header>
        <Card.Body>
            <Card.Title>Realize a consulta dos seus dados de cadastro.</Card.Title>
            <Button variant="primary" href="/instrutor/buscaDados ">Clique Aqui</Button>
        </Card.Body>
        </Card>
      </div>
    );
  }
}

export default paginaInstru;
