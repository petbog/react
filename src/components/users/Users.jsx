import React, { useEffect } from "react";
import classes from "./Users.module.css";
import user from "../../assets/images/user.png";
import { NavLink } from "react-router-dom";
import Paginator from "../common/Paginator/Paginator";
import UsersSearchForm from './UsersSearchFormik';
import { useDispatch, useSelector } from "react-redux";
import { getCurrentPage, getFilters, getFolowingInProgress, getPageSize, getTotalUsersCount, getUsers } from "../../redux/Users-selected";
import { follow, requestUsers, unfollow } from "../../redux/users-reducer";


export const Users = React.memo((props) => {

    const currentPage = useSelector(getCurrentPage)
    const totalUsersCount = useSelector(getTotalUsersCount)
    const pageSize = useSelector(getPageSize)
    const users = useSelector(getUsers)
    const filter = useSelector(getFilters)
    const folowingInProgress = useSelector(getFolowingInProgress)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(requestUsers(currentPage, pageSize, filter))
    },[])
    const onPageChanged = (pageNumber) => {
        dispatch(requestUsers(pageNumber, pageSize, filter))
    }
    const OnFilterChanget = (filter) => {
        dispatch(requestUsers(1, pageSize, filter))
    }
    const _follow = (userId) => {
        dispatch(follow(userId))
    }
    const _unfollow = (userId) => {
        dispatch(unfollow(userId))
    }

    return (
        <div className={classes.wrapper}>
            <div className="">
                <UsersSearchForm OnFilterChanget={OnFilterChanget} />
            </div>

            <Paginator currentPage={currentPage}
                onPageChanged={onPageChanged}
                pageSize={pageSize}
                totalUsersCount={totalUsersCount} />

            {


                users.map(u => <div className={classes.wrapper_user} key={u.id}>
                    <div className={classes.img_wrapper}>
                        <NavLink to={'/ItemList/' + u.id}>
                            <img src={u.photos.small != null ? u.photos.small : user} alt="" className={classes.img} />
                        </NavLink>
                        {u.followed ?
                            <button disabled={folowingInProgress.some(id => id === u.id)} className={classes.button} onClick={() => {
                                _follow(u.id);
                            }} >unfollow</button> :
                            <button disabled={folowingInProgress.some(id => id === u.id)} className={classes.button} onClick={() => {
                                _unfollow(u.id);
                            }} >follow</button>}
                    </div>
                    <div className={classes.info_wrapper}>
                        <div className={classes.user}>
                            <p className={classes.user_name}>{u.name}</p>
                            <p className={classes.user_status}>{u.status}</p>
                        </div>
                    </div>
                </div>)
            }
        </div>
    )
}
)