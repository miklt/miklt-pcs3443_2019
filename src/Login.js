import React from "react"
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";

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
        }
    }

    handleChange(event) {
        this.setState({[event.target.name] : event.target.value})
    }

    handleSubmit(event){
        event.preventDefault();

        const url = url_v3+'login';
        axios.post(url, {
            matricula: this.state.matricula,
            password: this.state.password
        }).then(response => {
            console.log(response.data)
            this.props.login(
                response.data.name,
                response.data.matricula,
                response.data.role,
                response.data.isLoggedIn
            );
        })

        return true;
    };

    render () {
        if(this.props.state.isLoggedIn === false)    
            return (
                <div>
                    <form className="telaLogin" onSubmit={this.handleSubmit}>
                        <label htmlFor="matricula">Matrícula:</label>
                        <input type="text" name="matricula" id="matricula" onChange={this.handleChange}/>
                        <br />

                        <label htmlFor = "password" onClick={this.handleSubmit}>Senha:</label>
                        <input type="password" name="password" id="password" onChange={this.handleChange}/>
                        <br />

                        <button type="submit">Go</button>
                    </form>
                </div>
            )
        else
            return(
                <Redirect to="/" />
            )
    }
}

export default Login