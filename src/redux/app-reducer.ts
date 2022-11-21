import { getAuthUserData } from "./auth-reducer";

const INITIALIZED_SUCCES = 'INITIALIZED_SUCCES';

export type InitialStateType = {
    initialized: boolean
}

let initialState: InitialStateType = {
    initialized: false
}


const appReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case INITIALIZED_SUCCES:
            return {
                ...state,
                initialized: true
            }
        default:
            return state;
    }
}

type initializedSuccesActionType = {
    type: typeof INITIALIZED_SUCCES
}

export const initializedSucces = (): initializedSuccesActionType => ({ type: INITIALIZED_SUCCES });


export const initializeApp = () => {
    return (dispatch: any) => {
        let promise = dispatch(getAuthUserData());
        Promise.all([promise])
            .then(() => {
                dispatch(initializedSucces());
            })

    }
}

export default appReducer;