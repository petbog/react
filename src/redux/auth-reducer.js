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
    return (dispatch) => {
        authAPI.me()
            .then(response => {
                if (response.data.resultCode === 0) {
                    let { email, id, login } = response.data.data;
                    dispatch(setUserData(email, id, login, true));
                }
            })
    }
}
export const login = (email, password, rememberMe) => {
    return (dispatch) => {
        authAPI.login(email, password, rememberMe)
            .then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(getAuthUserData())
                }
            })
    }
}

export const logout = () => {
    return (dispatch) => {
        authAPI.logout()
            .then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(setUserData(null, null, null, false));
                }
            })
    }
}