import React from "react"
import "./Login.css"
import {url_v3} from "./App"
import axios from 'axios';

class Login extends React.Component {
    constructor() {
        super();
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            user: '',
            password: '',
        }
    }

    handleChange(event) {
        this.setState({[event.target.name] : event.target.value})
    }

    handleSubmit(event){ 
        const url = url_v3+'login';
        axios.post(url, { user: this.state.user, password: this.state.password })
            .catch(error => {
                alert(error)
            });
    };

    render () {
        
        return (
            <div>
                <form className="telaLogin" onSubmit={this.handleSubmit}>
                    <label htmlFor="user">Usuário:</label>
                    <input type="text" name="user" id="user" onChange={this.handleChange}/>
                    <label htmlFor = "password">Senha:</label>
                    <input type="password" name="password" id="password"  onChange={this.handleChange}/>
                    <button type="submit">Go</button>
                </form>
            </div>
        )
    }
}

export default Login