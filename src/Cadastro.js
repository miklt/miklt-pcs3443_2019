import React from "react"
import "./Cadastro.css"
import {url_v3} from "./App"
import axios from 'axios';

class Cadastro extends React.Component {
    constructor() {
        super();
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.changeVisibility = this.changeVisibility.bind(this);
        this.state = {
            name: '',
            dataNascimento: '',
            cpf: '',
            endereco: '',
            email: '',
            role: '',
            password: '',
        }
    }

    changeVisibility() {
        if (this.state.role == "Piloto") {
            document.getElementById("extendido")
        }
    }

    handleChange(event) {
        this.setState({[event.target.name] : event.target.value})
    }

    handleSubmit(event){ 
        const url = url_v3+'login';
        axios.post(url, { user: this.state.user, password: this.state.password })
            .catch(error => {
                alert(error)
            });
    };

    render () {
        
        return (
            <div>
                <form className="telaLogin" onSubmit={this.handleSubmit}>

                    <label htmlFor="name">Nome:</label>
                    <input type="text" name="name" id="name" onChange={this.handleChange}/>

                    <label htmlFor="dataNascimento">Data de Nascimento:</label>
                    <input type="text" name="dataNascimento" id="dataNascimento" onChange={this.handleChange}/>

                    <label htmlFor="cpf">CPF:</label>
                    <input type="text" name="cpf" id="cpf" onChange={this.handleChange}/>

                    <label htmlFor = "password">Senha:</label>
                    <input type="password" name="password" id="password"  onChange={this.handleChange}/>

                    <select name="role" id="role">
                        <option value="" disabled selected>Select your option</option>
                        <option value="Aluno">Aluno</option>
                        <option value="Instrutor">Instrutor</option>
                        <option value="Piloto">Piloto</option>
                    </select>

                    


                    <button type="submit">Go</button>
                </form>
            </div>
        )
    }
}

export default Cadastro