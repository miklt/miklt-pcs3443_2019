import React from "react"
import Aba from "./Aba"
import "./Sidebar.css"

class Sidebar extends React.Component {
    render () {
        return (
            <div>
                <ul class="sidebarAba">
                    <li className="sidebarHeader">MENU</li>
                    <li><Aba name="Login" nameHtml="./Nome1.html"/></li>
                    <li><Aba name="Agendamentos" nameHtml="./Nome2.html"/></li>
                    <li><Aba name="Perfil" nameHtml="./Nome3.html"/></li>
                    <li><Aba name="Informações" nameHtml="./Nome4.html"/></li>
                    <li><Aba name="Configurações" nameHtml="./Nome5.html"/></li>
                </ul>
                <a href="clientes.html" class='botao'>Ver todos &raquo;</a>
            </div>
        )
    }
}

export default Sidebar