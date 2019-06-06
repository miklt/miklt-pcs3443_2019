import React from "react"
import "./Header.css"
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

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
                                <li><Link to="/servicos">Serviços</Link></li>
                                <li><Link to="/sobre">Sobre</Link></li>
                                <li><Link to="/contato">Contato</Link></li>
                            </ul>
                        </nav>
                    </div>
                </header>
            </div>
        )
    }
}

export default Header