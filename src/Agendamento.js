import React from "react"
import "./Agendamento.css"
import {url_v3} from "./App"
import axios from 'axios';


class Agendamento extends React.Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.montarForms = this.montarForms.bind(this);

        this.state = {
            piloto: this.props.state.name,
            instrutor: '',
            dataVoo: '',
            horaSaida: '',
            duracao: '',
            aeronave: '',
            tipo: '',
            matricula: this.props.state.matricula,
        };
    }

    montarForms() {

    }

    handleChange(event) {
        this.setState({[event.target.name] : event.target.value})
    }

    handleSubmit(event){ 
        const url = url_v3+'agendarVoo';
        
        axios.post(url, {
            matricula: this.state.matricula,
            instrutor: this.state.instrutor,
            dataVoo:   this.state.dataVoo,
            horaSaida: this.state.horaSaida,
            duracao:   this.state.duracao,
            aeronave:  this.state.aeronave,
            tipo:      this.state.tipo,
        })
        .catch(error => {
            alert(error)
        });
    };

    render () {
        return (
            <div>
                <form className="telaAgendamento" onSubmit={this.handleSubmit}>

                
                    <label htmlFor="tipo">Tipo de Voo: </label>
                    <select defaultValue="" name="tipo" id="tipo" onChange={this.handleChange} required>
                        <option value="" disabled>Selecione</option>
                        <option value="Aula">Aula</option>
                        <option value='Voo Simples'>Voo Simples</option>
                    </select>
                        
                    <label htmlFor="aeronave">Aeronave: </label>
                    <select defaultValue="" name="aeronave" id="aeronave" onChange={this.handleChange} required>
                        <option value="" disabled>Selecione</option>
                    </select>
    
                    <label htmlFor="horaSaida">Hora de Saida: </label>
                    <input type="text" name="horaSaida" id="horaSaida" onChange={this.handleChange} required />

                    <label htmlFor="duracao">Duração (horas): </label>
                    <input type="number" name="duracao" id="duracao" onChange={this.handleChange} required />
                    
                
                    {(this.state.tipo==="Aula") &&
                    <div>
                    
                    <label htmlFor="instrutor">Instrutor: </label>
                    <input type="text" name="instrutor" id="instrutor" onChange={this.handleChange} required />
                    
                    </div>
                }
                    
                    <button type="submit">Go</button>
                </form>
            </div>
        )
     
    }
}

export default Agendamento