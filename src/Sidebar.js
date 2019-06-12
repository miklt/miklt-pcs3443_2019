import React from "react"
import Aba from "./Aba"
import "./Sidebar.css"

class Sidebar extends React.Component {

    render () {
        return (
            <div>
                <ul className="sidebarAba">
                    <li className="sidebarHeader">MENU</li>
                    {!this.props.state.isLoggedIn && 
                        <li><Aba name="Login" nameHtml="/login"/></li>
                    }
                    {this.props.state.role === "Funcionario" && 
                        <div>
                            <li><Aba name="Cadastro" nameHtml="/cadastro"/></li>
                            <li><Aba name="CadastroAero" nameHtml="/cadastroAero" /></li>
                        </div>
                    }
                    {this.props.state.role === "Aluno" && 
                        <li><Aba name="Agendar" nameHtml="/agendar"/></li>
                    }
                    {this.props.state.isLoggedIn && 
                        <li><Aba name="Perfil" nameHtml="/perfil"/></li>
                    }
                    {(this.props.state.role === "Instrutor" || this.props.state.role === "Funcionario") && 
                        <div>    
                            <li><Aba name="Socios" nameHtml="/socios" /></li>
                            <li><Aba name="Agendamentos" nameHtml="/listaAulas" /></li>
                        </div>
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