import React, { Component } from 'react';
import MaskedInput from 'react-text-mask'
import '../css/Ficha_Avalia_Voo.css';


class Ficha_Avalia_Voo extends Component {
    constructor(props){
        super(props);
        this.handleDataVooChange=this.handleDataVooChange.bind(this);
        this.handleHoraInicioChange=this.handleHoraInicioChange.bind(this);
        this.handleHorasTotalChange=this.handleHorasTotalChange.bind(this);
        this.handleNotaChange=this.handleNotaChange.bind(this);
        this.handleInstrutorIdChange=this.handleInstrutorIdChange.bind(this);
        this.handleAlunoIdChange=this.handleAlunoIdChange.bind(this);
    }

    handleDataVooChange(e) {
        this.props.onDataVooChange(e.target.value);
     }
    
     handleHoraInicioChange(e) {
        this.props.onHoraInicioChange(e.target.value);
    }
    
    handleHorasTotalChange(e) {
        this.props.onHotasTotalChange(e.target.value);
    }
    
    handleNotaChange(e) {
        this.props.onNotaChange(e.target.value);
    }

    handleInstrutorIdChange(e) {
        this.props.onInstrutorIdChange(e.target.value);
    }
    
    handleAlunoIdChange(e) {
        this.props.onAlunoIdChange(e.target.value);
    }

    render() {
        return (
            <div>
                <h1>Avaliação do Voo Aula</h1>
                    <br/>
                    <label>Num. Cadastro Instrutor</label>
                    <input type="text" name="instrutor_id" value={this.props.instrutor_id} onChange={this.handleInstrutorIdChange}></input>
                    <label>Num Matrícula Aluno</label>
                    <input type="text" name="aluno_id" value={this.props.aluno_id} onChange={this.handleAlunoIdChange}></input>
                    <br/><br/>
                    <label>Data (dd/mm/yyyy)</label>
                    <input type="text" name="data_voo" value={this.props.data_voo} onChange={this.handleDataVooChange}></input>
                    <label>Hora</label> 
                    <input type="text" name="hora_inicio" value={this.props.hora_inicio} onChange={this.handleHoraInicioChange}></input>
                    <br/><br/>
                    <label>Duração (horas)</label>
                    <input type="number" name="horas_total" value={this.props.horas_total} onChange={this.handleHorasTotalChange}></input>
                    <label>Nota</label>
                    <select type="number" name="nota" value={this.props.nota} onChange={this.handleNotaChange}>
                        <option value={''}>...</option>
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                    </select>        
            </div>
        );
    }
}

export default Ficha_Avalia_Voo;
