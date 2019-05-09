import {Component} from "react";
import {Icon,Label, Message} from "semantic-ui-react";
import React from "react";
import './TabelaDeItens.css'
import {BotaoRemover} from '../Botoes'

class TabelaDeItens extends Component {
    constructor(props){
        super(props);
        this.state = {itens:props.itens};
        this.corpoDaTabela = this.corpoDaTabela.bind(this);
    }
    corpoDaTabela = () => {
        const {onRemoverItem,itens} = this.props;
        return  <div>
            {itens.map(item =>
                <Label id={item} key={item} 
                className={'labeldiv'}
                 size={'large'}>
                <span className={'itemlista'}>{item}</span>
                <Label.Detail> <BotaoRemover onClick={() => onRemoverItem(item)}/>
                </Label.Detail>
                </Label>
                    
                    
                

            )}
        </div>
    };
    listaVazia = () =>{
        return (
            <Message warning attached={'bottom'}>
            <Icon name={'warning'}/>A lista de Compras está Vazia</Message>
        )
    };

    render () {
        if (this.props.itens.length < 1) {
            return <this.listaVazia/>
        }else {
            return  <this.corpoDaTabela/>
        }
    }
}
export default TabelaDeItens