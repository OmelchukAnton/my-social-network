import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
// import store from './redux/store';
import store from './redux/redux-store'
import { Provider } from 'react-redux';

let rerenderEntireTree = (state) => ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

rerenderEntireTree(store.getState());

store.subscribe( () => {
  let state = store.getState();
  rerenderEntireTree(state);
});