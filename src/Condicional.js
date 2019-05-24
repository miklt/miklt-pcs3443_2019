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
        if (this.pagina === "/Login") {
            return (
                <div>
                    <Login />
                </div>
            )
        }
        if (this.pagina === "/Agendamento") {
            return (
                <div>
                    <Agendamento />
                </div>
            )
        }
        if (this.pagina === "/Perfil") {
            return (
                <div>
                    <p>{this.pagina}</p>
                </div>
            )
        }
        if (this.pagina === "/Cadastro") {
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