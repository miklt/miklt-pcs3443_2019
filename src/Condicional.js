import React from "react"
import Login from "./Login"
import Agendamento from "./Agendamento"
import Cadastro from "./Cadastro"


class Condicional extends React.Component {

    constructor() {
        super()
        this.pagina = window.location.pathname
    }

    render () {
        if (this.pagina === "/Login.html") {
            return (
                <div>
                    <Login />
                </div>
            )
        }
        if (this.pagina === "/Agendamento.html") {
            return (
                <div>
                    <Agendamento />
                </div>
            )
        }
        if (this.pagina === "/Nome3.html") {
            return (
                <div>
                    <p>{this.pagina}</p>
                </div>
            )
        }
        if (this.pagina === "/Cadastro.html") {
            return (
                <div>
                   <Cadastro />
                </div>
            )
        }
        return (
            <div>
                <p>{this.pagina}</p>
            </div>
        )
        
    }
}

export default Condicional