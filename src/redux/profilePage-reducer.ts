import { ThunkAction } from "redux-thunk";
import { profileAPI, usersAPI } from "../API/api"
import { photosType, PostsDataType, profileType } from "../types/types";
import { AppStateType } from "./redux-store";

const ADD_POST = 'ADD_POST';
const SET_USERS_PROFILE = 'SET_USERS_PROFILE';
const SET_STATUS = 'SET_STATUS';
const DELETE_POST = 'DELETE_POST';
const SAVE_PHOTO_SUCCESS = 'SAVE_PHOTO_SUCCESS';


let initialState = {
    PostsData: [
        { id: 1, message: 'Пойду поем' },
        { id: 2, message: 'теперь поспать' },
    ] as Array<PostsDataType>,
    profile: null as profileType | null,
    status: '',
    newPostText:'',
}

export type initialStateType = typeof initialState

const profileReducer = (state = initialState, action: actionType):initialStateType => {
    switch (action.type) {
        case ADD_POST: let NewPost = {
            id: 3,
            message: action.newPostText,
        }
            return {
                ...state,
                PostsData: [...state.PostsData, (NewPost)],
                newPostText: '',
            }
        case SET_USERS_PROFILE: {
            return {
                ...state, profile: action.profile
            }
        }
        case SET_STATUS: {
            return {
                ...state, status: action.status
            }
        }
        case DELETE_POST: {
            return {
                ...state, PostsData: state.PostsData.filter(p => p.id !== action.postId)
            }
        }
        case SAVE_PHOTO_SUCCESS: {
            return {
                ...state, profile: { ...state.profile, photos: action.photos } as profileType
            }
        }
        default:
            return state
    }
} 


type actionType = addPostActionType | setUsersProfileActionType | setStatusActionType | deletePostActionType | savePhotoSuccessActionType

type addPostActionType={
    type:typeof ADD_POST
    newPostText:string
}

export const addPost = (newPostText:string):addPostActionType => ({ type: ADD_POST, newPostText });

type setUsersProfileActionType={
    type:typeof SET_USERS_PROFILE
    profile:profileType
}
export const setUsersProfile = (profile:profileType):setUsersProfileActionType => ({ type: SET_USERS_PROFILE, profile });
type setStatusActionType={
    type:typeof SET_STATUS
    status:string
}
export const setStatus = (status:string):setStatusActionType => ({ type: SET_STATUS, status });
type deletePostActionType ={
    type:typeof DELETE_POST
    postId:number
}
export const deletePost = (postId:number):deletePostActionType => ({ type: DELETE_POST, postId });
type savePhotoSuccessActionType={
    type:typeof SAVE_PHOTO_SUCCESS
    photos:photosType
}
export const savePhotoSuccess = (photos:photosType):savePhotoSuccessActionType => ({ type: SAVE_PHOTO_SUCCESS, photos });

type ThunkType = ThunkAction<Promise<void>, AppStateType , unknown, actionType>

export const getUsersProfile = (userId:number):ThunkType => async (dispatch) => {
    let response = await usersAPI.getProfile(userId);
    dispatch(setUsersProfile(response.data));
}
export const getStatus = (userId:number):ThunkType => async (dispatch) => {
    let response = await profileAPI.getStatus(userId);
    dispatch(setStatus(response.data));
}
export const updateStatus = (status:string):ThunkType => async (dispatch) => {
    let response = await profileAPI.updateStatus(status);
    if (response.data.resultCode === 0) {
        dispatch(setStatus(status))
    }
}

export const savePhoto = (file:any):ThunkType => async (dispatch) => {
    let response = await profileAPI.savePhoto(file);
    if (response.data.resultCode === 0) {
        dispatch(savePhotoSuccess(response.data.data.photos))
    }
}

export const saveProfile = (profile:profileType):ThunkType => async (dispatch, getState: any) => {
    const userId = getState().auth.id;
    let response = await profileAPI.saveProfile(profile);
    if (response.data.resultCode === 0) {
        dispatch(getUsersProfile(userId))
    }
}

export default profileReducer;