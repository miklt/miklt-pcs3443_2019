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
            breve: '',
            isHidden: true,
        }
    }

    changeVisibility() {
        if (this.state.role === "Piloto" || this.state.role === "Instrutor") {
            this.setState({isHidden: false})
        } else {
            this.setState({isHidden: true})
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
                <form className="telaCadastro" onSubmit={this.handleSubmit}>

                    <label htmlFor="name">Nome:</label>
                    <input type="text" name="name" id="name" onChange={this.handleChange}/>

                    <label htmlFor="dataNascimento">Data de Nascimento:</label>
                    <input type="text" name="dataNascimento" id="dataNascimento" onChange={this.handleChange}/>

                    <label htmlFor="cpf">CPF:</label>
                    <input type="text" name="cpf" id="cpf" onChange={this.handleChange}/>

                    <label htmlFor = "password">Senha:</label>
                    <input type="password" name="password" id="password"  onChange={this.handleChange}/>

                    <label htmlFor = "role">Tipo de Sócio:</label>
                    <select name="role" id="role" onChange={this.handleChange} onClick={this.changeVisibility}>
                        <option value="" disabled selected>Selecione</option>
                        <option value="Aluno">Aluno</option>
                        <option value="Instrutor">Instrutor</option>
                        <option value="Piloto">Piloto</option>
                    </select>

                    {!this.state.isHidden && 
                    <div>
                        <label htmlFor = "breve">Brevê:</label>
                        <input type="breve" name="breve" id="breve"  onChange={this.handleChange}/>
                    </div>}
                    


                    <button type="submit">Go</button>
                </form>
            </div>
        )
    }
}

export default Cadastro