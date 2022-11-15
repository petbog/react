import { Dispatch } from "react";
import { ThunkAction } from "redux-thunk";
import { photosType, usersType } from "../types/types";
import { InferActionsTypes, AppStateType, BaseThunkType } from "./redux-store";
// import { updateObjectInArrau } from "../components/utils/validators/objects-helpers";
import { usersAPI } from './../API/users-api';
import { FormAction } from 'redux-form';

//константы можно не указывать т.к ts сам их сделает 

// const FOLLOW = 'FOLLOW';
// const UNFOLLOW = 'UNFOLLOW';
// const SET_USERS = 'SET_USERS';
// const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
// const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
// const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING ';
// const TOGGLE_IS_FOLOWING_IN_PROGRESS = 'TOGGLE_IS_FOLOWING_IN_PROGRESS  ';

let InitialState = {
    users: [] as Array<usersType>,
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    folowingInProgress: [] as Array<number>,

}


const UsersReducer = (state = InitialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case "FOLLOW":
            return {
                ...state,
                // users:updateObjectInArrau(state.users,action.userId,'id', {followed: true} )
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return { ...u, followed: true }
                    }
                    return u;
                })
            }

        case "UNFOLLOW":
            return {
                ...state,
                // users:updateObjectInArrau(state.users,action.userId,'id', {followed: false} )
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return { ...u, followed: false }
                    }
                    return u;
                })
            }
        case  "SET_USERS": {
            return {
                ...state, users: action.users
            }
        }
        case "SET_CURRENT_PAGE": {
            return { ...state, currentPage: action.currentPage }
        }
        case "SET_TOTAL_USERS_COUNT": {
            return { ...state, totalUsersCount: action.count }
        }
        case "TOGGLE_IS_FETCHING": {
            return { ...state, isFetching: action.isFetching }
        }
        case "TOGGLE_IS_FOLOWING_IN_PROGRESS": {
            return {
                ...state,
                folowingInProgress: action.isFetching ?
                    [...state.folowingInProgress, action.userId]
                    : state.folowingInProgress.filter(id => id !== action.userId)
            }
        }
        default:
            return state;
    }
}



//as const воспринимались как константы

export const actions = {
    followSuccess: (userId: number) => ({ type: 'FOLLOW', userId } as const),
    unfollowSuccess: (userId: number) => ({ type: 'UNFOLLOW', userId }as const),
    setUsers: (users: Array<usersType>) => ({ type: 'SET_USERS', users }as const),
    setCurrentPage: (currentPage: number) => ({ type: 'SET_CURRENT_PAGE', currentPage }as const),
    setTotalUsersCount: (totalUsersCount: number) => ({ type: 'SET_TOTAL_USERS_COUNT', count: totalUsersCount }as const),
    toggleIsFetching: (isFetching: boolean) => ({ type: 'TOGGLE_IS_FETCHING', isFetching }as const),
    toggleFollowingProgress: (isFetching: boolean, userId: number) => ({ type: 'TOGGLE_IS_FOLOWING_IN_PROGRESS', isFetching, userId }as const),
}





export default UsersReducer;

type GetStateType = () => AppStateType
type DispatchTypes = Dispatch<ActionTypes>

//типизация actions
type ActionTypes = InferActionsTypes<typeof actions>
//типизация initialState
export type InitialStateType = typeof InitialState
//типизация thunk,baseThunk находится в redux-store
type ThunkType = BaseThunkType<ActionTypes | FormAction>

export let requestUsers = (currentPage: number, pageSize: number): ThunkType => {
    return async (dispatch) => {
        dispatch(actions.toggleIsFetching(true))
        dispatch(actions.setCurrentPage(currentPage))
        let data = await usersAPI.getUsers(currentPage, pageSize);
        dispatch(actions.toggleIsFetching(false))
        dispatch(actions.setUsers(data.items));
        dispatch(actions.setTotalUsersCount(data.totalCount));

    }
}
let followUnfollowFlow = async (dispatch: DispatchTypes, userId: number, apiMethod: any, actionCreator: (userId: number) => ActionTypes) => {
    dispatch(actions.toggleFollowingProgress(true, userId));
    let response = await apiMethod(userId)
    if (response.data.resultCode === 0) {
        dispatch(actionCreator(userId));
    }
    dispatch(actions.toggleFollowingProgress(false, userId));
}


export let follow = (userId: number): ThunkType => {
    return async (dispatch) => {
        let apiMethod = usersAPI.followed.bind(usersAPI);
        let actionCreator = actions.unfollowSuccess;
        followUnfollowFlow(dispatch, userId, apiMethod, actionCreator);
    }
}
export let unfollow = (userId: number): ThunkType => {
    return async (dispatch) => {
        let apiMethod = usersAPI.unfollow.bind(usersAPI);
        let actionCreator = actions.followSuccess;
        followUnfollowFlow(dispatch, userId, apiMethod, actionCreator);
    }
}