import React from "react"
import { Redirect } from "react-router-dom";

class Logout extends React.Component {
        

    render () {
        if (window.confirm("Deseja fazer o log out?")) {
            this.props.logout()
        }

        return(
            <Redirect to="/" />
        )
    }
}

export default Logout