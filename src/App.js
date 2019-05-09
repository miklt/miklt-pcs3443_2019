import React from "react"
import Header from "./Header"
import Sidebar from "./Sidebar"
import Login from "./Login"
import "./App.css"

class App extends React.Component {

    render () {

        return (
            <div className="header">
                <Header />
                <div className="linha">
                    <div className = "coluna col3">
                        <Sidebar />
                    </div>
                    <div className = "coluna col8">
                        <Login />
                    </div>
                </div>
            </div>
        )
    }
}

export default App