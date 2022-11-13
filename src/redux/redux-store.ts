import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import profileReducer from './profilePage-reducer';
import messagesReducer from './messagesPage-reducer';
import NavBarReducer from './NavBarPage-reducer';
import UsersReducer from "./users-reducer";
import AuthReducer from "./auth-reducer";
import thunkMiddleware from 'redux-thunk';
import { reducer as formReducer } from 'redux-form';
import appReducer from "./app-reducer";

//комбайн и вытаскивание типизации для ts


let reducers = combineReducers({
  profilePage: profileReducer,
  messagesPage: messagesReducer,
  NavBarPage: NavBarReducer,
  UsersPage: UsersReducer,
  auth: AuthReducer,
  form: formReducer,
  app: appReducer,
})

type RootReduserType = typeof reducers
export type AppStateType = ReturnType<RootReduserType>

//мы получаем ключь [key: string] и выводим его значение для  автоматического определения тима actions-created

type PropertiesTypes<T> = T extends { [key: string]: infer U } ? U : never

//ReturnType может принимать только функцию 

//extends {[key: string]: (...args: any[]) => any} приравнивание что вернется только функция

export type ActionsTypes<T extends {[key: string]: (...args: any[]) => any}> = ReturnType<PropertiesTypes<T>>




//подключение расширения в хроме
// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)
));

// let store = createStore(reducers, applyMiddleware(thunkMiddleware));



export default store;