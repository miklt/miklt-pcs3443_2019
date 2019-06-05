import React from "react"
import "./App.css"
import axios from "axios"
import {url_v3} from "./App"

class Perfil extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            role: "",
            horas: "",
        }
    }

    getState(event) {
        const url = url_v3+'perfil'+this.props.state.user;
        axios.get(url)
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error)
            });
    }
    render () {

        return (
            <div>
                <h1>{this.state.role}: {this.state.name}</h1>
                <h2>Banco de horas: {this.state.horas}</h2>
            </div>
        )
    }
}

export default Perfil