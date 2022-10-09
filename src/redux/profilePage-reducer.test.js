import profileReducer, { addPost, deletePost } from "./profilePage-reducer";

let initialState = {
    PostsData: [
        { id: 1, message: 'Пойду поем' },
        { id: 2, message: 'теперь поспать' },
    ],
};


test('new post should be added', () => {
    //1.test start data
    let action = addPost('newPostText');

    //2.action
    let newState = profileReducer(initialState, action)

    //3.expectation
    expect( newState.PostsData.length).toBe(3);

});

test('message of new post shout be correct', () => {
    //1.test start data
    let action = addPost('newPostText');

    //2.action
    let newState = profileReducer(initialState, action)

    //3.expectation
    expect( newState.PostsData[2].message).toBe('newPostText');

});

test('after deleting length of messages should be decrement', () => {
    //1.test start data
    let action = deletePost(3);

    //2.action
    let newState = profileReducer(initialState, action)

    //3.expectation
    expect( newState.PostsData.length).toBe(2);

});



