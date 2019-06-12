import React from "react"
import { Redirect } from "react-router-dom";

import "./CadastroAero.css"
import {url_v3} from "./App"
import axios from 'axios';

class CadastroAero extends React.Component {
    
    constructor() {
        super();
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            num : 0,
            modelo: "",
            ano: 0,
            proprietario: "",
            cpf: "",
            redirect : false,
        };
    }

    handleChange(event) {
        this.setState({[event.target.name] : event.target.value})
    }

    handleSubmit(event){ 
        event.preventDefault();
        this.setState({"error": ''})

        const url = url_v3+'registerAero';
        axios.post(url, {
            num : this.state.num,
            modelo : this.state.modelo,
            ano : this.state.ano,
            proprietario : this.state.proprietario,
            cpf : this.state.cpf
        }).then(response => {
            if (response.data.error) {
                this.setState({"error": response.data.error})
            } else {
                alert("Aeronave cadastrada.")
            }
            this.setState({redirect : true})
        })
    };

    render () {
        if (this.state.redirect) 
            return(
                <Redirect to="/" />
            )
        else
            return (
                <div id = "CadastroAero">
                    <form className="telaCadastroAero" onSubmit={this.handleSubmit}>
                        <h1>Cadastrar Aeronave</h1>
                        
                        <label htmlFor="name">Modelo:</label>
                        <input type="text" name="modelo" id="modelo" onChange={this.handleChange} required />
                        <br />

                        <label htmlFor="ano">Ano:</label>
                        <input type="number" name="ano" id="ano" onChange={this.handleChange} required />
                        <br />

                        <label htmlFor="num">Número de Registro:</label>
                        <input type="number" name="num" id="num" onChange={this.handleChange} required />
                        <br />
                        
                        <label htmlFor="proprietario">Proprietário:</label>
                        <input type="text" name="proprietario" id="proprietario" onChange={this.handleChange} required />
                        <br />

                        <label htmlFor="cpf">CPF do Proprietário:</label>
                        <input type="text" name="cpf" id="cpf" onChange={this.handleChange} required />
                        <br />

                        <button type="submit">Go</button>
                        <div className="error-message">{this.state.error}</div>
                    </form>
                </div>
            )
    }
}

export default CadastroAero