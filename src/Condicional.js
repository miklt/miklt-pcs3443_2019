import React from "react"
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";

import Login from "./Login"
import Agendamento from "./Agendamento"
import Cadastro from "./Cadastro"
import Perfil from "./Perfil"
import Socios from "./Socios"
import Logout from "./Logout"

class Condicional extends React.Component {

    constructor(props) {
        super(props)
        this.pagina = window.location.pathname
    }

    render () {
                  
            
           

        return (
            <div>
                <Route
                    path="/sobre"
                    render={() => (
                        <div style={{position: "relative", left: "5em", width: "750px", textAlign: "justify"}}>
                            <h1>Escola de Aviação ltd.</h1>
                            <p>A Escola de Aviação ltd. é um aeroclube especializado em formar alunos para os diversos desafios encontrados no céu. Se você procura um lugar para aprender ou simmplesmente praticar, sua busca acabou.</p>
                        </div>   
                    )}
                />
                <Route
                    path="/contato"
                    render={() => (
                        <div style={{position: "relative", left: "5em", width: "750px", textAlign: "justify"}}>
                        <h1>Contato</h1>
                        <p>Endereço: Av. Prof. Luciano Gualberto, 158 - Butantã, São Paulo - SP, 05508-010</p>
                        <p>Telefone: (11) 92568-7895</p>
                    </div>  
                    )}
                />
                <Route
                    path="/servicos"
                    render={() => (
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
                    )}
                />


                <Route
                    path="/login"
                    render={(routeProps) => (
                        <Login {...routeProps} state={this.props.state} handleChange={this.props.handleChange} login={this.props.login} logout={this.props.logout} />
                    )}
                />
                <Route
                    path="/agendamento"
                    render={(routeProps) => (
                        <Agendamento {...routeProps} state={this.props.state} />
                    )}
                />
                <Route
                    path="/cadastro"
                    render={(routeProps) => (
                        <Cadastro {...routeProps} />
                    )}
                />
                <Route
                    path="/perfil"
                    render={(routeProps) => (
                        <Perfil {...routeProps} state={this.props.state}/>
                    )}
                />
                <Route
                    path="/socios"
                    render={(routeProps) => (
                        <Socios {...routeProps} />
                    )}
                />
                <Route
                    path="/logout"
                    render={(routeProps) => (
                        <Logout {...routeProps} state={this.props.state} handleChange={this.props.handleChange} login={this.props.login} logout={this.props.logout} />
                    )}
                />
            </div>
            
        ) 
            
    }
}

export default Condicional