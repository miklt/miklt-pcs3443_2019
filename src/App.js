import React from 'react';
import logo from './airplane.png';
import './App.css';
import { Col, Row, Button, Form, FormGroup, Label, Input, FormText, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class ModalExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      email: ''
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
    console.log(this.state.email);
  }

  toggleEmail(e){
    this.setState({
      email: e.target.value
    })
  }



  render() {
    return (
      <div>
        <Button color="success" onClick={this.toggle}>{this.props.buttonLabel}</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Formulário de Cadastro</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label >Nome</Label>
                <Input type="text" name="nome"/>
              </FormGroup>
              <FormGroup>
                <Label >CPF</Label>
                <Input type="text" name="cpf" />
              </FormGroup>
              <FormGroup>
                <Label >Email</Label>
                <Input type="email" name="email" onChange={ (e) => {
                            this.toggleEmail(e)
                          } } />
              </FormGroup>
              <Row form>
                <Col md={6}>
                  <FormGroup>
                    <Label for="Data">Data de Nascimento</Label>
                    <Input type="date" name="Nascimento" id="Data"/>
                  </FormGroup>
                </Col>
                <Col md={4}>
                  <FormGroup>
                    <Label for="telefone">Telefone</Label>
                    <Input type="text" name="telefoneUser" id="telefone"/>
                  </FormGroup>
                </Col>
              </Row>
              </Form>  
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggle}>Confirmar</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancelar</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Bem-Vindo ao Bandeco's Aeroclube
        </p>
        <Link to = "/App2">
          Portal do Aluno
        </Link> 
        <Link to = "/App2">
          Portal do Instrutor
        </Link>
      </header>
    </div>
  );
}

function App2() {
  return (
    <div id="teste">
      <div id = "teste3">
        <h1 >Bem-Vindo, deseja realizar seu cadastro?</h1>
      </div>
      <div id="teste2">
      <ModalExample buttonLabel="Cadastrar"></ModalExample>
      </div>
      <div id="teste4">
      <Button color="danger">  
        <Link id="link" to="/">
          Voltar
        </Link>
      </Button>
      </div>
      </div>
  );
}

function AppRouter() {
  return (
    <Router>
      <div>
        <Route path="/" exact component={App} />
        <Route path="/App2/" component={App2} />
      </div>
    </Router>
  );
}

export default AppRouter;

