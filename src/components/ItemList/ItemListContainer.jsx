import React from "react";
import axios from "axios";
import { addPost ,UpdateNewPostText,setUsersProfile } from '../../redux/profilePage-reducer'
import { connect } from "react-redux";
import ItemList from './ItemList';

class ItemListContainer extends React.Component {

    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/2`).then(response => {
            this.props.setUsersProfile(response.data);
        });
    }

    render() {
        return (
            <ItemList {...this.props}  profile={this.props.profile}/>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        posts: state.profilePage.PostsData,
        newPostText: state.profilePage.newPostText,
        profile:state.profilePage.profile,
    }
};
//     return {
//         addPost: () => {
//             dispatch(addPostActionCreated())
//         },
//         updateNewPostText: (PasInner) => {
//             dispatch(UpdateNewPostTextActionCreated(PasInner))
//         }
//     }
// };

export default connect(mapStateToProps, {addPost,UpdateNewPostText,setUsersProfile})(ItemListContainer);

