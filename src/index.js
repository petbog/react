import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

let DialogsData = [
  { id: 1, name: 'Андрей' },
  { id: 2, name: 'Иван' },
  { id: 3, name: 'Костя' },
  { id: 4, name: 'Настя' },
  { id: 5, name: 'Вероника' },
]

let MessagesData = [
  { id: 1, message: 'Привет' },
  { id: 2, message: 'Как дела?' },
  { id: 3, message: 'Что делаешь?' },
]

let PostsData = [
  { id: 1, message: 'Пойду поем' },
  { id: 2, message: 'теперь поспать' },
]

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App DialogsData={DialogsData}  MessagesData={MessagesData}  PostsData={PostsData}/>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
