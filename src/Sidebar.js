import React from "react"
import Aba from "./Aba"
import "./Sidebar.css"

class Sidebar extends React.Component {
    render () {
        return (
            <div>
                <ul class="sidebarAba">
                    <li className="sidebarHeader">MENU</li>
                    <li><Aba name="Nome1" nameHtml="./Nome1.html"/></li>
                    <li><Aba name="Nome2" nameHtml="./Nome2.html"/></li>
                    <li><Aba name="Nome3" nameHtml="./Nome3.html"/></li>
                    <li><Aba name="Nome4" nameHtml="./Nome4.html"/></li>
                    <li><Aba name="Nome5" nameHtml="./Nome5.html"/></li>
                </ul>
                <a href="clientes.html" class='botao'>Ver todos &raquo;</a>
            </div>
        )
    }
}

export default Sidebar