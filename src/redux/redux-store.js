import { combineReducers, createStore } from "redux";
import profileReducer from './profilePage-reducer';
import messagesReducer from './messagesPage-reducer';
import NavBarReducer from './NavBarPage-reducer';



let reducers = combineReducers({
    profilePage: profileReducer,
    messagesPage: messagesReducer,
    NavBarPage: NavBarReducer,
})

let store = createStore(reducers);




export default store;