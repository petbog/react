import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import ItemList from './components/ItemList/ItemList';
import Messages from './components/Messages/Messages';
import NavBar from './components/NavBar/NavBar';
import { Routes, Route } from 'react-router-dom';
import Music from './components/Music/Musik';


const App = () => {
  return (
    <div className='app-wrapper'>
      < Header />
      <div className='wrapper_item_list'>
        < NavBar />
        <Routes>
          <Route path='/' element={<ItemList />} />
          <Route path='Messages' element={<Messages />} />
          <Route path='Music' element={<Music />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;