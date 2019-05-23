import React from "react"
import Header from "./Header"
import Sidebar from "./Sidebar"
import Login from "./Login"
import Condicional from "./Condicional"
import "./App.css"

export const url_v3 = 'http://127.0.0.1:5000/'

class App extends React.Component {

    render () {

        return (
            <div>
                <div className="header">
                    <Header />
                </div>
                <div className="divTable">
                    <div className="divRow">
                        <div className="divCell"><Sidebar /></div>
                        <div className="divCell"><Condicional /></div>
                    </div>
                </div>
            </div>
        )
    }
}

export default App