import React, { Component } from 'react';
import logo from '../images/airplane.png';
import '../css/paginaInicial.css';
import { Link } from 'react-router-dom';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

class paginaInicial extends Component {
  constructor(props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true
    };
  }

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  render() {
    return (
      <div>
        <Navbar color="blue" light>
          <NavbarBrand href="/" className="mr-auto">Menu</NavbarBrand>
          <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
          <Collapse isOpen={!this.state.collapsed} navbar>
            <Nav navbar>
              <NavItem>
                <NavLink href="/cadastro">Cadastre-se</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/busca">Busca</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Bem-vindo ao Bandeco's Aeroclube!</h1>
        </header>
      </div>
    );
  }
}

export default paginaInicial;
