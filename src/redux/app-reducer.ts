import { getAuthUserData } from "./auth-reducer";
import { InferActionsTypes } from "./redux-store";

const INITIALIZED_SUCCES = 'INITIALIZED_SUCCES';



let initialState = {
    initialized: false
}

export type initialStateType = typeof initialState


type ActionsType = InferActionsTypes<typeof actions>

const appReducer = (state = initialState, action: ActionsType): initialStateType => {
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


export const actions ={
    initializedSucces: () => ({ type: INITIALIZED_SUCCES }) as const 
}


export const initializeApp = () => {
    return (dispatch: any) => {
        let promise = dispatch(getAuthUserData());
        Promise.all([promise])
            .then(() => {
                dispatch(actions.initializedSucces());
            })

    }
}

export default appReducer;