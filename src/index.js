import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
// import store from './redux/store';
import store from './redux/redux-store'

let rerenderEntireTree = (state) => ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App state={state} dispatch={store.dispatch.bind(store)} store={store}/>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

rerenderEntireTree(store.getState());

store.subscribe( () => {
  let state = store.getState();
  rerenderEntireTree(state);
});