import React from "react"
import Header from "./Header"
import Sidebar from "./Sidebar"
import Login from "./Login"
import "./App.css"

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
                        <div className="divCell"><Login /></div>
                    </div>
                </div>
            </div>
        )
    }
}

export default App