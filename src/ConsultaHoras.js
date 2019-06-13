import React from "react"
import "./ConsultaHoras.css"
import {url_v3} from "./App"
import axios from 'axios';


class ConsultaHoras extends React.Component {
    
    constructor() {
        super();
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            matricula: '',
            isVisible: false,
            horas:'50',          
        };
    }
    handleChange(event) {
        this.setState({[event.target.name] : event.target.value})
    }

    handleSubmit(event){
        event.preventDefault();

        const url = url_v3+'consultaHoras';
        console.log(this.state.matricula)
        axios.post(url, {
            matricula: this.state.matricula,
        }).then(response => {
            if(response.data)
                {
                    this.setState({dados: response.data})
                }
            
            if(response.data>='50'){
                this.setState({parabens: "parabens"})
            }  
            console.log("estou aqui")
            
            console.log(response.data)
           
          
           
     
           
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
                    
                        <label>Total de Horas:{this.state.dados}</label>

                        <br />
                        
                       
                    </div>
                    }
                    
                    {(this.state.parabens) &&
                    <div>
                         <label>Parabéns! Você pode tirar seu Brevê!</label>
                    </div>
                    }
                    
                               
                  
                </form>
            </div>
                    

        )
    }
}

export default ConsultaHoras