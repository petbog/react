import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import NavBar from './components/NavBar/NavBar';
import { Routes, Route } from 'react-router-dom';
import Music from './components/Music/Musik';
import ItemListContainer from './components/ItemList/ItemListContainer';
import MessagesContainer from './components/Messages/MessagesContainer';


const App = (props) => {
  return (
    <div className='app-wrapper'>
      < Header />
      <div className='wrapper_item_list'>
        < NavBar state={props.state.NavBarPage} />
        <Routes>
          <Route path='/*' element={<ItemListContainer  store = {props.store}/>} />
          <Route path='/Messages/*' element={<MessagesContainer  store ={props.store} />} />
          <Route path='Music' element={<Music />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;