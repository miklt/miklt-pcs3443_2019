import React from "react"
import "./App.css"
import axios from "axios"
import {url_v3} from "./App"

class Perfil extends React.Component {

    constructor(props) {
        super(props);
        this.state = this.props.state
    }

    getState(event) {
        const url = url_v3+'login';
        axios.get(url, { 
            user: this.state.user, 
            password: this.state.password,
         })
        .then(function(response) {
            console.log(response.data)
            this.setState({name : response.data.name, role : response.data.role, horas : response.data.horas})
        })
        .catch(error => {
            alert(error)
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