import NavBarReducer from './NavBarPage-reducer';
import messagesReducer from './messagesPage-reducer';
import profileReducer from './profilePage-reducer';


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
            newMessageBody: "",
        },
        profilePage: {
            PostsData: [
                { id: 1, message: 'Пойду поем' },
                { id: 2, message: 'теперь поспать' },
            ],
            newPostText: '',
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
        this._state.profilePage = profileReducer(this._state.profilePage, action)
        this._state.messagesPage = messagesReducer(this._state.messagesPage, action)
        this._state.NavBarReducer = NavBarReducer(this._state.NavBarReducer, action)

        this._callSubscriber(this._state)

    },
};


export default store;
window.store = store;