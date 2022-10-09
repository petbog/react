import { profileAPI, usersAPI } from "../API/api"

const ADD_POST = 'ADD-POST';
const SET_USERS_PROFILE = 'SET_USERS_PROFILE';
const SET_STATUS = 'SET_STATUS';
const DELETE_POST = 'DELETE_POST';

let initialState = {
    PostsData: [
        { id: 1, message: 'Пойду поем' },
        { id: 2, message: 'теперь поспать' },
    ],
    profile: null,
    status: '',
}
const profileReducer = (state = initialState, action) => {
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
                ...state, PostsData: state.PostsData.filter(p => p.id != action.postId)
            }
        }
        default:
            return state
    }
}

export const addPost = (newPostText) => ({ type: 'ADD-POST', newPostText });
export const setUsersProfile = (profile) => ({ type: 'SET_USERS_PROFILE', profile });
export const setStatus = (status) => ({ type: 'SET_STATUS', status });
export const deletePost = (postId) => ({ type: 'DELETE_POST', postId });

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