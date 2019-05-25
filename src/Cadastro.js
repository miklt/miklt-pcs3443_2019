import React from "react"
import "./Cadastro.css"
import {url_v3} from "./App"
import axios from 'axios';

class Cadastro extends React.Component {
    
    constructor() {
        super();
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            name: 'teste',
            dataNascimento: 'teste',
            cpf: 'teste',
            endereco: 'teste',
            email: 'teste',
            role: 'teste',
            password: 'teste',
            breve: 'teste',
            instituicao: 'teste',
        }
    }

    handleChange(event) {
        this.setState({[event.target.name] : event.target.value})        
    }

    handleSubmit(event){ 
        const url = url_v3+'login';
        console.log(this.state)
        axios.post(url, { 
            name: this.state.name,
            dataNascimento: this.state.dataNascimento,
            cpf: this.state.cpf,
            endereco: this.state.endereco,
            email: this.state.email,
            role: this.state.role,
            password: this.state.password,
            breve: this.state.breve,
            instituicao: this.state.instituicao, 
        })
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
                    <select defaultValue="" name="role" id="role" onChange={this.handleChange} onClick={this.changeVisibility}>
                        <option value="" disabled>Selecione</option>
                        <option value="Aluno">Aluno</option>
                        <option value="Piloto">Piloto</option>
                        <option value="Instrutor">Instrutor</option>
                    </select>

                    {(this.state.role === "Piloto" || this.state.role === "Instrutor") && 
                    <div>
                        <label htmlFor = "breve">Brevê:</label>
                        <input type="breve" name="breve" id="breve"  onChange={this.handleChange}/>
                        {(this.state.role === "Instrutor") &&
                        <div>
                            <label htmlFor="instituicao">Instituição de ensino:</label>
                            <input type="instituicao" name="instituicao" id="instituicao"  onChange={this.handleChange}/>        
                        </div>}
                    </div>}
                    


                    <button type="submit">Go</button>
                </form>
            </div>
        )
    }
}

export default Cadastro