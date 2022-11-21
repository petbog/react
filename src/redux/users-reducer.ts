import { Dispatch } from "react";
import { ThunkAction } from "redux-thunk";
import { usersAPI } from "../API/api";
import { photosType, usersType } from "../types/types";
import { AppStateType } from "./redux-store";
// import { updateObjectInArrau } from "../components/utils/validators/objects-helpers";

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING ';
const TOGGLE_IS_FOLOWING_IN_PROGRESS = 'TOGGLE_IS_FOLOWING_IN_PROGRESS  ';

let InitialState = {
    users: [] as Array<usersType>,
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    folowingInProgress: [] as Array<number>,

}

export type InitialStateType = typeof InitialState

const UsersReducer = (state = InitialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                // users:updateObjectInArrau(state.users,action.userId,'id', {followed: true} )
                users: state.users.map(u => {
                    if (u.id === action.userId  ) {
                        return { ...u, followed: true }
                    }
                    return u;
                })
            }

        case UNFOLLOW:
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
        case SET_USERS: {
            return {
                ...state, users: action.users
            }
        }
        case SET_CURRENT_PAGE: {
            return { ...state, currentPage: action.currentPage }
        }
        case SET_TOTAL_USERS_COUNT: {
            return { ...state, totalUsersCount: action.count }
        }
        case TOGGLE_IS_FETCHING: {
            return { ...state, isFetching: action.isFetching }
        }
        case TOGGLE_IS_FOLOWING_IN_PROGRESS: {
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

type ActionTypes =  followSuccessType | unfollowSuccessType | setUsersType | setCurrentPageType |  setTotalUsersCountType | toggleIsFetchingType | toggleFollowingProgressType
type followSuccessType = {
    type: typeof FOLLOW
    userId: number
}
export let followSuccess = (userId: number): followSuccessType => ({ type: FOLLOW, userId });
type unfollowSuccessType={
    type:typeof UNFOLLOW
    userId:number
}
export let unfollowSuccess = (userId:number):unfollowSuccessType => ({ type: UNFOLLOW, userId });
type setUsersType={
    type:typeof SET_USERS
    users:Array<usersType>
}
export let setUsers = (users:Array<usersType>):setUsersType => ({ type: SET_USERS, users });
type setCurrentPageType={
    type:typeof SET_CURRENT_PAGE
    currentPage:number
}
export let setCurrentPage = (currentPage:number):setCurrentPageType => ({ type: SET_CURRENT_PAGE, currentPage });

type setTotalUsersCountType={
    type:typeof SET_TOTAL_USERS_COUNT
    count: number
}
export let setTotalUsersCount = (totalUsersCount:number):setTotalUsersCountType => ({ type: SET_TOTAL_USERS_COUNT, count: totalUsersCount });
type toggleIsFetchingType={
    type:typeof TOGGLE_IS_FETCHING
    isFetching:boolean
}
export let toggleIsFetching = (isFetching:boolean):toggleIsFetchingType => ({ type: TOGGLE_IS_FETCHING, isFetching })
type toggleFollowingProgressType={
    type:typeof TOGGLE_IS_FOLOWING_IN_PROGRESS
    isFetching:boolean
    userId:number
}
export let toggleFollowingProgress = (isFetching:boolean, userId:number):toggleFollowingProgressType => ({ type: TOGGLE_IS_FOLOWING_IN_PROGRESS, isFetching, userId })



export default UsersReducer;

type GetStateType = ()=> AppStateType
type DispatchTypes = Dispatch<ActionTypes>
type ThunkType = ThunkAction<Promise<void>, AppStateType , unknown, ActionTypes>


export let requestUsers = (currentPage: number, pageSize: number):ThunkType => {
    return async (dispatch) => {
        dispatch(toggleIsFetching(true))
        dispatch(setCurrentPage(currentPage))
        let data = await usersAPI.getUsers(currentPage, pageSize);
        dispatch(toggleIsFetching(false))
        dispatch(setUsers(data.items));
        dispatch(setTotalUsersCount(data.totalCount));

    }
}
let followUnfollowFlow = async (dispatch: DispatchTypes, userId: number, apiMethod:any, actionCreator: (userId:number)=> unfollowSuccessType | followSuccessType ) => {
    dispatch(toggleFollowingProgress(true, userId));
    let response = await apiMethod(userId)
    if (response.data.resultCode === 0) {
        dispatch(actionCreator(userId));
    }
    dispatch(toggleFollowingProgress(false, userId));
}


export let follow = (userId: number):ThunkType => {
    return async (dispatch) => {
        let apiMethod = usersAPI.followed.bind(usersAPI);
        let actionCreator = unfollowSuccess;
        followUnfollowFlow(dispatch, userId, apiMethod, actionCreator);
    }
}
export let unfollow = (userId: number):ThunkType => {
    return async (dispatch) => {
        let apiMethod = usersAPI.unfollow.bind(usersAPI);
        let actionCreator = followSuccess;
        followUnfollowFlow(dispatch, userId, apiMethod, actionCreator);
    }
}