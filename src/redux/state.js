let state = {
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
    },
    NavBarPage: {
        InnerFriends: [
            { id: 1, name: 'Sasha' },
            { id: 2, name: 'Andrei' },
            { id: 3, name: 'Victor' },
        ],
    }


}

export let AddPost = (postMessages) => {

    let NewPost = {
        id: 3,
        message: postMessages,
    }

    state.profilePage.PostsData.push(NewPost);
}

export default state;