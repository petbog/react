import React from "react";
import { addPost, UpdateNewPostText,getUsersProfile} from '../../redux/profilePage-reducer'
import { connect } from "react-redux";
import ItemList from './ItemList';
import { withRouter } from "react-router-dom";

class ItemListContainer extends React.Component {

    componentDidMount() {
        let userId = this.props.match.params.userId;
        if (!userId) {
            userId = 2;
        }
      this.props.getUsersProfile(userId);
    }

    render() {
        return (
            <ItemList {...this.props} profile={this.props.profile} />
        )
    }
}

let mapStateToProps = (state) => {
    return {
        posts: state.profilePage.PostsData,
        newPostText: state.profilePage.newPostText,
        profile: state.profilePage.profile,
        isAuth:state.auth.isAuth,
    }
};

let withUrlDataContainerComponent = withRouter(ItemListContainer)
export default connect(mapStateToProps, { addPost, UpdateNewPostText,getUsersProfile})(withUrlDataContainerComponent);
