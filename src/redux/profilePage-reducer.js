const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const ADD_POST = 'ADD-POST';
const SET_USERS_PROFILE = 'SET_USERS_PROFILE';
let initialState = {
    PostsData: [
        { id: 1, message: 'Пойду поем' },
        { id: 2, message: 'теперь поспать' },
    ],
    newPostText: '',
    profile: null,
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
        default:
            return state
    }
}

export const addPost = () => ({ type: 'ADD-POST' });
export const UpdateNewPostText = (PasInner) =>
    ({ type: 'UPDATE-NEW-POST-TEXT', NewText: PasInner });
export const setUsersProfile = (profile) => ({ type: 'SET_USERS_PROFILE', profile });

export default profileReducer;