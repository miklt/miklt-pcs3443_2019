import React from "react"
import "./Header.css"

class Header extends React.Component {
    render () {
        return (
            <div className="linha">
                    <header>
                        <div className="coluna col 4">
                            <h1 className="logo">Aviação ltd.</h1>
                        </div>
                        <div className="coluna col8">
                            <nav>
                                <ul className="menu inline sem-marcador">
                                    <li><a href="index.html">Home</a></li>
                                    <li><a href="clientes.html">Clientes</a></li>
                                    <li><a href="servicos.html">Serviços</a></li>
                                    <li><a href="sobre.html">Sobre</a></li>
                                    <li><a href="contato.html">Contato</a></li>
                                </ul>
                            </nav>
                        </div>
                    </header>
                </div>
        )
    }
}

export default Header