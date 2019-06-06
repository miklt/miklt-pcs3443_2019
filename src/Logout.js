import React from "react"
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";

import {url_v3} from "./App"
import axios from 'axios'

class Logout extends React.Component {
        
    constructor(props) {
        super(props)
    }

    render () {
        this.props.logout()
        return(
            <Redirect to="/" />
        )
    }
}

export default Logout