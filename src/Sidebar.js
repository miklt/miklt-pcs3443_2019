import React from "react"
import Aba from "./Aba"
import "./Sidebar.css"

class Sidebar extends React.Component {
    render () {
        return (
            <div>
                <ul className="sidebarAba">
                    <li className="sidebarHeader">MENU</li>
                    <li><Aba name="Login" nameHtml="./Login.html"/></li>
                    <li><Aba name="Agendamentos" nameHtml="./Agendamento.html"/></li>
                    <li><Aba name="Perfil" nameHtml="./Nome3.html"/></li>
                    <li><Aba name="Cadastro" nameHtml="./Cadastro.html"/></li>
                    <li><Aba name="Configurações" nameHtml="./Nome5.html"/></li>
                </ul>
                <a href="clientes.html" className='botao'>Ver todos &raquo;</a>
            </div>
        )
    }
}

export default Sidebar