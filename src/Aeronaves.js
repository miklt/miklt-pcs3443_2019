import React from "react"
import axios from 'axios'
import "./Aeronaves.css"
import { url_v3 } from "./App";

class Aeronaves extends React.Component {
    constructor(props) {
        super(props)
        this.montarTabela = this.montarTabela.bind(this)
        this.limpaTabela = this.limpaTabela.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
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
        const url = url_v3+"listaAero" 
        axios.get(url)
            .then(response => {
                console.log(response)
                var table = document.getElementById("myTable")
                response.data.forEach(data => {
                    var row = table.insertRow(-1)

                    var modelo = row.insertCell(-1)
                    var ano = row.insertCell(-1)
                    var num = row.insertCell(-1)
                    
                    var del = row.insertCell(-1)
                    
                    num.innerHTML = data.num
                    modelo.innerHTML = data.modelo
                    ano.innerHTML = data.ano
                   

                    var button = document.createElement("button");
                    button.innerHTML = "Deletar";
                    button.value = data.num;
                    button.onclick = this.handleDelete
                    del.appendChild(button);

                })
            })
        
    }

    handleDelete(e) {
        const url = url_v3 + "listaAero/" +  e.target.value
        axios.delete(url).then( () => {
            this.limpaTabela()
            this.montarTabela() 
        })  
    }


    render () {
        return (
            <div>
                <table className="tabelaAeronaves" style={{position : "relative", left : "50px", top : "16px"}}>
                    <thead>
                        <tr>
                            <th>Modelo</th>
                            <th>Ano</th>
                            <th>Número de Série</th>
                        </tr>
                    </thead>
                    <tbody id="myTable">
                        
                    </tbody>
                </table>  
            </div>
        )
    }
}

export default Aeronaves