import React from "react"
import axios from 'axios'
import { url_v3 } from "./App";

class Socios extends React.Component {
    constructor(props) {
        super(props)
        this.montarTabela = this.montarTabela.bind(this)
    }

    montarTabela() {
        const url = url_v3
        var table = document.getElementById("myTable")
        axios.get(url)
            .then(response => {
                console.log(response)
                /*var row = table.insertRow(0)
                var cellId = row.insertCell(0)
                var cellName = row.insertCell(1)
                cellId.innerHTML = response.data.matricula
                cellName.innerHTML = response.data.name*/
            })
        
    }

    render () {
        return (
            <div>
                <table id="myTable"></table>  
            </div>
        )
    }
}

export default Socios