import React from 'react';
import './App.css';
import NavBar from './components/NavBar/NavBar';
import ItemListContainer from './components/ItemList/ItemListContainer';
import UsersContainer from './components/users/UsersContainer';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import HeaderContainer from './components/Header/HeaderContainer';
import Login from './components/Login/login';
import { connect, Provider } from 'react-redux';
import { initializeApp } from './redux/app-reducer'
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import Preloader from './components/common/preloader/preloader';
import store from "./redux/redux-store";
import { Suspense } from 'react';
import { withSuspens } from './hoc/withSuspens';

const Music = React.lazy(() => import('./components/Music/Musik')); // ленивая загрузка компонент будет загружен позже
const MessagesContainer = React.lazy(() => import('./components/Messages/MessagesContainer')); // ленивая загрузка компонент будет загружен позже
//суспенс делается с связке с лези для загрузки,иначе реакт ломается
//music сделал xthtp hoc а messages без hoc
class App extends React.Component {
  componentDidMount() {
    this.props.initializeApp()
  }
  render() {
    if (!this.props.initialized) {
      <Preloader />
    }
    return (
      <Switch>
        <div className='app-wrapper'>
          < HeaderContainer />
          <div className='wrapper_item_list'>
            < NavBar />
        <Route path='/' render={() => <Redirect to={"/ItemList"} />} />
            <Route path='/ItemList/:userId?' render={() => <ItemListContainer />} />
            <Route path='/Messages' render={() => {
              return <Suspense fallback={<div>Loading...</div>}>
                <MessagesContainer />
              </Suspense>
            }} />
            <Route path='/Music' render={withSuspens(Music)} />
            <Route path='/Users' render={() => <UsersContainer />} />
            <Route path='/Login' render={() => <Login />} />
          </div>
        </div>
      </Switch>
    );
  }
}

const mapStateToProps = (state) => ({
  initialized: state.app.initialized
})

let AppContainer = compose(
  withRouter,
  connect(mapStateToProps, { initializeApp }))(App);

let SamuraiApp = (props) => {
  return <BrowserRouter>
    <Provider store={store}>
      <AppContainer />
    </Provider>
  </BrowserRouter>
}

export default SamuraiApp;