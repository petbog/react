import { connect } from "react-redux";
import { follow, unfollow, setCurrentPage, toggleFollowingProgress, requestUsers } from "../../redux/users-reducer";
import React from "react";
import Users from "./Users";
import Preloader from "../common/preloader/preloader";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { compose } from "redux";
import { getCurrentPage, getFolowingInProgress, getIsFetching, getPageSize, getTotalUsersCount, getUsers } from "../../redux/Users-selected";
import { getFilters } from './../../redux/Users-selected';


class UsersContainer extends React.Component {
    componentDidMount() {
        let { currentPage, pageSize,filter } = this.props
        this.props.getUsers(currentPage, pageSize, filter);

    }
    onPageChanged = (pageNumber) => {
        let { pageSize,filter } = this.props
        this.props.getUsers(pageNumber, pageSize,filter);
    }

    OnFilterChanget = (filter) => {
        let {  pageSize } = this.props
        this.props.getUsers(1, pageSize, filter);
    }
    render() {
        return <>
            {this.props.isFetching ? <Preloader /> : null}
            <Users totalUsersCount={this.props.totalUsersCount}
                pageSize={this.props.pageSize}
                currentPage={this.props.currentPage}
                unfollow={this.props.unfollow}
                follow={this.props.follow}
                onPageChanged={this.onPageChanged}
                users={this.props.users}
                toggleFollowingProgress={this.props.toggleFollowingProgress}
                folowingInProgress={this.props.folowingInProgress}
                isAuth={this.props.isAuth}
                OnFilterChanget={this.OnFilterChanget}
            />
        </>
    }
}

let mapStateToProps = (state) => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        filter: getFilters(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        folowingInProgress: getFolowingInProgress(state),
    }
};

export default compose(
    connect(mapStateToProps, { follow, unfollow, setCurrentPage, toggleFollowingProgress, getUsers:requestUsers, }),
    withAuthRedirect
)(UsersContainer)

