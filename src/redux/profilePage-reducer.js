const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const ADD_POST = 'ADD-POST';
let initialState = {
    PostsData: [
        { id: 1, message: 'Пойду поем' },
        { id: 2, message: 'теперь поспать' },
    ],
    newPostText: '',
}
const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST: let NewPost = {
            id: 3,
            message: state.newPostText,
        }
            state.PostsData.push(NewPost);
            return state
        case UPDATE_NEW_POST_TEXT:
            state.newPostText = action.NewText
            return state
        default:
            return state
    }
}

export const addPostActionCreated = () => ({ type: 'ADD-POST' });
export const UpdateNewPostTextActionCreated = (PasInner) =>
    ({ type: 'UPDATE-NEW-POST-TEXT', NewText: PasInner });

export default profileReducer;