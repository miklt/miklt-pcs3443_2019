import React from "react"
import "./Login.css"
import {url_v3} from "./App"

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
        event.preventDefault();
        fetch(url_v3 + 'login', {
            method: 'post',
            body: {
                user: this.state.user,
                password: this.state.password,
            }
        });
    };

    render () {
        
        console.log(this.state)
        return (
            <div>
                <form className="telaLogin" onSubmit={this.handleSubmit}>
                    <label for="user">Usuário:</label>
                    <input type="text" name="user" id="user" onChange={this.handleChange}/>
                    <label for = "password">Senha:</label>
                    <input type="password" name="password" id="password"  onChange={this.handleChange}/>
                    <button type="submit">Go</button>
                </form>
            </div>
        )
    }
}

export default Login