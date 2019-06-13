import React from "react"
import { BrowserRouter as Router, Route } from "react-router-dom";

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
            role: '',
            isLoggedIn: false,
            isReady: false
        }

        const url = url_v3+'auth';
        axios.post(url, { 
            matricula: getToken(), 
         }).then(response => {
            this.setState({
                name: response.data.name,
                matricula: getToken(),
                isLoggedIn: isAuthenticated(),
                role: response.data.role,
                isReady: true
            })
         })
    }

    async login(matricula, password) {
        const url = url_v3+'login';
        
        const response = await axios.post(url, {
            matricula: matricula,
            password: password
        });

        if (response.data.isLoggedIn) {
            this.setState({
                name: response.data.name,
                role: response.data.role,
                matricula: response.data.matricula,
                isLoggedIn: response.data.isLoggedIn,
            });

            setToken(matricula);
        } else {
            this.logout()
        }

        return response;
    }
    
    async logout() {
        const url = url_v3+'logout';

        await axios.post(url, {
            matricula: getToken()
        });

        this.setState({
            name: '',
            role: '',
            matricula: '',
            isLoggedIn: false,
        })

        removeToken()
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value})
    }

    render () {
        return (
            <Router>
                <div>
                                        
                    <div className="divTable" >
                        <Route path="/" component={Header}/>
                    </div>
                    <div className="divTable">
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