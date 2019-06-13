import React from "react"
import "./App.css"
import axios from "axios"
import {url_v3} from "./App"
import { getToken } from "./Auth"
import "./Perfil.css"

class Perfil extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}
        this.getState = this.getState.bind(this);
        this.getState();
    }

    getState() {
        
        const matricula = getToken();

        const url = url_v3+"user/"+matricula;
        axios.get(url)
            .then(response => {
                var lista = document.getElementById('lista')
                var matricula = document.createElement('li')
                var email = document.createElement('li')
                var endereco = document.createElement('li')
                var dataNascimento = document.createElement('li')
                var cpf = document.createElement('li')
                var numeroBreve = document.createElement('li')

                matricula.innerHTML = "Matricula: "+response.data.matricula
                email.innerHTML = "E-mail: "+response.data.email
                endereco.innerHTML = "Endereço: "+response.data.endereco
                dataNascimento.innerHTML = "Data de Nascimento: "+response.data.dataNascimento
                cpf.innerHTML = "CPF: "+response.data.cpf
                numeroBreve.innerHTML = "Brevê: "+response.data.numeroBreve
                
                lista.appendChild(matricula)
                lista.appendChild(email)
                if (response.data.role !== "Funcionario") {
                    lista.appendChild(endereco)
                    lista.appendChild(dataNascimento)
                    lista.appendChild(cpf)
                    if (response.data.role === "Piloto" || response.data.role === "Instrutor")
                        lista.appendChild(numeroBreve)
                }
            }).catch(error => {
            });
        console.log(typeof(matricula));

    }
    
    

    render () {

        return (
            <div className = "perfil">
                <h1>{this.props.state.role}: {this.props.state.name}</h1>
                
                

                <ul className = "lista" id="lista">

                </ul>

            </div>
        )
    }
}

export default Perfil