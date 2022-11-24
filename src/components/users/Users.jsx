import React from "react";
import classes from "./Users.module.css";
import user from "../../assets/images/user.png";
import { NavLink } from "react-router-dom";
import Paginator from "../common/Paginator/Paginator";
import UsersSearchForm from './UsersSearchFormik';


let Users = ({ currentPage, onPageChanged, totalUsersCount, pageSize, users, ...props }) => {

    // let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);

    // let pages = [];
    // for (let i = 1; i <= pagesCount; i++) {
    //     pages.push(i);
    //     if (i === 40) break;
    // }

    //вся логика перешла в Paginator

    return (
        <div className={classes.wrapper}>
            <div className="">
                <UsersSearchForm OnFilterChanget={props.OnFilterChanget} />
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
                            <button disabled={props.folowingInProgress.some(id => id === u.id)} className={classes.button} onClick={() => {
                                props.follow(u.id);
                            }} >unfollow</button> :
                            <button disabled={props.folowingInProgress.some(id => id === u.id)} className={classes.button} onClick={() => {
                                props.unfollow(u.id);
                            }} >follow</button>}
                    </div>
                    <div className={classes.info_wrapper}>
                        <div className={classes.user}>
                            <p className={classes.user_name}>{u.name}</p>
                            <p className={classes.user_status}>{u.status}</p>
                        </div>
                        <div className={classes.location}>
                            {/* <p className={classes.user_city}>{u.location.city}</p>
                        <p className={classes.user_country}>{u.location.country}</p> */}
                        </div>
                    </div>
                </div>)
            }
        </div>
    )
}




export default Users