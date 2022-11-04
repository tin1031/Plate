import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';

// css framework
import 'antd/dist/antd.min.css'
import { applyMiddleware, createStore } from 'redux';
import promiseMiddleware from 'redux-promise';
import ReduxThunk from 'redux-thunk';
import Reducer from './_reducer'

const createStoreWithMiddleware =
applyMiddleware(promiseMiddleware, ReduxThunk)(createStore);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // 리덕스연결
  <React.StrictMode >
    <Provider store={createStoreWithMiddleware(Reducer, 
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__())}>
      <App />
    </Provider>
  </React.StrictMode>
);


reportWebVitals();
