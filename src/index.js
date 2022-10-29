import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store/configurateStore';
import App from './App';

axios.defaults.baseURL = 'https://addpersonlive.herokuapp.com/';

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null}
     persistor={persistor}
     >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);
