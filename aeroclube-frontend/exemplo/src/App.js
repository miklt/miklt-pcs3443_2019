import React, { Component } from 'react';
import './App.css'
import axios from 'axios';
import {TabelaDeItens, FormularioAdicionarItem} from './ListaDeCompras'
import {Grid, Header, Icon} from 'semantic-ui-react'
//Esta lista de itens é utilizada para inicializar o estado do App.
//const listaDeItens = ['feijão','arroz','leite','açúcar','morangos'];

//const url_v3 = 'https://lista-de-compras.tk/';
const url_v3 = 'http://0.0.0.0:5000/';
class App extends Component {
    constructor(){

        super();
        this.state = {
            listaDeCompras : []
        };
        this.onAdicionarItem = this.onAdicionarItem.bind(this);
        this.onRemoverItem = this.onRemoverItem.bind(this);
        this.onLimpar = this.onLimpar.bind(this);
        
    }
    
    pegarListaDaApi(url){
        //Crio uma lista de apenas os nomes
        //a partir do vetor de objetos.
        //Depois coloco essa lista no estado do componente

        axios.get(url)
            .then(result => {
                const lista = result.data
                    .map((item) => {
                        return item.nome
                    });
                return lista
            })
            .then(result => this.setState({'listaDeCompras':result}))
            .catch(error => {
                console.log(error)
                this.setState({ error })
            });
    }
    

    componentDidMount(){
        //Usando o Axios requisitamos a lista de itens.
        //const url = 'http://127.0.0.1:5000/itens'
        const url = url_v3+'itens'
        this.pegarListaDaApi(url)

    }
    onAdicionarItem (elemento){
        if(elemento.length < 3){
            alert("O nome do item tem que ter mais de 3 caracteres");
        }
        else if(this.state.listaDeCompras.includes(elemento)) {
            alert("Elemento já existe");
        }else {
            const lista = [...this.state.listaDeCompras, elemento];
            /*Agora vamos incluir o elemento no backend
            * */
            //const url = 'http://127.0.0.1:5000/item';
            const url = url_v3+'item';
            axios.post(url,{'item':elemento})
                .catch(error => {
                    console.log(error)
                });
            //fim axios
            this.setState({listaDeCompras: lista});
        }
    }
    onRemoverItem(elemento){
        const lista = this.state.listaDeCompras.filter(item => item  !== elemento);
        //const url = 'http://127.0.0.1:5000/item/'+elemento;
        const url = url_v3+'item/'+elemento;
        axios.delete(url)
            .catch(error => {
                console.log(error)
            });
        this.setState({listaDeCompras:lista});
    }
    onLimpar(){
        this.state.listaDeCompras.map((elemento)=>{
            const url = url_v3+'item/'+elemento;
            return axios.delete(url)
                .catch(error => {
                    console.log(error)
                });
        });
        this.setState({listaDeCompras:[]});
    }
    isListaVazia() {
        return (this.state.listaDeCompras.length < 1);
    }
    render() {
        const {listaDeCompras} = this.state;
        return (
<Grid columns={3} centered className={'App'}>
    <Grid.Row>
        <Header inverted as='h2' icon textAlign='center'>
            <Icon  inverted color={'red'} name='shop' circular />
            <Header.Content >Lista de Compras</Header.Content>
        </Header>
    </Grid.Row>
    <Grid.Row centered>
        <Grid.Column width={8}>
            <FormularioAdicionarItem isListaVazia={this.isListaVazia()}
                                     onAdicionarItem={this.onAdicionarItem}
                                     onLimpar={this.onLimpar}
                                     
            />

            <TabelaDeItens itens={listaDeCompras} onRemoverItem = {this.onRemoverItem}/>
        </Grid.Column>
    </Grid.Row>
</Grid>
        );
    }
}

export default App;
