import React from "react"
import "./App.css"
import axios from "axios"
import {url_v3} from "./App"
import { getToken } from "./Auth"
import "./Perfil.css"

class Perfil extends React.Component {


    getState() {
        
        const matricula = getToken();

        const url = url_v3+"perfil/init";
        axios.post(url,{
            matricula: matricula
        })
            .then(response => {
                console.log(response)
            }).catch(error => {
                console.log("deu ruim")
            });
        console.log(matricula);

    }
    
    constructor(props) {
        super(props);
        this.state = {}
        this.getState = this.getState.bind(this);
        console.log(this.props.state);
        this.getState();
    }

    render () {

        return (
            <div className = "perfil">
                <h1>{this.props.state.role}: {this.props.state.name}</h1>
                
                <p>Banco de horas: Total de horas{this.state.horas}</p>

                <ul className = "agendamentos">
                    <li></li>
                </ul>

            </div>
        )
    }
}

export default Perfil