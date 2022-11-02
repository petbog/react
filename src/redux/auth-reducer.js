import { stopSubmit } from 'redux-form';
import { authAPI, securityAPI } from '../API/api';

const SET_USER_DATA = 'SET_USER_DATA';
const GET_CAPTCHA_URL_SUCCESS = 'GET_CAPTCHA_URL_SUCCESS'

let initialState = {
    email: null,
    id: null,
    login: null,
    isAuth: false,
    captchaUrl: null,
};

const AuthReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
        case GET_CAPTCHA_URL_SUCCESS:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state
    }
}

export const setUserData = (email, id, login, isAuth) => ({ type: SET_USER_DATA, payload: { email, id, login, isAuth } })
export const getCaptchaUrlSuccess= (captchaUrl) => ({ type: GET_CAPTCHA_URL_SUCCESS, payload: {captchaUrl} })


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
export const login = (email, password, rememberMe,captcha) => {
    return async (dispatch) => {

        let response = await authAPI.login(email, password, rememberMe,captcha)
        if (response.data.resultCode === 0) {
            dispatch(getAuthUserData())
        } else {
            if(response.data.resultCode === 10){
                dispatch(getCaptchaUrl())
            }
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

export const getCaptchaUrl = () => {
    return async (dispatch) => {
        let response = await securityAPI.getCaptchaApi()
        const captchaUrl = response.data.url;
        dispatch(getCaptchaUrlSuccess(captchaUrl))
    }
}