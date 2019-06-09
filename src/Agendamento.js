import React from "react"
import "./Agendamento.css"
import {url_v3} from "./App"
import axios from 'axios';


class Agendamento extends React.Component {

    constructor() {
        super();
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            aluno: '',
            instrutor: '',
            parecer: '',
            dataVoo: '',
            horaSaida: '',
            duracao: '',
            aeronave: '',
            tipo: '',
            matricula:'',
           
        };
    }

    handleChange(event) {
        this.setState({[event.target.name] : event.target.value})
    }
    handleSubmit(event){ 
        const url = url_v3+'agendarVoo';
        console.log(this.state)
        axios.post(url, {
            aluno:     this.state.aluno,
            instrutor: this.state.instrutor,
            dataVoo:   this.state.dataVoo,
            horaSaida: this.state.horaSaida,
            duracao:   this.state.duracao,
            aeronave:  this.state.aeronave,
            tipo:      this.state.tipo,
            piloto:    this.state.piloto,
            matricula: this.state.matricula,
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
                    <select defaultValue="" name="tipo" id="tipo" onChange={this.handleChange} onClick={this.changeVisibility} required>
                    <option value="" disabled>Selecione</option>
                        <option value="Aula">Aula</option>
                        <option value='Voo Simples'>Voo Simples</option>
                    </select>
                    <br />
                        
                    <label htmlFor="aeronave">Aeronave: </label>
                    <input type="text" name="aeronave" id="aeronave" onChange={this.handleChange} required />
                    <br />

    
                    <label htmlFor="horaSaida">Hora de Saida: </label>
                    <input type="text" name="horaSaida" id="horaSaida" onChange={this.handleChange} required />
                    <br />

                    <label htmlFor="duracao">Duração: </label>
                    <input type="text" name="duracao" id="duracao" onChange={this.handleChange} required />
                    <br />
                    {(this.state.tipo==="Voo Simples") &&
                
                    <div>
                         <label htmlFor="piloto">Piloto: </label>
                    <input type="text" name="piloto" id="piloto" onChange={this.handleChange} required />
                    <br />
                    </div>
                
                }

                    {(this.state.tipo==="Aula") &&
                    <div>
                            <label htmlFor="aluno">Aluno: </label>
                    <input type="text" name="aluno" id="aluno" onChange={this.handleChange} required />
                    <br />

                    <label htmlFor="matricula">Número da Matrícula: </label>
                    <input type="text" name="matricula" id="matricula" onChange={this.handleChange} required />
                    <br />
                    
                    
                    
                    <label htmlFor="instrutor">Instrutor: </label>
                    <input type="text" name="instrutor" id="instrutor" onChange={this.handleChange} required />
                    <br />
                    </div>
                }
                    
                    <button type="submit">Go</button>
                </form>
            </div>
        )
     
    }
}

export default Agendamento