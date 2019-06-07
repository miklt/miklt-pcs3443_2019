import React from "react"
import { Link } from "react-router-dom";


function Aba(props) {
    return (
        <div>
            <Link to={props.nameHtml}>{props.name}</Link>
        </div>
    )
    
}

export default Aba