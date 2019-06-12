import React from "react"
import axios from 'axios'
import "./Socios.css"
import { url_v3 } from "./App";

class Socios extends React.Component {
    constructor(props) {
        super(props)
        this.montarTabela = this.montarTabela.bind(this)
        this.limpaTabela = this.limpaTabela.bind(this)
        this.limpaTabela()
        this.montarTabela()           
    }

    limpaTabela() {
        var Parent = document.getElementById("myTable");
        if (Parent != null && Parent.hasChildNodes()) {
            while (Parent.hasChildNodes()) {
                Parent.removeChild(Parent.firstChild);
            }
        }
    }

    montarTabela() {
        this.limpaTabela()
        const url = url_v3+"socios" 
        axios.get(url)
            .then(response => {
                console.log(response)
                var table = document.getElementById("myTable")
                response.data.forEach(data => {
                    var row = table.insertRow(-1)

                    var matricula = row.insertCell(-1)
                    var name = row.insertCell(-1)
                    var role = row.insertCell(-1)
                    var email = row.insertCell(-1)
                    var endereco = row.insertCell(-1)
                    var dataNascimento = row.insertCell(-1)
                    var cpf = row.insertCell(-1)
                    var numeroBreve = row.insertCell(-1)
                    
                    
                    matricula.innerHTML = data.matricula
                    name.innerHTML = data.name
                    role.innerHTML = data.role
                    email.innerHTML = data.email
                    endereco.innerHTML = data.endereco
                    dataNascimento.innerHTML = data.dataNascimento
                    cpf.innerHTML = data.cpf
                    numeroBreve.innerHTML = data.numeroBreve
                   
                })
            })
        
    }

    render () {
        return (
            <div>
                <table className="tabelaSocios" style={{position : "relative", left : "50px", top : "16px"}}>
                    <thead>
                        <tr>
                            <th>Matrícula</th>
                            <th>Nome</th>
                            <th>Sócio</th>
                            <th>E-mail</th>
                            <th>Endereço</th>
                            <th>Data de Nascimento</th>
                            <th>CPF</th>
                            <th>Brevê</th>
                        </tr>
                    </thead>
                    <tbody id="myTable">
                        
                    </tbody>
                </table>  
            </div>
        )
    }
}

export default Socios