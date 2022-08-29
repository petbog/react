import { combineReducers, createStore } from "redux";
import profileReducer from './profilePage-reducer';
import messagesReducer from './messagesPage-reducer';
import NavBarReducer from './NavBarPage-reducer';
import UsersReducer from "./users-reducer";
import AuthReducer from "./auth-reducer";



let reducers = combineReducers({
    profilePage: profileReducer,
    messagesPage: messagesReducer,
    NavBarPage: NavBarReducer,
    UsersPage: UsersReducer,
    auth:AuthReducer,
})

let store = createStore(reducers);


window.store = store;

export default store;