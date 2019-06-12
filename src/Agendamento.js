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
        this.limpaForms = this.limpaForms.bind(this);

        this.state = {
            piloto: this.props.state.name,
            instrutor: '',
            dataVoo: '',
            horaSaida: '',
            num: 0,
            ano: '',
            modelo: '',
            matricula: this.props.state.matricula,
        };
        this.limpaForms()
        this.montarForms()
    }

    limpaForms() {
        var Parent = document.getElementById("aeronave");
        if (Parent != null && Parent.hasChildNodes()) {
            while (Parent.hasChildNodes()) {
                Parent.removeChild(Parent.firstChild);
            }
        }
    }

    montarForms() {
        const url = url_v3 + "listaAero"
        axios.get(url)
            .then(response => {
                console.log(response)
                response.data.forEach(data =>{
                    var lista = document.getElementById("aeronave")
                    var opt = document.createElement("option")
                    opt.innerHTML = data.modelo + '-' + data.ano + '-' + data.num.toString()
                    lista.appendChild(opt)
                })    
            })
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
        
        console.log("RE-RENDER")
        return (
            <div>
                <h1 style={{position: "relative", left: "160px", width: "351px", textAlign:"center"}}>Agendamento de Aula</h1>
                <form className="telaAgendamento" onSubmit={this.handleSubmit}>

                
                    <label htmlFor="tipo">Tipo de Voo: </label>
                    <select defaultValue="" name="tipo" id="tipo" onChange={this.handleChange} required>
                        <option value="" disabled>Selecione</option>
                        <option value="Aula">Aula</option>
                        <option value='Voo Simples'>Voo Simples</option>
                    </select>

                    <br />
                        
                    <label htmlFor="aeronave">Aeronave: </label>
                    <select defaultValue="" name="aeronave" id="aeronave" onChange={this.handleChange} required>
                        <option value="" disabled>Selecione</option>
                    </select>
    
                    <br />

                    <label htmlFor="horaSaida">Hora de Saida: </label>
                    <input type="text" name="horaSaida" id="horaSaida" onChange={this.handleChange} required />

                    <br />

                    <label htmlFor="duracao">Duração (horas): </label>
                    <input type="number" name="duracao" id="duracao" onChange={this.handleChange} required />
                    
                    <br />

                    {(this.state.tipo==="Aula") &&
                    <div>
                    
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