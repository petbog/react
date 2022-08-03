
import { addPostActionCreated, UpdateNewPostTextActionCreated } from '../../redux/profilePage-reducer'
import ItemList from './ItemList';
import { connect } from "react-redux";


let mapStateToProps = (state) => {
    return {
        posts: state.profilePage.PostsData,
        newPostText: state.profilePage.newPostText,
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