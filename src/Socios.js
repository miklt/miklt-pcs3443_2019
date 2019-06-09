import React from "react"
import axios from 'axios'
import "./Socios.css"
import { url_v3 } from "./App";

class Socios extends React.Component {
    constructor(props) {
        super(props)
        this.montarTabela = this.montarTabela.bind(this)
    }

    montarTabela() {
        const url = url_v3+"socios" // ALTERAR PARA O ENDEREÇO CERTO
        var table = document.getElementById("myTable")
        axios.get(url)
            .then(response => {
                console.log(response)
                response.data.forEach(data => {
                    var row = table.insertRow(-1)
                    var cellId = row.insertCell(0)
                    var cellName = row.insertCell(1)
                    cellId.innerHTML = data.matricula
                    cellName.innerHTML = data.name
                })
            })
        
    }

    render () {
        return (
            <div>
                <table id="myTable" className="tabelaSocios">
                    <tr>
                        <th>Matrícula</th>
                        <th>Nome</th>
                    </tr>
                </table>  
            </div>
        )
    }
}

export default Socios