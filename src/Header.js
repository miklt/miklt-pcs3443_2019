import React from "react"
import "./Header.css"
import { Link } from "react-router-dom";

class Header extends React.Component {
    render () {
        return (
            <div className="divRow">
                <div className="divCell" style={{whiteSpace: "nowrap", verticalAlign: "middle", padding: "20px 8px"}}>
                    <Link to="/" className="logo">Aviação ltd.</Link>
                </div>
                <div className="divCell" style={{width: "409px", verticalAlign: "middle", padding: "20px"}}>
                    <ul className="menu inline sem-marcador">
                        <li><Link to="/servicos">Serviços</Link></li>
                        <li><Link to="/sobre">Sobre</Link></li>
                        <li><Link to="/contato">Contato</Link></li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default Header