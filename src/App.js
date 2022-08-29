import React from 'react';
import './App.css';
import NavBar from './components/NavBar/NavBar';
import Music from './components/Music/Musik';
import ItemListContainer from './components/ItemList/ItemListContainer';
import MessagesContainer from './components/Messages/MessagesContainer';
import UsersContainer from './components/users/UsersContainer';
import {  Route } from 'react-router-dom';
import HeaderContainer from './components/Header/HeaderContainer';


const App = (props) => {
  return (
      <div className='app-wrapper'>
        < HeaderContainer />
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