import React from "react"
import Aba from "./Aba"
import "./Sidebar.css"

class Sidebar extends React.Component {
    render () {
        return (
            <div class="coluna col3 sidebar">
                <table class="sem-marcador sem-padding sidebarAba">
                    <tr className="sidebarHeader"><th>MENU</th></tr>
                    <tr><td><Aba name="Nome1" nameHtml="./Nome1.html"/></td></tr>
                    <tr><td><Aba name="Nome2" nameHtml="./Nome2.html"/></td></tr>
                    <tr><td><Aba name="Nome3" nameHtml="./Nome3.html"/></td></tr>
                    <tr><td><Aba name="Nome4" nameHtml="./Nome4.html"/></td></tr>
                    <tr><td><Aba name="Nome5" nameHtml="./Nome5.html"/></td></tr>
                </table>
                <a href="clientes.html" class='botao'>Ver todos &raquo;</a>
            </div>
        )
    }
}

export default Sidebar