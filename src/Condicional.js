import React from "react"
import { Route, Redirect } from "react-router-dom";

import Login from "./Login"
import Agendamento from "./Agendamento"
import Cadastro from "./Cadastro"
import Perfil from "./Perfil"
import Socios from "./Socios"
import Logout from "./Logout"
import ListaAulas from "./ListaAulas"
import CadastroAero from "./CadastroAero"
import Aeronaves from "./Aeronaves"

class Condicional extends React.Component {

    constructor(props) {
        super(props)
        this.pagina = window.location.pathname
    }

    render () {
        if (!this.props.state.isReady)
            return ("")

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
                        !this.props.state.isLoggedIn ?
                        <Login {...routeProps} state={this.props.state} handleChange={this.props.handleChange} login={this.props.login} logout={this.props.logout} /> :
                        <Redirect to='/' />
                    )}
                />

                <Route
                    path="/cadastro"
                    render={(routeProps) => (
                        this.props.state.role === "Funcionario" ?
                        <Cadastro {...routeProps} state={this.props.state}/> :
                        <Redirect to='/' />
                    )}
                />

                <Route
                    path="/cadastroAero"
                    render={(routeProps) => (
                        this.props.state.role === "Funcionario" ?
                        <CadastroAero {...routeProps} state={this.props.state}/> :
                        <Redirect to='/' />
                    )}
                />

                <Route
                    path="/agendar"
                    render={(routeProps) => (
                        this.props.state.role === "Aluno" ?
                        <Agendamento {...routeProps} state={this.props.state} /> :
                        <Redirect to='/' />
                    )}
                />

                <Route
                    path="/perfil"
                    render={(routeProps) => (
                        this.props.state.isLoggedIn ?
                        <Perfil {...routeProps} state={this.props.state}/> :
                        <Redirect to='/login' />
                    )}
                />

                <Route
                    path="/socios"
                    render={(routeProps) => (
                        (this.props.state.role === "Aluno" || this.props.state.role === "Funcionario") ?
                        <Socios {...routeProps} /> : 
                        <Redirect to='/' />
                    )}
                />

                <Route
                    path="/aeronaves"
                    render={(routeProps) => (
                        (this.props.state.role === "Aluno" || this.props.state.role === "Funcionario") ?
                        <Aeronaves {...routeProps} /> :
                        <Redirect to='/' />
                    )}
                />

                <Route
                    path="/listaAulas"
                    render={(routeProps) => (
                        (this.props.state.role === "Aluno" || this.props.state.role === "Funcionario") ?
                        <ListaAulas {...routeProps} state={this.props.state}/> :
                        <Redirect to='/' />
                    )}
                />

                <Route
                    path="/logout"
                    render={(routeProps) => (
                        this.props.state.isLoggedIn ?
                        <Logout {...routeProps} state={this.props.state} handleChange={this.props.handleChange} login={this.props.login} logout={this.props.logout} /> :
                        <Redirect to='/login' />
                    )}
                />

            </div>
            
        ) 
            
    }
}

export default Condicional