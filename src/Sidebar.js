import React from "react"
import Aba from "./Aba"
import "./Sidebar.css"

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
                    {this.props.state.role === "Funcionario" && 
                        <li><Aba name="Cadastro" nameHtml="/cadastro"/></li>
                    }
                    {this.props.state.role === "Aluno" && 
                        <li><Aba name="Agendamentos" nameHtml="/agendamento"/></li>
                    }
                    {this.props.state.isLoggedIn && 
                        <li><Aba name="Perfil" nameHtml="/perfil"/></li>
                    }
                    {(this.props.state.role === "Instrutor" || this.props.state.role === "Funcionario") && 
                        <li><Aba name="Socios" nameHtml="/socios" /></li>
                    }
                    {this.props.state.isLoggedIn && 
                        <li><Aba name="Log Out" nameHtml="/logout" /></li>
                    }
                </ul>
            </div>
        )
    }
}

export default Sidebar