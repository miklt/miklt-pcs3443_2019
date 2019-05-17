import React, { Component } from 'react';
import logo from './logo.svg';
import axios from 'axios'
import './App.css';

require('dotenv').config();

class App extends Component {

  post(event) {
    const instrutor = {
      "nome": "jooa",
      "CPF": 139248713,
      "matricula": 12938570,
      "email": "jooaoa@example.com",
      "senha": "senha",
      "horas_de_voo": 0,
      "breve": 2319870,
      "certificado_instrutor": 1329875
    }
    // const url = 'http://localhost:5000'
    const url = process.env.REACT_APP_API_URL

    event.preventDefault();
    console.log(process.env.REACT_APP_API_URL)

    axios.post('/instrutor/', instrutor, {
      baseURL: url
    })
    .then(function (response) {
      console.log(response)
    })
    .catch(function (error){
      console.log(error)
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="#"
            onClick={this.post}
          >
            STOP DOWN!
          </a>
        </header>
      </div>
    );
  }
}

export default App;
