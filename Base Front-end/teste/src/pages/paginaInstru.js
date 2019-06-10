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
        <Card style={{ width: '18rem' }} className="dashboardIns">
        <Card.Header as="h5">Avaliar</Card.Header>
        <Card.Body>
            <Card.Title>Avalie a performance de um aluno no voo aula.</Card.Title>
            <Button variant="primary" href="/busca">Clique Aqui</Button>
        </Card.Body>
        </Card>
        <Card style={{ width: '18rem' }} className="dashboardIns">
        <Card.Header as="h5">Voos</Card.Header>
        <Card.Body>
            <Card.Title>Realize a consulta de seus voos aula.</Card.Title>
            <Button variant="primary" href="/busca">Clique Aqui</Button>
        </Card.Body>
        </Card>
        <Card style={{ width: '18rem' }} className="dashboardIns">
        <Card.Header as="h5">Dados Cadastrais</Card.Header>
        <Card.Body>
            <Card.Title>Realize a consulta dos seus dados de matricula.</Card.Title>
            <Button variant="primary" href="/busca">Clique Aqui</Button>
        </Card.Body>
        </Card>
      </div>
    );
  }
}

export default paginaInstru;
