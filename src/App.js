import React from "react"
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Header from "./Header"
import Sidebar from "./Sidebar"
import Condicional from "./Condicional"
import axios from 'axios';
import { setToken, isAuthenticated, removeToken, getToken} from "./Auth";
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
            matricula: '',
            isLoggedIn: false,
            role: ''
        }

        const url = url_v3+'auth';
        axios.post(url, { 
            matricula: getToken(), 
         }).then(response => {
            this.setState({
                name: response.data.name,
                matricula: getToken(),
                isLoggedIn: isAuthenticated(),
                role: response.data.role
            })
         })
    }

    login(name, matricula, role, isLoggedIn) {
        if(isLoggedIn) {
            this.setState({
                name: name,
                role: role,
                matricula: matricula,
                isLoggedIn: isLoggedIn,
            })
            setToken(matricula)
        } else {
            this.logout()
            window.location.reload()
        }
    }
    
    logout() {
        this.setState({
            name: '',
            role: '',
            matricula: '',
            isLoggedIn: false,
        })
        removeToken()
    }

    handleChange(event) {
        this.setState({[event.target.name] : event.target.value})
    }

    render () {
        return (
            <Router>
                <div>
                    
                    <div className="divTable">
                        <div className="divRow">   
                            <div className="divCell">    
                                <div className="header" >
                                    <Route path="/" component={Header}/>
                                </div>
                            </div>
                        </div>
                        <div className="divRow">
                            <div className="divCell">
                                <Route
                                    path="/"
                                    render={(routeProps) => (
                                        <Sidebar {...routeProps} state={this.state} handleChange={this.handleChange} />
                                    )}
                                />
                            </div>
                            <div className="divCell">
                                <Route
                                    path="/"
                                    render={(routeProps) => (
                                        <Condicional {...routeProps} state={this.state} handleChange={this.handleChange} login={this.login} logout={this.logout} />
                                    )}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </Router>               
        )
    }
}

export default App