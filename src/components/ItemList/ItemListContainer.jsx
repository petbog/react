import React from "react";
import axios from "axios";
import { addPost, UpdateNewPostText, setUsersProfile } from '../../redux/profilePage-reducer'
import { connect } from "react-redux";
import ItemList from './ItemList';
import { withRouter } from "react-router-dom";

class ItemListContainer extends React.Component {

    componentDidMount() {
        let userId = this.props.match.params.userId;
        if (!userId) {
            userId = 2;
        }
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/ ` + userId).then(response => {
            this.props.setUsersProfile(response.data);
        });
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

let withUrlDataContainerComponent = withRouter(ItemListContainer)
export default connect(mapStateToProps, { addPost, UpdateNewPostText, setUsersProfile })(withUrlDataContainerComponent);
