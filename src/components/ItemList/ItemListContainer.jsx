import React from 'react';
import { addPostActionCreated, UpdateNewPostTextActionCreated } from '../../redux/profilePage-reducer'
import ItemList from './ItemList';



const ItemListContainer = (props) => {
    let state = props.store.getState();
    let Pas = () => {
        props.store.dispatch(addPostActionCreated());
    }

    let onPostChange = (PasInner) => {
        //let action = UpdateNewPostTextActionCreated(PasInner);
        //props.store.dispatch(action)
        props.store.dispatch(UpdateNewPostTextActionCreated(PasInner));

    }

    return (
        <ItemList
            posts={state.profilePage.PostsData}
            Pas={Pas}
            updateNewPostText={onPostChange}
            newPostText={state.newPostText} />
    )
}


export default ItemListContainer;