import React from "react"
import "./Login.css"

class Login extends React.Component {
    render () {
        return (
            <div>
                <form action="" className="telaLogin">
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