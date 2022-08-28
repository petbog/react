import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import NavBar from './components/NavBar/NavBar';
// import { Routes, Route } from 'react-router-dom';
import Music from './components/Music/Musik';
import ItemListContainer from './components/ItemList/ItemListContainer';
import MessagesContainer from './components/Messages/MessagesContainer';
import UsersContainer from './components/users/UsersContainer';
import {  Route } from 'react-router-dom';


const App = (props) => {
  return (
      <div className='app-wrapper'>
        < Header />
        <div className='wrapper_item_list'>
          < NavBar />
          <Route path='/ItemList/:userId?' render={() => <ItemListContainer />} />
          <Route path='/Messages' render={() => <MessagesContainer />} />
          <Route path='/Music' render={() => <Music />} />
          <Route path='/Users' render={() => <UsersContainer />} />
        </div>
      </div>
  );
}

export default App;