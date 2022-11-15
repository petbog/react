import { FormAction, stopSubmit } from 'redux-form';
import { ResultCodesCaptcha, ResultCodesEnum } from '../API/api';
import { ThunkAction } from 'redux-thunk';
import { AppStateType, BaseThunkType, InferActionsTypes } from './redux-store';
import { authAPI } from './../API/auth-api';
import { securityAPI } from '../API/security-api';

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
    email: null as string | null,
    id: null as number | null,
    login: null as string | null,
    isAuth: false,
    captchaUrl: null as string | null,
};



const AuthReducer = (state = initialState, action: actionsType): initialStateType => {
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

export const actions = {
    setUserData: (email: string | null, id: number | null, login: string | null, isAuth: boolean) => ({ type: SET_USER_DATA, payload: { email, id, login, isAuth } }) as const,

    getCaptchaUrlSuccess: (captchaUrl: string) => ({ type: GET_CAPTCHA_URL_SUCCESS, payload: { captchaUrl } }) as const
}





export default AuthReducer;


export let getAuthUserData = (): ThunkType => {
    return async (dispatch) => {
        let meData = await authAPI.me()
        if (meData.resultCode === ResultCodesEnum.success) {
            let { email, id, login } = meData.data;
            dispatch(actions.setUserData(email, id, login, true));
        }
    }
}
export const login = (email: string, password: string, rememberMe: boolean, captcha: string): ThunkType => {
    return async (dispatch) => {

        let LoginData = await authAPI.login(email, password, rememberMe, captcha)
        if (LoginData.resultCode === 0) {
            dispatch(getAuthUserData())
        } else {
            if (LoginData.resultCode === ResultCodesCaptcha.error) {
                dispatch(getCaptchaUrl())
            }
            let message = LoginData.messages.length > 0 ? LoginData.messages[0] : 'Somme error';
            dispatch(stopSubmit('login', { _error: message }))
        }
    }
}

export const logout = (): ThunkType => {
    return async (dispatch) => {
        let LogoutData = await authAPI.logout()
        if (LogoutData.resultCode === ResultCodesEnum.success) {
            dispatch(actions.setUserData(null, null, null, false));
        }
    }
}

export const getCaptchaUrl = (): ThunkType => {
    return async (dispatch) => {
        let data = await securityAPI.getCaptchaApi()
        const captchaUrl = data.url;
        dispatch(actions.getCaptchaUrlSuccess(captchaUrl))
    }
}


export type initialStateType = typeof initialState
type actionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<actionsType | FormAction>
// type ThunkType = BaseThunkType<actionsType | ReturnType< typeof stopSubmit >>