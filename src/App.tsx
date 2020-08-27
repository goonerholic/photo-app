import React from 'react';
import { Route } from 'react-router-dom';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import './App.css';
import 'antd/dist/antd.css';

function App() {
	return (
		<div className="App">
			<Route component={SignInPage} path={['/', '/signin']} exact />
			<Route component={SignUpPage} path="/signup" />
		</div>
	);
}

export default App;
