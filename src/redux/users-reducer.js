import { usersAPI } from "../API/api";
// import { updateObjectInArrau } from "../components/utils/validators/objects-helpers";

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING ';
const TOGGLE_IS_FOLOWING_IN_PROGRESS = 'TOGGLE_IS_FOLOWING_IN_PROGRESS  ';
const SET_FILTER = 'SET_FILTER';

let InitialState = {
    users: [],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    folowingInProgress: [],
    filter: {
        term: "",
        friend:null
    }

}

const UsersReducer = (state = InitialState, action) => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                // users:updateObjectInArrau(state.users,action.userId,'id', {followed: true} )
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return { ...u, followed: true }
                    }
                    return u;
                })
            }

        case UNFOLLOW:
            return {
                ...state,
                // users:updateObjectInArrau(state.users,action.userId,'id', {followed: false} )
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return { ...u, followed: false }
                    }
                    return u;
                })
            }
        case SET_USERS: {
            return {
                ...state, users: action.users
            }
        }
        case SET_CURRENT_PAGE: {
            return { ...state, currentPage: action.currentPage }
        }
        case SET_TOTAL_USERS_COUNT: {
            return { ...state, totalUsersCount: action.count }
        }
        case TOGGLE_IS_FETCHING: {
            return { ...state, isFetching: action.isFetching }
        }
        case SET_FILTER: {
            return { ...state, filter: action.payload }
        }
        case TOGGLE_IS_FOLOWING_IN_PROGRESS: {
            return {
                ...state,
                folowingInProgress: action.isFetching ?
                    [...state.folowingInProgress, action.userId]
                    : state.folowingInProgress.filter(id => id !== action.userId)
            }
        }
        default:
            return state;
    }
}

export let followSuccess = (userId) => ({ type: FOLLOW, userId });
export let unfollowSuccess = (userId) => ({ type: UNFOLLOW, userId });
export let setUsers = (users) => ({ type: SET_USERS, users });
export let setCurrentPage = (currentPage) => ({ type: SET_CURRENT_PAGE, currentPage });
export let setTotalUsersCount = (totalUsersCount) => ({ type: SET_TOTAL_USERS_COUNT, count: totalUsersCount });
export let toggleIsFetching = (isFetching) => ({ type: TOGGLE_IS_FETCHING, isFetching })
export let toggleFollowingProgress = (isFetching, userId) => ({ type: TOGGLE_IS_FOLOWING_IN_PROGRESS, isFetching, userId })
export let SetFilter = (filter) => ({ type: SET_FILTER, payload: { filter } })



export default UsersReducer;

export let requestUsers = (currentPage, pageSize, filter) => {
    return async (dispatch) => {
        dispatch(toggleIsFetching(true))
        dispatch(setCurrentPage(currentPage))
        dispatch(SetFilter(filter))

        let data = await usersAPI.getUsers(currentPage, pageSize,filter.term , filter.friend);
        dispatch(toggleIsFetching(false))
        dispatch(setUsers(data.items));
        dispatch(setTotalUsersCount(data.totalCount));

    }
}
let followUnfollowFlow = async (dispatch, userId, apiMethod, actionCreator) => {
    dispatch(toggleFollowingProgress(true, userId));
    let response = await apiMethod(userId)
    if (response.data.resultCode === 0) {
        dispatch(actionCreator(userId));
    }
    dispatch(toggleFollowingProgress(false, userId));
}


export let follow = (userId) => {
    return async (dispatch) => {
        let apiMethod = usersAPI.followed.bind(usersAPI);
        let actionCreator = unfollowSuccess;
        followUnfollowFlow(dispatch, userId, apiMethod, actionCreator);
    }
}
export let unfollow = (userId) => {
    return async (dispatch) => {
        let apiMethod = usersAPI.unfollow.bind(usersAPI);
        let actionCreator = followSuccess;
        followUnfollowFlow(dispatch, userId, apiMethod, actionCreator);
    }
}