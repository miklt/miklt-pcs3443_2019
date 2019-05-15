import React, { Component } from 'react';
//import './Ficha_Cadastro.css';


class Ficha_Cadastro extends Component {
    constructor(props){
        super(props);
        this.state = {
            nome: '',
            email: '',
            cpf: '',
            dataNascimento: '',
            telefone: '',
        }
    }

    handleChangeName = event => {
        this.setState({ nome: event.target.value });
    }

    handleChangeEmail = event => {
        this.setState({ email: event.target.value });
    }

    handleChangeCpf = event => {
        this.setState({ cpf: event.target.value });
    }

    handleChangeDataNascimento = event => {
        this.setState({ dataNascimento: event.target.value });
    }

    handleChangeTelefone = event => {
        this.setState({ telefone: event.target.value });
    }

    handleSubmit = event => {
        
        event.preventDefault();
    
        const user = {
            nome: this.state.nome,
            email: this.state.email,
            cpf: this.state.cpf,
            dataNascimento: this.state.dataNascimento,
            telefone: this.state.telefone,
        };

        console.log(user);
    }
 
render() {
return (
    <div className='Ficha'>
        <h1>Ficha de Cadastro de Novo Aluno:</h1>
        <form onSubmit={this.handleSubmit}>
            <label>Nome</label><br/>
            <input type="text" name="nome" onChange={this.handleChangeName}></input><br/>
            <label>E-mail</label><br/>
            <input type="email" name="email" onChange={this.handleChangeEmail}></input><br/>
            <label>CPF</label><br/>
            <input type="text" name="cpf" onChange={this.handleChangeCpf}></input><br/>
            <label>Data de nascimento</label><br/>
            <input type="date" name="dataNascimento" onChange={this.handleChangeDataNascimento}></input><br/>
            <label>Telefone</label><br/>
            <input type="tel" name="telefone" onChange={this.handleChangeTelefone}></input><br/>
            <button type="submit">Enviar</button> 
        </form>
    </div>
 );
 }
}
export default Ficha_Cadastro;