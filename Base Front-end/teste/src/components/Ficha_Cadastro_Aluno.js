import React, { Component } from 'react';
import MaskedInput from 'react-text-mask'
import '../css/Ficha_Cadastro.css';


class Ficha_Cadastro_Aluno extends Component {
    constructor(props){
        super(props);
        this.handleNameChange=this.handleNameChange.bind(this)
        this.handleEmailChange=this.handleEmailChange.bind(this)
        this.handleCpfChange=this.handleCpfChange.bind(this)
        this.handleDataNascimentoChange=this.handleDataNascimentoChange.bind(this)
        this.handleTelefoneChange=this.handleTelefoneChange.bind(this)
        this.handleEnderecoChange = this.handleEnderecoChange.bind(this)
    }

    handleNameChange(e) {
        this.props.onNameChange(e.target.value);
     }
    
    handleEmailChange(e) {
        this.props.onEmailChange(e.target.value);
    }
    
    handleCpfChange(e) {
        this.props.onCpfChange(e.target.value);
    }
    
    handleDataNascimentoChange(e) {
        this.props.onDataNascimentoChange(e.target.value);
    }

    handleEnderecoChange(e) {
        this.props.onEnderecoChange(e.target.value);
    }
    
    handleTelefoneChange(e) {
        this.props.onTelefoneChange(e.target.value);
    }

    render() {
        return (
            <div className='Ficha'>
                <h1>Ficha de Cadastro de Novo Aluno:</h1>
                    <label>Nome</label><br/>
                    <input type="text" name="nome" value={this.props.nome} onChange={this.handleNameChange}></input><br/>
                    <label>E-mail</label><br/>
                    <input type="text" name="email" value={this.props.email} onChange={this.handleEmailChange}></input><br/>
                    <label>CPF</label><br/>
                    <input type="text" name="cpf" value={this.props.cpf} onChange={this.handleCpfChange}></input><br/>
                    <label>Data de nascimento</label><br/>
                    <input type="text" name="dataNascimento" value={this.props.dataNascimento} onChange={this.handleDataNascimentoChange}></input><br/>
                    <label>Endereço</label><br/>
                    <input type="text" name="endereco" value={this.props.endereco} onChange={this.handleEnderecoChange}></input><br/>
                    <label>Telefone</label><br/>
                    <input type="text" name="telefone" value={this.props.telefone} onChange={this.handleTelefoneChange}></input><br/>
                <h2>{}</h2>
            </div>
        );
    }
}

export default Ficha_Cadastro_Aluno;


/*               
                 <MaskedInput
                    type="text"
                    mask={[ /\d/, /\d/, /\d/, '.',  /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/]}
                    name="cpf"
                    onChange={this.handleCpfChange}
                    /><br/>
                <MaskedInput
                    type="text"
                    mask={[ '(', /\d/ , /\d/,')', ' ', /\d/, /\d/,/\d/, /\d/, /\d/, '-',  /\d/, /\d/, /\d/, /\d/]}
                    name="telefone"
                    onChange={this.handleTelefoneChange}
                    /><br/> */ 