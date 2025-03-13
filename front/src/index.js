import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './store/store';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
console.warn = () => {};
const originalConsoleError = console.error;
console.error = (...args) => {
  const warningMessages = [
    'findDOMNode is deprecated',
    'defaultProps will be removed from function components',
  ];

  if (warningMessages.some((msg) => args[0]?.includes(msg))) {
    return;
  }

  originalConsoleError(...args);
};

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
