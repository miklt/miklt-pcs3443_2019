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
                            <li><Aba name="Cadastro de Sócio" nameHtml="/cadastro"/></li>
                            <li><Aba name="Cadastro de Aeronave" nameHtml="/cadastroAero" /></li>
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
                            <li><Aba name="Sócios" nameHtml="/socios" /></li>
                            <li><Aba name="Aeronaves" nameHtml="/aeronaves" /></li>
                            <li><Aba name="Agendamentos" nameHtml="/listaAulas" /></li>
                            <li><Aba name="Consulta Aula" nameHtml="/consultaAula" /></li>
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