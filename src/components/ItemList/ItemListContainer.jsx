import React from "react";
import { addPost, getUsersProfile,getStatus,updateStatus } from '../../redux/profilePage-reducer'
import { connect } from "react-redux";
import ItemList from './ItemList';
import { withRouter } from "react-router-dom";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { compose } from "redux";

class ItemListContainer extends React.Component {

    componentDidMount() {
        let userId = this.props.match.params.userId;
        if (!userId) {
            userId = 25673;
        }
        this.props.getUsersProfile(userId);
        this.props.getStatus(userId)
    }

    render() {
        return (
            <ItemList {...this.props} profile={this.props.profile} status={this.props.status} updateStatus={this.props.updateStatus}/>
        )
    }
}


let mapStateToProps = (state) => {
    return {
        posts: state.profilePage.PostsData,
        newPostText: state.profilePage.newPostText,
        profile: state.profilePage.profile,
        status:state.profilePage.status,
    }
};
let mapDispatchToProps = (dispatch)=>{
return{
    addPost:(newPostText)=>{
        dispatch(addPost(newPostText))
    }
}
}
export default compose(
    connect(mapDispatchToProps),
    connect(mapStateToProps,{ addPost, getUsersProfile,getStatus,updateStatus }),
    withRouter,
    withAuthRedirect
)(ItemListContainer);
