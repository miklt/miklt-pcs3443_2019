import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';

class Naveg extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/home">Home</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="/aluno">Portal Aluno</Nav.Link>
          <Nav.Link href="/instrutor">Portal Instrutor</Nav.Link>
          <Nav.Link href="/funcionario">Portal Funcionário</Nav.Link>
        </Nav>
      </Navbar>
    );
  }
}

export default Naveg;
