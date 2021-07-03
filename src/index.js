import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import firebase from 'firebase';
import { Provider } from "react-redux"
import store from './store/store';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
  apiKey: "AIzaSyDWOFpOs4vmhSJRAiHLi4ficqndiLjN7aE",
  authDomain: "leka-64be2.firebaseapp.com",
  projectId: "leka-64be2",
  storageBucket: "leka-64be2.appspot.com",
  messagingSenderId: "1082916961039",
  appId: "1:1082916961039:web:f62115539fbfacf9961c7a",
  measurementId: "G-RJ5DZVP30C"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

window.store=store
ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode></Provider>
  ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
