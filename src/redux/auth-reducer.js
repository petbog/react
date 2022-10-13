import { stopSubmit } from 'redux-form';
import { authAPI } from '../API/api'
const SET_USER_DATA = 'SET_USER_DATA';

let initialState = {
    email: null,
    id: null,
    login: null,
    isAuth: false,
};

const AuthReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state
    }
}

export const setUserData = (email, id, login, isAuth) => ({ type: SET_USER_DATA, payload: { email, id, login, isAuth } })


export default AuthReducer;

export let getAuthUserData = () => {
    return async (dispatch) => {
        let response = await authAPI.me()
        if (response.data.resultCode === 0) {
            let { email, id, login } = response.data.data;
            dispatch(setUserData(email, id, login, true));
        }
    }
}
export const login = (email, password, rememberMe) => {
    return async (dispatch) => {

        let response = await authAPI.login(email, password, rememberMe)
        if (response.data.resultCode === 0) {
            dispatch(getAuthUserData())
        } else {
            let message = response.data.messages.length > 0 ? response.data.messages[0] : 'Somme error';
            dispatch(stopSubmit('login', { _error: message }))
        }
    }
}

export const logout = () => {
    return async (dispatch) => {
        let response = await authAPI.logout()
        if (response.data.resultCode === 0) {
            dispatch(setUserData(null, null, null, false));
        }
    }
}