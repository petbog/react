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
                ...action.data,
                isAuth: true,
            }
        default:
            return state
    }
}

export const setUserData = (email, id, login) => ({ type: SET_USER_DATA, data: { email, id, login } })


export default AuthReducer;

export let getAuthUserData = () => {
    return (dispatch) => {
        authAPI.me()
        .then(response => {
                if (response.data.resultCode === 0) {
                    let { email, id, login } = response.data.data;
                    dispatch(setUserData(email, id, login));
                }
            })
    }
}