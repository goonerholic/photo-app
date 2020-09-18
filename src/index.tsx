import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootReducer, { rootSaga } from './modules';
import { gapiInit } from './utils/gapi';
import { signInSuccess } from './modules/user';

const sagaMiddleware = createSagaMiddleware();
const store = configureStore({
  reducer: rootReducer,
  middleware: [...getDefaultMiddleware({ thunk: false }), sagaMiddleware],
  devTools: process.env.NODE_ENV === 'production' ? false : true,
});

sagaMiddleware.run(rootSaga);

gapiInit().then(() => {
  const user = localStorage.getItem('user');
  if (user) {
    store.dispatch(signInSuccess(JSON.parse(user)));
  }

  console.log('init');
  ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>,
    document.getElementById('root'),
  );
});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
