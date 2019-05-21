import React, { Component } from 'react';
import {Navbar, Nav, NavDropdown, Form, FormControl, Button} from 'react-bootstrap';

class MyNavbar extends Component {
  render() {
    return (
      <Navbar bg="dark" expand="md" variant="dark" sticky="top">
        <Navbar.Brand href="#home">Stop Down</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="#link">Link</Nav.Link>
          <NavDropdown title="Cadastro" id="basic-nav-dropdown">
            <NavDropdown.Item href="/cadastro/instrutor">Instrutor</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">Piloto</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">Aluno</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Voo Supervisionado</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
          </NavDropdown>
          </Nav>
          <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

export default MyNavbar;