import {Component} from "react";
import {Form} from "semantic-ui-react";
import React from "react";


class FormularioAdicionarItem extends Component{
    state = {item:''};
    onChange = (e, {name,value}) => this.setState({[name]:value});
    enviar = () => {
        const {onAdicionarItem}= this.props;
        const {item} = this.state;
        onAdicionarItem(item);
        this.setState({item: ''});
    };
    render(){
        const {onLimpar,isListaVazia} = this.props;
        const {item} = this.state;
        return <Form size={'large'} onSubmit={this.enviar }>
            <Form.Input
                autoFocus
                placeholder='Que você vai comprar hoje?'
                onChange={this.onChange}
                name='item'
                value={item}/>
            <Form.Group widths='equal' >
                <Form.Button color={'green'}
                             type='submit'
                             fluid
                             >
                    Adicionar
                </Form.Button>
                <Form.Button color={'yellow'} disabled={isListaVazia}
                             onClick={onLimpar} type={'button'}
                             fluid >
                    Limpar
                </Form.Button>
                
            </Form.Group>
        </Form>
    }
}
export default FormularioAdicionarItem