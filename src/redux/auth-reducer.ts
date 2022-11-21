import { stopSubmit } from 'redux-form';
import { authAPI, securityAPI } from '../API/api';

const SET_USER_DATA = 'SET_USER_DATA';
const GET_CAPTCHA_URL_SUCCESS = 'GET_CAPTCHA_URL_SUCCESS'

export type initialStateType2 = {
    email: string | null,
    id: number | null,
    login: string | null,
    isAuth: boolean,
    captchaUrl: string | null,
};
 // as воспринимай как

let initialState = {
    email: null as string | null ,
    id: null as number | null,
    login: null as string | null,
    isAuth: false,
    captchaUrl: null as string | null,
};


export type initialStateType = typeof initialState



const AuthReducer = (state = initialState, action: any): initialStateType => {
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


type setUserDataActionPayloadType = {
    email: string | null
    id: number | null
    login: string | null
    isAuth: boolean
}

type setUserDataActionType = {
    type: typeof SET_USER_DATA
    payload: setUserDataActionPayloadType
}

export const setUserData = (email: string | null, id: number | null, login: string | null, isAuth: boolean): setUserDataActionType => ({ type: SET_USER_DATA, payload: { email, id, login, isAuth } })

type getCaptchaUrlSuccessActionPayloadType = {
    captchaUrl: string
}
type getCaptchaUrlSuccessActionType = {
    type: typeof GET_CAPTCHA_URL_SUCCESS
    payload: getCaptchaUrlSuccessActionPayloadType
}
// payload: {captchaUrl:string} можно определить так как свойство и не писать новый тип 
export const getCaptchaUrlSuccess = (captchaUrl: string): getCaptchaUrlSuccessActionType => ({ type: GET_CAPTCHA_URL_SUCCESS, payload: { captchaUrl } })


export default AuthReducer;

export let getAuthUserData = () => {
    return async (dispatch: any) => {
        let response = await authAPI.me()
        if (response.data.resultCode === 0) {
            let { email, id, login } = response.data.data;
            dispatch(setUserData(email, id, login, true));
        }
    }
}
export const login = (email: string, password: string, rememberMe: boolean, captcha: any) => {
    return async (dispatch: any) => {

        let response = await authAPI.login(email, password, rememberMe, captcha)
        if (response.data.resultCode === 0) {
            dispatch(getAuthUserData())
        } else {
            if (response.data.resultCode === 10) {
                dispatch(getCaptchaUrl())
            }
            let message = response.data.messages.length > 0 ? response.data.messages[0] : 'Somme error';
            dispatch(stopSubmit('login', { _error: message }))
        }
    }
}

export const logout = () => {
    return async (dispatch: any) => {
        let response = await authAPI.logout()
        if (response.data.resultCode === 0) {
            dispatch(setUserData(null, null, null, false));
        }
    }
}

export const getCaptchaUrl = () => {
    return async (dispatch: any) => {
        let response = await securityAPI.getCaptchaApi()
        const captchaUrl = response.data.url;
        dispatch(getCaptchaUrlSuccess(captchaUrl))
    }
}