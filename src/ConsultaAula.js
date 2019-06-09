import React from "react"
import "./ConsultaAula.css"
import {url_v3} from "./App"
import axios from 'axios';


class ConsultaAula extends React.Component {
    
    constructor() {
        super();
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            matricula: '',
            isVisible: false,  /// NOVO ATRIBUTO            
        };
    }
    handleChange(event) {
        this.setState({[event.target.name] : event.target.value})
    }

    handleSubmit(event){
        event.preventDefault();

        const url = url_v3+'consultaAula';
        console.log(this.state.matricula)
        axios.post(url, {
            matricula: this.state.matricula,
        }).then(response => {
            console.log("estou aqui")
            console.log(response.data)
            
           var data = document.createElement ("div")
           var text = document.createTextNode(response.data.aluno)
          // text += " "
           //text += document.createTextNode(response.data.instrutor)
           data.appendChild(text)
     
           
        })
        .catch(error => {
            alert(error)
        });

        this.setState({       /// PÕE UM setState NO FINAL DO handleSubmit
            isVisible : true,
        })
    };

    render () {
        
        return (
            
            <div>
                <form className="telaConsultaAula" onSubmit={this.handleSubmit}>

                    <label htmlFor="matricula">Matrícula do Aluno:</label>
                    <input type="text" name="matricula" id="matricula" onChange={this.handleChange} required />
                    <br />

                    <button type="submit" onSubmit={this.handleSubmit}>Go</button>
                    {this.state.isVisible  &&    /// PÕE O isVisible AQUI
                     <div>
                        <label>Aluno:</label>
                   
                        <div id="aluno"></div>
                        <br />
                          
                        <label>Instrutor:</label>
                        <div id="instrutor"></div>
                        <br />
                    </div>
                    }               
                  
                </form>
            </div>
                    

        )
    }
}

export default ConsultaAula