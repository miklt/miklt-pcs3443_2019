import React from "react"
import Header from "./Header"
import Sidebar from "./Sidebar"
import Condicional from "./Condicional"
import "./App.css"

export const url_v3 = 'http://127.0.0.1:5000/'

class App extends React.Component {

    constructor() {
        super()
        this.state = {
            name: '',
            dataNascimento: '',
            cpf: '',
            endereco: '',
            email: '',
            role: '',
            password: '',
            breve: '',
            instituicao: '',
            isLoggedIn: false,
        }
    }

    render () {

        return (
            <div>
                <div className="header">
                    <Header />
                </div>
                <div className="divTable">
                    <div className="divRow">
                        <div className="divCell"><Sidebar state={this.state} /></div>
                        <div className="divCell"><Condicional state={this.state}/></div>
                    </div>
                </div>
            </div>
        )
    }
}

export default App