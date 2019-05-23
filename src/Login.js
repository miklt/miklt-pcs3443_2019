import React from "react"
import "./Login.css"


class Login extends React.Component {
    constructor() {
        super();
        this.onLogin = this.onLogin.bind(this)
    }

    onLogin(event) {
        event.preventDefault()
        const data = new FormData(event.target)

        fetch(url_v3+"/login", {
            method: 'POST',
            body: data,
        })
    }

    render () {
        return (
            <div>
                <form onSubmit={this.onLogin} className="telaLogin">
                    <label for="user">Usuário:</label>
                    <input type="text" name="user" id="user"></input>
                    <label for = "password">Senha:</label>
                    <input type="password" name="password" id="password"></input>
                    <button type="submit">Go</button>
                </form>
            </div>
        )
    }
}

export default Login