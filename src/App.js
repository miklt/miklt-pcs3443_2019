import React from "react"

class App extends React.Component {

    render () {

        return (
            <div class="header">
                <div class="linha">
                    <header>
                        <div class="coluna col 4">
                            <h1 class="logo">João Cortez</h1>
                        </div>
                        <div class="coluna col8">
                            <nav>
                                <ul class="menu inline sem-marcador">
                                    <li><a href="index.html">Home</a></li>
                                    <li><a href="clientes.html">Clientes</a></li>
                                    <li><a href="servicos.html">Serviços</a></li>
                                    <li><a href="sobre.html">Sobre</a></li>
                                    <li><a href="contato.html">Contato</a></li>
                                </ul>
                            </nav>
                        </div>
                    </header>
                </div>
            </div>
        )
    }
}

export default App