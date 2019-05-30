import React from "react"
import Login from "./Login"
import Agendamento from "./Agendamento"
import Cadastro from "./Cadastro"
import Perfil from "./Perfil"
import Socios from "./Socios"

class Condicional extends React.Component {

    constructor(props) {
        super(props)
        this.pagina = window.location.pathname
    }

    render () {
        switch(this.pagina) {
            default:
                return (
                    <div></div>
                )
            case "/Login":
                return (
                    <div>
                        <Login state={this.props.state} handleChange={this.props.handleChange}/>
                    </div>
                )
            case "/Agendamento":
                if (this.props.state.isLoggedIn)    
                    return (
                        <div>
                            <Agendamento state={this.props.state}/>
                        </div>
                    )
                else
                    return(
                        <div></div>
                    )
            case "/Perfil":
                if (this.props.state.isLoggedIn)    
                    return (
                        <div>
                            <p><Perfil state={this.props.state}/></p>
                        </div>
                    )
                else
                    return(
                        <div></div>
                    )
            case "/Cadastro":
                return (
                    <div>
                        <Cadastro />
                    </div>
                )
            case "/Socios":
                return (
                    <div>
                        <Socios />
                    </div>
                )

            case "/Log Out":
                this.props.logout()
                return (
                    <div></div>
                )
            case "/servicos":
                return(
                <div style={{position: "relative", left: "5em", width: "750px", textAlign: "justify"}}>
                    <h1>Serviços:</h1>
                    <ul>
                        <li>Curso básico para aeronaves</li>
                        <li>Curso intermediário para aeronaves</li>
                        <li>Curso avançado para aeronaves</li>
                        <li>Prática com instrutor</li>
                        <li>Prática sem instrutor</li>
                    </ul>
                </div>  
                )
            case "/sobre":
                return(
                    <div style={{position: "relative", left: "5em", width: "750px", textAlign: "justify"}}>
                        <h1>Escola de Aviação ltd.</h1>
                        <p>A Escola de Aviação ltd. é um aeroclube especializado em formar alunos para os diversos desafios encontrados no céu. Se você procura um lugar para aprender ou simmplesmente praticar, sua busca acabou.</p>
                    </div>    
                )
            case "/contato":
                return(
                    <div style={{position: "relative", left: "5em", width: "750px", textAlign: "justify"}}>
                        <h1>Contato</h1>
                        <p>Endereço: Av. Prof. Luciano Gualberto, 158 - Butantã, São Paulo - SP, 05508-010</p>
                        <p>Telefone: (11) 92568-7895</p>
                    </div>
                )
        }    
    }
}

export default Condicional