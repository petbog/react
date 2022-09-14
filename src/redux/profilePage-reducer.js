import { profileAPI, usersAPI } from "../API/api"

const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const ADD_POST = 'ADD-POST';
const SET_USERS_PROFILE = 'SET_USERS_PROFILE';
const SET_STATUS = 'SET_STATUS'
let initialState = {
    PostsData: [
        { id: 1, message: 'Пойду поем' },
        { id: 2, message: 'теперь поспать' },
    ],
    newPostText: '',
    profile: null,
    status: '',
}
const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST: let NewPost = {
            id: 3,
            message: state.newPostText,
        }
            return {
                ...state,
                PostsData: [...state.PostsData, (NewPost)],
                newPostText: '',
            }
        case UPDATE_NEW_POST_TEXT: {
            return {
                ...state,
                newPostText: action.NewText,
            };
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
        default:
            return state
    }
}

export const addPost = () => ({ type: 'ADD-POST' });
export const UpdateNewPostText = (PasInner) => ({ type: 'UPDATE-NEW-POST-TEXT', NewText: PasInner });
export const setUsersProfile = (profile) => ({ type: 'SET_USERS_PROFILE', profile });
export const setStatus = (status) => ({ type: 'SET_STATUS', status });

export default profileReducer;

export const getUsersProfile = (userId) => {
    return (dispatch) => {
        usersAPI.getProfile(userId)
            .then(response => {
                dispatch(setUsersProfile(response.data));
            });
    }
}
export const getStatus = (userId) => {
    return (dispatch) => {
        profileAPI.getStatus(userId)
            .then(response => {
                dispatch(setStatus(response.data))
            })
    }
}
export const updateStatus = (status) => {
    return (dispatch) => {
        profileAPI.updateStatus(status)
            .then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(setStatus(status))
                }
            })

    }
}