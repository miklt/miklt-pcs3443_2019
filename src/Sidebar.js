import React from "react"
import Aba from "./Aba"
import "./Sidebar.css"

class Sidebar extends React.Component {
    render () {
        return (
            <div class="coluna col3 sidebar">
                <table class="sem-marcador sem-padding sidebarAba">
                    <tr><th>MENU</th></tr>
                    <tr><td><Aba name="Nome1" nameHtml="./Nome1.html"/></td></tr>
                    <tr><td><Aba name="Nome1" nameHtml="./Nome1.html"/></td></tr>
                    <tr><td><Aba name="Nome1" nameHtml="./Nome1.html"/></td></tr>
                    <tr><td><Aba name="Nome1" nameHtml="./Nome1.html"/></td></tr>
                    <tr><td><Aba name="Nome1" nameHtml="./Nome1.html"/></td></tr>
                </table>
                <a href="clientes.html" class='botao'>Ver todos &raquo;</a>
            </div>
        )
    }
}

export default Sidebar