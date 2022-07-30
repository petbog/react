// import React from 'react';
import { addPostActionCreated, UpdateNewPostTextActionCreated } from '../../redux/profilePage-reducer'
import ItemList from './ItemList';
import { connect } from "react-redux";



// const ItemListContainer = () => {

//     return (
//         < StoreContext.Consumer>
//             {
//                 (store) => {
//                     let state = store.getState();
//                     let Pas = () => {
//                         store.dispatch(addPostActionCreated());
//                     }

//                     let onPostChange = (PasInner) => {
//                         //let action = UpdateNewPostTextActionCreated(PasInner);
//                         //props.store.dispatch(action)
//                         store.dispatch(UpdateNewPostTextActionCreated(PasInner));

//                     }

//                     return <ItemList
//                         posts={state.profilePage.PostsData}
//                         Pas={Pas}
//                         updateNewPostText={onPostChange}
//                         newPostText={state.newPostText} />
//                 }
//             }
//         </StoreContext.Consumer>
//     )
// }

let mapStateToProps = (state) => {
    return {
        posts: state.profilePage.PostsData,
        newPostText: state.newPostText,
    }
};
let mapDispatchToProps = (dispatch) => {
    return {
        Pas: () => {
            dispatch(addPostActionCreated())
        },
        updateNewPostText: (PasInner) => {
            dispatch(UpdateNewPostTextActionCreated(PasInner))
        }
    }
};

const ItemListContainer = connect(mapStateToProps, mapDispatchToProps)(ItemList);

export default ItemListContainer;