import { connect } from "react-redux";
import { follow, unfollow,  requestUsers } from "../../redux/users-reducer";
import React from "react";
import Users from "./Users";
import Preloader from "../common/preloader/preloader";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { compose } from "redux";
import { getCurrentPage, getFolowingInProgress, getIsFetching, getPageSize, getTotalUsersCount, getUsers } from "../../redux/Users-selected";
import { usersType } from "../../types/types";
import { AppStateType } from "../../redux/redux-store";


type mapStateToPropsType = {
    currentPage: number
    pageSize: number
    isFetching: boolean
    totalUsersCount: number
    users: Array<usersType>
    folowingInProgress: Array<number>
    // isAuth: boolean
}

type mapDispatchTopropsType = {
    follow: (userId:number) => void
    unfollow: (userId:number) => void
    requestUsers: (currentPage: number, pageSize: number) => void
    setCurrentPage: () => void
    toggleFollowingProgress: () => void
}
type ownProps = {
    pageTitle: string
}
//обьединение всех пропсов и разбитие их для понимает откуда приходят

type PropsType = mapStateToPropsType & mapDispatchTopropsType & ownProps

//requestUsers
class UsersContainer extends React.Component<PropsType> {
    componentDidMount() {
        let { currentPage, pageSize } = this.props

        this.props.requestUsers(currentPage, pageSize);

    }
    onPageChanged = (pageNumber: number) => {
        let { pageSize } = this.props
        this.props.requestUsers(pageNumber, pageSize);
    }
    render() {
        return <>
            <h1 >{this.props.pageTitle}</h1>
            {this.props.isFetching ? <Preloader /> : null}
            <Users totalUsersCount={this.props.totalUsersCount}
                pageSize={this.props.pageSize}
                currentPage={this.props.currentPage}
                unfollow={this.props.unfollow}
                follow={this.props.follow}
                onPageChanged={this.onPageChanged}
                users={this.props.users}
                // @ts-ignore
                toggleFollowingProgress={this.props.toggleFollowingProgress}
                folowingInProgress={this.props.folowingInProgress}
            // isAuth={this.props.isAuth}


            />
        </>
    }
}

let mapStateToProps = (state: AppStateType): mapStateToPropsType => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        folowingInProgress: getFolowingInProgress(state),
    }
};

export default compose(
    //TStateProps = {}, TDispatchProps = {}, TOwnProps = {}, State = DefaultState
    //<mapStateToPropsType,mapDispatchTopropsType,ownProps,PropsType>
    connect(mapStateToProps, { follow, unfollow, requestUsers, }),
    withAuthRedirect
    // @ts-ignore
)(UsersContainer)

