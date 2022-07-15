const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const ADD_POST = 'ADD-POST';

let store = {
    _state: {
        messagesPage: {
            DialogsData: [
                { id: 1, name: 'Андрей' },
                { id: 2, name: 'Иван' },
                { id: 3, name: 'Костя' },
                { id: 4, name: 'Настя' },
                { id: 5, name: 'Вероника' },
            ],
            MessagesData: [
                { id: 1, message: 'Привет' },
                { id: 2, message: 'Как дела?' },
                { id: 3, message: 'Что делаешь?' },
            ],
        },
        profilePage: {
            PostsData: [
                { id: 1, message: 'Пойду поем' },
                { id: 2, message: 'теперь поспать' },
            ],
            newPostText: 'new text',
        },
        NavBarPage: {
            InnerFriends: [
                { id: 1, name: 'Sasha' },
                { id: 2, name: 'Andrei' },
                { id: 3, name: 'Victor' },
            ],
        }
    },
    getState() {
        return this._state;
    },
    _callSubscriber() {
        console.log('state is changed');
    },
    AddPost() {
        let NewPost = {
            id: 3,
            message: this._state.profilePage.newPostText,
        }
        this._state.profilePage.PostsData.push(NewPost);
        this._callSubscriber(this._state)
    },
    updateNewPostText(NewText) {
        this._state.profilePage.newPostText = NewText
        this._callSubscriber(this._state)
    },
    subscribe(observer) {
        this._callSubscriber = observer;
    },
    dispatch(action) { 
        if (action.type === ADD_POST) {
            let NewPost = {
                id: 3,
                message: this._state.profilePage.newPostText,
            }
            this._state.profilePage.PostsData.push(NewPost);
            this._callSubscriber(this._state)
        } else if (action.type === UPDATE_NEW_POST_TEXT) {
            this._state.profilePage.newPostText = action.NewText
            this._callSubscriber(this._state)
        }
    },
};
export const addPostActionCreated =() =>{
    return{
         type: 'ADD-POST' 
    }
}
export const UpdateNewPostTextActionCreated =(PasInner) =>{
    return{
        type: 'UPDATE-NEW-POST-TEXT', NewText: PasInner 
    }
}



export default store;
window.store = store;