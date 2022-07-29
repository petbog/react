import React from 'react';
import { addPostActionCreated, UpdateNewPostTextActionCreated } from '../../redux/profilePage-reducer'
import StoreContext from '../../StoreContext';
import ItemList from './ItemList';



const ItemListContainer = () => {

    return (
        < StoreContext.Consumer>
            {
                (store) => {
                    let state = store.getState();
                    let Pas = () => {
                        store.dispatch(addPostActionCreated());
                    }

                    let onPostChange = (PasInner) => {
                        //let action = UpdateNewPostTextActionCreated(PasInner);
                        //props.store.dispatch(action)
                        store.dispatch(UpdateNewPostTextActionCreated(PasInner));

                    }

                    return <ItemList
                        posts={state.profilePage.PostsData}
                        Pas={Pas}
                        updateNewPostText={onPostChange}
                        newPostText={state.newPostText} />
                }
            }
        </StoreContext.Consumer>
    )
}


export default ItemListContainer;