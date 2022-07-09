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
};


export default store;
window.store = store;