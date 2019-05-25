import React from "react"
import "./Agendamento.css"


class Agendamento extends React.Component {

    constructor(props) {
        super(props)
        this.state = this.props.state
    }

    render () {
        return (
            <div>
                <form action="" className="telaAgendamento">
                    <label for="date">Data e Horário:</label>
                    <input type="datetime-local" name="date" id="date" />
                    <label for="instrutor">Instrutor: </label>
                    <select name="instrutor" id="instrutor">
                        <option value="" disabled selected>Select your option</option>
                        <option value="I1">Instrutor 1</option>
                        <option value="I2">Instrutor 2</option>
                        <option value="I3">Instrutor 3</option>
                        <option value="I4">Instrutor 4</option>
                        <option value="I5">Instrutor 5</option>
                    </select>
                    <label for="aviao">Avião: </label>
                    <select id="aviao" name="aviao">
                        <option value="" disabled selected>Select your option</option>
                        <option value="A1">Avião 1</option>
                        <option value="A2">Avião 2</option>
                        <option value="A3">Avião 3</option>
                        <option value="A4">Avião 4</option>
                        <option value="A5">Avião 5</option>
                    </select>
                    <button type="submit">Go</button>
                </form>
            </div>
        )
        
    }
}

export default Agendamento