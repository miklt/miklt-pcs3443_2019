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
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        this.state = {
            name: '',
            role: '',
            user: '',
            isLoggedIn: false,
        }
    }

    login(isLoggedIn) {
        this.setState({
            isLoggedIn: isLoggedIn 
        })
    }
    
    logout() {
        this.setState({
            name: '',
            role: '',
            user: '',
            isLoggedIn: false,
        })
    }


    handleChange(event) {
        this.setState({[event.target.name] : event.target.value})
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
                        <div className="divCell"><Condicional state={this.state} handleChange={this.handleChange} login={this.login} logout={this.logout}/></div>
                    </div>
                </div>
            </div>
        )
    }
}

export default App