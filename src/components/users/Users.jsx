import React from "react";
import classes from "./Users.module.css";
import user from "../../assets/images/user.png";
import { NavLink } from "react-router-dom";


let Users = (props) => {

    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);

    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
        if (i === 40) break;
    }
    return (
        <div className={classes.wrapper}>

            <div>
                {pages.map(p => {
                    return <span className={props.currentPage === p && classes.selectedPage}
                        onClick={(e) => { props.onPageChanged(p); }}> {p}</span>
                })}
            </div>
            {
                props.users.map(u => <div className={classes.wrapper_user} key={u.id}>
                    <div className={classes.img_wrapper}>
                        <NavLink to={'/*' + u.id}>
                            <img src={u.photos.small != null ? u.photos.small : user} alt="" className={classes.img} />
                        </NavLink>
                        {u.followed ?
                            <button className={classes.button} onClick={() => { props.unfollow(u.id) }} >unfollow</button> :
                            <button className={classes.button} onClick={() => { props.follow(u.id) }} >follow</button>}
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