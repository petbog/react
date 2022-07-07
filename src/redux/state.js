let rerenderEntireTree = () => {
    console.log('state is changed');
}

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
        newPostText: 'new text',
    },
    NavBarPage: {
        InnerFriends: [
            { id: 1, name: 'Sasha' },
            { id: 2, name: 'Andrei' },
            { id: 3, name: 'Victor' },
        ],
    }


}

export let AddPost = () => {

    let NewPost = {
        id: 3,
        message: state.profilePage.newPostText,
    }

    state.profilePage.PostsData.push(NewPost);
    rerenderEntireTree(state)
}

export let updateNewPostText = (NewText) => {
    state.profilePage.newPostText = NewText
    rerenderEntireTree(state)
}


export const subscribe = (observer) => {
    rerenderEntireTree = observer;
}

export default state;