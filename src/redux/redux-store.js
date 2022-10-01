import { applyMiddleware, combineReducers, createStore } from "redux";
import profileReducer from './profilePage-reducer';
import messagesReducer from './messagesPage-reducer';
import NavBarReducer from './NavBarPage-reducer';
import UsersReducer from "./users-reducer";
import AuthReducer from "./auth-reducer";
import thunkMiddleware from 'redux-thunk';
import { reducer as formReducer} from 'redux-form';
import appReducer from "./app-reducer";




let reducers = combineReducers({
    profilePage: profileReducer,
    messagesPage: messagesReducer,
    NavBarPage: NavBarReducer,
    UsersPage: UsersReducer,
    auth:AuthReducer,
    form:formReducer,
    app:appReducer,

})

let store = createStore(reducers, applyMiddleware(thunkMiddleware));


window.store = store;

export default store;