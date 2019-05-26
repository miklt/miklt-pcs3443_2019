import React from "react"
import Login from "./Login"
import Agendamento from "./Agendamento"
import Cadastro from "./Cadastro"
import Perfil from "./Perfil"

class Condicional extends React.Component {

    constructor(props) {
        super(props)
        this.pagina = window.location.pathname
    }

    render () {
        if (this.pagina === "/Login") {
            return (
                <div>
                    <Login state={this.props.state} handleChange={this.props.handleChange}/>
                </div>
            )
        }
        if (this.pagina === "/Agendamento") {
            return (
                <div>
                    <Agendamento state={this.props.state}/>
                </div>
            )
        }
        if (this.pagina === "/Perfil") {
            return (
                <div>
                    <p><Perfil state={this.props.state}/></p>
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