import React from 'react';
import { Route } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import './App.css';
import 'antd/dist/antd.css';
import MainPage from './pages/MainPage';

function App() {
	return (
		<div className="App">
			<Route component={AuthPage} path={['/', '/signin']} exact />
			<Route component={MainPage} path="/main" />
		</div>
	);
}

export default App;
