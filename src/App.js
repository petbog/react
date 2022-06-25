import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import ItemList from './components/ItemList/ItemList';
import Messages from './components/Messages/Messages';
import NavBar from './components/NavBar/NavBar';
import { Routes, Route } from 'react-router-dom';
import Music from './components/Music/Musik';


const App = (props) => {

  return (
    <div className='app-wrapper'>
      < Header />
      <div className='wrapper_item_list'>
        < NavBar />
        <Routes>
          <Route path='/' element={<ItemList PostsData={props.PostsData}  />} />
          <Route path='/Messages/*' element={ <Messages DialogsData={props.DialogsData} MessagesData={props.MessagesData} />} />
          <Route path='Music' element={<Music />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;