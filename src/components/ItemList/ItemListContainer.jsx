import React from "react";
import { addPost, UpdateNewPostText, getUsersProfile } from '../../redux/profilePage-reducer'
import { connect } from "react-redux";
import ItemList from './ItemList';
import { withRouter } from "react-router-dom";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { compose } from "redux";

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
    }
};
export default compose(
    connect(mapStateToProps, { addPost, UpdateNewPostText, getUsersProfile }),
    withRouter,
    withAuthRedirect
)(ItemListContainer);
