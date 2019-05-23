import React from "react"
import Login from "./Login"
import Agendamento from "./Agendamento"


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
        if (this.pagina === "/Nome4.html") {
            return (
                <div>
                   <p>{this.pagina}</p>
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