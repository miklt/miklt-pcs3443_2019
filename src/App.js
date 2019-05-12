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
                <table>
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