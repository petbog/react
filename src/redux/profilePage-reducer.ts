
import { FormAction } from "redux-form";
import { ThunkAction } from "redux-thunk";
import { profileAPI } from "../API/profile-api";
import { photosType, PostsDataType, profileType } from "../types/types";
import { AppStateType, BaseThunkType } from "./redux-store";
import { InferActionsTypes } from "./redux-store";

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
    newPostText: '',
}

export type initialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType | FormAction>

const profileReducer = (state = initialState, action: ActionsType): initialStateType => {
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

export const actions = {
    setUsersProfile :(profile: profileType) => ({ type: SET_USERS_PROFILE, profile }as const),
    setStatus : (status: string) => ({ type: SET_STATUS, status }as const),
    deletePost : (postId: number) => ({ type: DELETE_POST, postId }as const),
    savePhotoSuccess : (photos: photosType) => ({ type: SAVE_PHOTO_SUCCESS, photos }as const),
    addPost:(newPostText: string) => ({ type: ADD_POST, newPostText }as const),
}




export const getUsersProfile = (userId: number): ThunkType => async (dispatch) => {
    let data = await profileAPI.getProfile(userId);
    dispatch(actions.setUsersProfile(data));
}
export const getStatus = (userId: number): ThunkType => async (dispatch) => {
    let data = await profileAPI.getStatus(userId);
    dispatch(actions.setStatus(data));
}
export const updateStatus = (status: string): ThunkType => async (dispatch) => {
    let data = await profileAPI.updateStatus(status);
    if (data.resultCode === 0) {
        dispatch(actions.setStatus(status))
    }
}

export const savePhoto = (file: File): ThunkType => async (dispatch) => {
    let data = await profileAPI.savePhoto(file);
    if (data.resultCode === 0) {
        dispatch(actions.savePhotoSuccess(data.data.photos))
    }
}

export const saveProfile = (profile: profileType): ThunkType => async (dispatch, getState) => {
    const userId = getState().auth.id;
    let data = await profileAPI.saveProfile(profile);
    if (data.resultCode === 0) {
        if (userId != null){
              dispatch(getUsersProfile(userId))
        }else{
            throw new Error('userId can`t be null')
        }
      
    }
}

export default profileReducer;