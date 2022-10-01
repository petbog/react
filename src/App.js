import React from 'react';
import './App.css';
import NavBar from './components/NavBar/NavBar';
import Music from './components/Music/Musik';
import ItemListContainer from './components/ItemList/ItemListContainer';
import MessagesContainer from './components/Messages/MessagesContainer';
import UsersContainer from './components/users/UsersContainer';
import { Route } from 'react-router-dom';
import HeaderContainer from './components/Header/HeaderContainer';
import Login from './components/Login/login';
import { connect } from 'react-redux';
import { initializeApp } from './redux/app-reducer'
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import Preloader from './components/common/preloader/preloader';


class App extends React.Component {
  componentDidMount() {
    this.props.initializeApp()
  }
  render() {
    if (!this.props.initialized) {
      <Preloader />
    }
    return (
      <div className='app-wrapper'>
        < HeaderContainer />
        <div className='wrapper_item_list'>
          < NavBar />
          <Route path='/ItemList/:userId?' render={() => <ItemListContainer />} />
          <Route path='/Messages' render={() => <MessagesContainer />} />
          <Route path='/Music' render={() => <Music />} />
          <Route path='/Users' render={() => <UsersContainer />} />
          <Route path='/Login' render={() => <Login />} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  initialized: state.app.initialized
})

export default compose(
  withRouter,
  connect(mapStateToProps, { initializeApp }))(App);