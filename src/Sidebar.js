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
                    <li><Aba name="Login" nameHtml="/login"/></li>
                }
                {true &&
                    <li><Aba name="Cadastro" nameHtml="/cadastro"/></li>
                }
                {this.props.state.role === "Instrutor" && 
                    <li><Aba name="Agendamentos" nameHtml="/agendamento"/></li>
                }
                {this.props.state.isLoggedIn && 
                    <li><Aba name="Perfil" nameHtml="/perfil"/></li>
                }
                {this.props.state.isLoggedIn && 
                    <li><Aba name="Log Out" nameHtml="/logout" /></li>
                }
                {this.props.state.role === "Instrutor" && 
                    <li><Aba name="Socios" nameHtml="/socios" /></li>
                }
            </ul>
            </div>
        )
    }
}

export default Sidebar