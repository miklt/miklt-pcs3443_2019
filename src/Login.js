import React from "react"
import "./Login.css"
import {url_v3} from "./App"
import axios from 'axios';

class Login extends React.Component {
        
    constructor(props) {
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(event){ 
        const url = url_v3+'login';
        axios.post(url, { user: this.props.state.user, password: this.props.state.password })
            .catch(error => {
                alert(error)
            });
    };

    render () {
        
        return (
            <div>
                <form className="telaLogin" onSubmit={this.handleSubmit}>
                    <label htmlFor="user">Usuário:</label>
                    <input type="text" name="user" id="user" onChange={this.props.handleChange}/>
                    <label htmlFor = "password" onClick={this.handleSubmit}>Senha:</label>
                    <input type="password" name="password" id="password" onChange={this.props.handleChange}/>
                    <button type="submit">Go</button>
                </form>
            </div>
        )
    }
}

export default Login