import React from "react"
import Header from "./Header"
import Sidebar from "./Sidebar"
import Condicional from "./Condicional"
import "./App.css"

export const url_v3 = 'http://127.0.0.1:5000/'

class App extends React.Component {

    constructor() {
        super()
        this.handleChange = this.handleChange.bind(this);
        this.logout = this.logout.bind(this);
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
            user: '',
            isLoggedIn: false,
        }
    }

    logout() {
        this.setState({
            name: '',
            dataNascimento: '',
            cpf: '',
            endereco: '',
            email: '',
            role: '',
            password: '',
            breve: '',
            instituicao: '',
            user: '',
            isLoggedIn: false,
        })
    }

    handleChange(event) {
        this.setState({[event.target.name] : event.target.value})
        console.log(this.state)
    }

    render () {

        return (
            <div>
                <div className="header">
                    <Header />
                </div>
                <div className="divTable">
                    <div className="divRow">
                        <div className="divCell"><Sidebar state={this.state} handleChange={this.handleChange}/></div>
                        <div className="divCell"><Condicional state={this.state} handleChange={this.handleChange} logout={this.logout}/></div>
                    </div>
                </div>
            </div>
        )
    }
}

export default App