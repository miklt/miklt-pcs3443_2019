import React from "react"
import Aba from "./Aba"
import "./Sidebar.css"
import axios from "axios";

class Sidebar extends React.Component {

    constructor(props) {
        super(props)
    }

    render () {
        return (
            <div>
            <ul className="sidebarAba">
                <li className="sidebarHeader">MENU</li>
                {!this.props.state.isLoggedIn && 
                    <li><Aba name="Login" nameHtml="./Login"/></li>
                }
                {true &&
                    <li><Aba name="Cadastro" nameHtml="./Cadastro"/></li>
                }
                {this.props.state.role == "Instrutor" && 
                    <li><Aba name="Agendamentos" nameHtml="./Agendamento"/></li>
                }
                {this.props.state.isLoggedIn && 
                    <li><Aba name="Perfil" nameHtml="./Perfil"/></li>
                }
                {this.props.state.isLoggedIn && 
                    <li><Aba name="Configurações" nameHtml="./Configuracoes"/></li>
                }
                {this.props.state.isLoggedIn && 
                    <li><Aba name="Log Out" nameHtml="./Logout" /></li>
                }
            </ul>
            </div>
        )
    }
}

export default Sidebar