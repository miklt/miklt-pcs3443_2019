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
                <table className="linha">
                    <tr>
                        <td><Sidebar /></td>
                        <td><Login /></td>
                    </tr>
                    
                </table>
            </div>
        )
    }
}

export default App