import React from "react"
import Aba from "./Aba"
import "./Sidebar.css"
import axios from "axios";

class Sidebar extends React.Component {

    constructor(props) {
        super(props)
        console.log(this.props.state)
    }

    render () {
        if (this.props.state.isLoggedIn) {
            if (this.props.state.role === "Aluno") { 
                return (
                    <div>
                        <ul className="sidebarAba">
                            <li className="sidebarHeader">MENU</li>
                            <li><Aba name="Agendamentos" nameHtml="./Agendamento"/></li>
                            <li><Aba name="Perfil" nameHtml="./Perfil"/></li>
                            <li><Aba name="Configurações" nameHtml="./Configuracoes"/></li>
                            <li><Aba name="Log Out" nameHtml="./Logout"/></li>
                        </ul>
                    </div>
                )
            } else if (this.props.state.role === "Piloto") {
                return (
                    <div>
                        <ul className="sidebarAba">
                            <li className="sidebarHeader">MENU</li>
                            <li><Aba name="Agendamentos" nameHtml="./Agendamento"/></li>
                            <li><Aba name="Perfil" nameHtml="./Perfil"/></li>
                            <li><Aba name="Configurações" nameHtml="./Configuracoes"/></li>
                            <li><Aba name="Log Out" nameHtml="./Logout"/></li>
                        </ul>
                    </div>
                )
            } else if (this.props.state.role === "Instrutor") {
                return (
                    <div>
                        <ul className="sidebarAba">
                            <li className="sidebarHeader">MENU</li>
                            <li><Aba name="Agendamentos" nameHtml="./Agendamento"/></li>
                            <li><Aba name="Sócios" nameHtml="./Socios"/></li>
                            <li><Aba name="Perfil" nameHtml="./Perfil"/></li>
                            <li><Aba name="Configurações" nameHtml="./Configuracoes"/></li>
                            <li><Aba name="Log Out" nameHtml="./Logout"/></li>
                        </ul>
                    </div>
                )
            }
        } else {
            return (
                <div>
                    <ul className="sidebarAba">
                        <li className="sidebarHeader">MENU</li>
                        <li><Aba name="Login" nameHtml="./Login"/></li>
                        <li><Aba name="Cadastro" nameHtml="./Cadastro"/></li>
                    </ul>
                </div>
            )
        }
            
    }
}

export default Sidebar