import React, { Component } from 'react';
import {Navbar, Nav, NavDropdown, Form, FormControl, Button} from 'react-bootstrap';

class MyNavbar extends Component {
  render() {
    return (
      <Navbar bg="dark" expand="md" variant="dark" sticky="top">
        <Navbar.Brand href="/">Stop Down</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
          <NavDropdown title="Cadastro" id="basic-nav-dropdown">
            <NavDropdown.Item href="/cadastro/instrutor">Instrutor</NavDropdown.Item>
            <NavDropdown.Item href="/cadastro/piloto">Piloto</NavDropdown.Item>
            <NavDropdown.Item href="/cadastro/aluno">Aluno</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="/cadastro/voo">Voo</NavDropdown.Item>
            <NavDropdown.Item href="/cadastro/voo_supervisionado">Voo Supervisionado</NavDropdown.Item>
          </NavDropdown>
          </Nav>
          <Form inline>
          <FormControl type="text" placeholder="Buscar" className="mr-sm-2" />
          <Button variant="outline-success">Buscar</Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

export default MyNavbar;