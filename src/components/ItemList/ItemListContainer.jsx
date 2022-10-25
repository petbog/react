import React from "react";
import { addPost, getUsersProfile, getStatus, updateStatus,savePhoto } from '../../redux/profilePage-reducer'
import { connect } from "react-redux";
import ItemList from './ItemList';
import { withRouter } from "react-router-dom";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { compose } from "redux";

class ItemListContainer extends React.Component {

    refreshProfile() {
        let userId = this.props.match.params.userId;
        if (!userId) {
            userId = this.props.authorizedUserId;
            if (!userId) {
                this.props.history.push("/login")
            }
        }
        this.props.getUsersProfile(userId);
        this.props.getStatus(userId)
    }

    componentDidMount() {
        this.refreshProfile()
    }
    //проверка обновленных пропсов и перерисовка компоненты 
    componentDidUpdate(prevProps, prevState) {
        if (this.props.match.params.userId !== prevProps.match.params.userId) {
            this.refreshProfile()
        }
    }

    render() {
        return (
            <ItemList {...this.props}
             profile={this.props.profile} 
             status={this.props.status}
              updateStatus={this.props.updateStatus}
              isOwner={!this.props.match.params.userId}
              savePhotoSuccess={this.props.savePhotoSuccess}
              />
        )
    }
}


let mapStateToProps = (state) => {
    return {
        posts: state.profilePage.PostsData,
        newPostText: state.profilePage.newPostText,
        profile: state.profilePage.profile,
        status: state.profilePage.status,
        authorizedUserId: state.auth.id,
        isAuth: state.auth.isAuth,
    }
};
let mapDispatchToProps = (dispatch) => {
    return {
        addPost: (newPostText) => {
            dispatch(addPost(newPostText))
        }
    }
}
export default compose(
    connect(mapDispatchToProps),
    connect(mapStateToProps, { addPost, getUsersProfile, getStatus, updateStatus,savePhoto }),
    withRouter,
    withAuthRedirect
)(ItemListContainer);
