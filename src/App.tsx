import React from 'react';
import { Route, Router, useHistory } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import './App.css';
import 'antd/dist/antd.css';
import MainPage from './pages/MainPage';

function App() {
  const history = useHistory();
  return (
    <div className="App">
      <Router history={history}>
        <Route path="/" exact>
          <MainPage />
        </Route>
        <Route path="/signin">
          <AuthPage />
        </Route>
      </Router>
    </div>
  );
}

export default App;
