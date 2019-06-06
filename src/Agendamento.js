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
        })
        .catch(error => {
            alert(error)
        });
    };

    render () {
        return (
            <div>
                <form className="telaAgendamento" onSubmit={this.handleSubmit}>


                    <label htmlFor="instrutor">Instrutor: </label>
                    <input type="text" name="instrutor" id="instrutor" onChange={this.handleChange} required />
                    <br />
                        
                    <label htmlFor="aeronave">Avião: </label>
                    <input type="text" name="aviao" id="aviao" onChange={this.handleChange} required />
                    <br />

                    <label htmlFor="dataVoo">Data do Voo: </label>
                    <input type="date" name="dataVoo" id="dataVoo" onChange={this.handleChange} required />
                    <br />
                    <label htmlFor="horaSaida">Hora de Saida: </label>
                    <input type="text" name="horaSaida" id="horaSaida" onChange={this.handleChange} required />
                    <br />

                    <label htmlFor="duracao">Duração: </label>
                    <input type="text" name="duracao" id="duracao" onChange={this.handleChange} required />
                    <br />
                    
                    <label htmlFor="piloto">Piloto: </label>
                    <input type="text" name="piloto" id="piloto" onChange={this.handleChange} required />
                    <br />
                    
                    <label htmlFor="tipo">Tipo de Voo: </label>
                    <select defaultValue="Voo Simples" name="tipo" id="tipo" onChange={this.handleChange} onClick={this.changeVisibility} required>
                    <option value="" disabled>Selecione</option>
                        <option value="Aula">Aula</option>
                        <option value='Voo Simples'>Voo Simples</option>
                    </select>
                    <br />

                    {(this.state.tipo==="Aula") &&
                    <div>
                            <label htmlFor="aluno">Aluno: </label>
                    <input type="text" name="aluno" id="aluno" onChange={this.handleChange} required />
                    <br />
                    </div>
                }
                    
                    <button type="submit">Go</button>
                </form>
            </div>
        )
     
        
      /*   não precisa de horaSaida, tirar
      
      
      
      
      
      
      
      
      <select name="instrutor" id="instrutor">
                        <option value="" disabled selected>Select your option</option>
                        <option value="I1">Instrutor 1</option>
                        <option value="I2">Instrutor 2</option>
                        <option value="I3">Instrutor 3</option>
                        <option value="I4">Instrutor 4</option>
                        <option value="I5">Instrutor 5</option>
                    </select>
                    
                    
                    <select id="aviao" name="aviao">
                        <option value="" disabled selected>Select your option</option>
                        <option value="A1">Avião 1</option>
                        <option value="A2">Avião 2</option>
                        <option value="A3">Avião 3</option>
                        <option value="A4">Avião 4</option>
                        <option value="A5">Avião 5</option>
                    </select>*/
    }
}

export default Agendamento