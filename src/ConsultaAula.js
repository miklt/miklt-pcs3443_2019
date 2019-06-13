import React from "react"
import axios from 'axios'
import "./ConsultaAula.css"
import { url_v3 } from "./App";

class ConsultaAula extends React.Component {
    constructor(props) {
        super(props)
        this.montarTabela = this.montarTabela.bind(this)
        this.limpaTabela = this.limpaTabela.bind(this)
        this.handleSubmit=this.handleSubmit.bind(this)
        
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
        const url = url_v3+"consultaAula" 
        axios.get(url)
            .then(response => {
                console.log(response.data)
                var table = document.getElementById("myTable")
                response.data.forEach(data => {
                    
                    

                    var row = table.insertRow(-1)

                    var matricula = row.insertCell(-1)
                    var aluno = row.insertCell(-1)
                    var instrutor = row.insertCell(-1)
                    var parecer = row.insertCell(-1)
                    var dataAula = row.insertCell(-1)
                    var numAula = row.insertCell(-1)
                    
                 
                    var del = row.insertCell(-1)
                    
                    
                    matricula.innerHTML = data.matricula
                    aluno.innerHTML = data.aluno
                    instrutor.innerHTML = data.instrutor
                    parecer.innerHTML = data.parecer
                    dataAula.innerHTML = data.dataAula
                    numAula.innerHTML = data.numAula
                    
                    var button = document.createElement("button");
                    button.innerHTML = "1";
                    button.value = data.numAula+'/'+'1';
                    button.onclick = this.handleSubmit;
                    del.appendChild(button);
                    console.log(button.value)
                    var button = document.createElement("button");
                    button.innerHTML = "2";
                    button.value = data.numAula+'/'+'2';
                    button.onclick = this.handleSubmit;
                    del.appendChild(button);
                    console.log(button.value)
                    var button = document.createElement("button");
                    button.innerHTML = "3";
                    button.value = data.numAula+'/'+'3';
                    button.onclick = this.handleSubmit;
                    del.appendChild(button);
                    console.log(button.value)
                    var button = document.createElement("button");
                    button.innerHTML = "4";
                    button.value = data.numAula+'/'+'4';
                    button.onclick = this.handleSubmit;
                    del.appendChild(button);
                    console.log(button.value)
                    var button = document.createElement("button");
                    button.innerHTML = "5";
                    button.value = data.numAula+'/'+'5';
                    button.onclick = this.handleSubmit;
                    del.appendChild(button);
                    console.log(button.value)
                })
            })
        
    }

    handleSubmit(e) {
    
        const url = url_v3 + "consultaAula/" + e.target.value
        
        axios.put(url)
        .then((response)=>{
            console.log(response.data)
               
            
        })
        };
    
    render () {
        return (
            <div>
                <table className="tabelaAula" style={{position : "relative", left : "50px", top : "16px"}}>
                    <thead>
                        <tr>
                            <th>Matrícula</th>
                            <th>Aluno</th>
                            <th>Instrutor</th>
                            <th>Parecer</th>
                            <th>Data da Aula</th>
                            <th>Duração</th>
                            <th>Alterar Parecer</th>
                            
                        </tr>
                    </thead>
                    <tbody id="myTable">
                        
                    </tbody>
                </table>  
            </div>
        )
    }

}
export default ConsultaAula