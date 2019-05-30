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
                    <div className="coluna col6">
                        <nav>
                            <ul className="menu inline sem-marcador">
                                <li><a href="servicos">Serviços</a></li>
                                <li><a href="sobre">Sobre</a></li>
                                <li><a href="contato">Contato</a></li>
                            </ul>
                        </nav>
                    </div>
                </header>
            </div>
        )
    }
}

export default Header