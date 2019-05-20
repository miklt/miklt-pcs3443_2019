import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import Cadastro_instrutor from './cadastro/Instrutor';
import Cadastro_aluno from './cadastro/Aluno';
import * as serviceWorker from './serviceWorker';
import Home from './Home';

const routing = (
	<Router>
		<div>
			<Route exact path="/" component={Home} />
			<Route exact path="/cadastro/instrutor" component={Cadastro_instrutor} />
			<Route exact path="/cadastro/aluno" component={Cadastro_aluno} />
		</div>
	</Router>
);

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
