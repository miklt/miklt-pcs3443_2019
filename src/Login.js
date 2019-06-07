import React from "react"

import "./Login.css"
import {url_v3} from "./App"
import axios from 'axios'

class Login extends React.Component {
        
    constructor(props) {
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.state = {
            password: "",
            error: ""
        }
    }

    handleChange(event) {
        this.setState({[event.target.name] : event.target.value})
    }

    handleSubmit(event){
        event.preventDefault();
        this.setState({"error": ''})

        const url = url_v3+'login';
        axios.post(url, {
            matricula: this.state.matricula,
            password: this.state.password
        }).then(response => {
            if (response.data.error) {
                this.setState({"error": response.data.error});
                this.props.logout();
            } else {
                this.props.login(
                    response.data.name,
                    response.data.matricula,
                    response.data.role,
                    response.data.isLoggedIn
                );
            }
        })

        return false;
    };

    render () {
        return (
            <div>
                <form className = "telaLogin" onSubmit={this.handleSubmit}>
                    <label htmlFor = "matricula">Matrícula:</label>
                    <input type="text" name="matricula" id="matricula" onChange={this.handleChange} required/>
                    <br />

                    <label htmlFor = "password">Senha:</label>
                    <input type="password" name="password" id="password" onChange={this.handleChange} required/>
                    <br />

                    <button type="submit">Go</button>
                    <div className="error-message">{this.state.error}</div>
                </form>
            </div>
        )
    }
}

export default Login