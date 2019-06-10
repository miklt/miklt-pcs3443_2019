import React from "react"

import "./Login.css"

class Login extends React.Component {
        
    constructor(props) {
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.state = {
            password: "",
 			matricula: "",
 			error: ""
        }
    }

    handleChange(event) {
        this.setState({[event.target.name] : event.target.value})
    }

    handleSubmit(event){
        event.preventDefault();
        this.setState({error: ''})

        this.props.login(this.state.matricula, this.state.password).then(response => {
            if (response.data.error) {
                this.setState({error: response.data.error})
            }
        })
    };

    render () {
        return (
            <div>
                <form className = "telaLogin" onSubmit={this.handleSubmit}>
                    <label htmlFor = "matricula">Matrícula:</label>
                    <input type="text" name="matricula" id="matricula" onChange={this.handleChange} required/>
                    <br />

                    <label htmlFor = "password">Senha:</label>
                    <input type="password" name="password" id="password" onChange={this.handleChange} required/>
                    <br />

                    <button type="submit">Go</button>
                    <div className="error-message">{this.state.error}</div>
                </form>
            </div>
        )
    }
}

export default Login