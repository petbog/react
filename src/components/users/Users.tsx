import React from "react";
// @ts-ignore
import classes from "./Users.module.css";
// @ts-ignore
import user from "../../assets/images/user.png";
// @ts-ignore
import { NavLink } from "react-router-dom";
import Paginator from "../common/Paginator/Paginator";
import { usersType } from "../../types/types";


type propsType = {
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    totalUsersCount: number
    pageSize: number
    users: Array<usersType>
    folowingInProgress: Array<number>
    follow: (userId:number) => void
    unfollow: (userId:number) => void


}

let Users: React.FC<propsType> = ({ currentPage, onPageChanged, totalUsersCount, pageSize, users, ...props }) => {
    return (
        <div className={classes.wrapper}>
            <Paginator currentPage={currentPage}
                onPageChanged={onPageChanged}
                pageSize={pageSize}
                totalUsersCount={totalUsersCount} />

            {users.map(u => <div key={u.id} className={classes.wrapper_user} >
                <div className={classes.img_wrapper}>
                    <NavLink to={'/ItemList/' + u.id}>
                        <img src={u.photos.small != null ? u.photos.small : user} alt="" className={classes.img} />
                    </NavLink>
                    {u.followed ?
                        <button disabled={props.folowingInProgress.some(id => id === u.id)} className={classes.button} onClick={() => {
                            // @ts-ignore
                            props.follow(u.id);
                        }} >unfollow</button> :
                        <button disabled={props.folowingInProgress.some(id => id === u.id)} className={classes.button} onClick={() => {
                            // @ts-ignore
                            props.unfollow(u.id);
                        }} >follow</button>}
                </div>
                <div className={classes.info_wrapper}>
                    <div className={classes.user}>
                        <p className={classes.user_name}>{u.name}</p>
                        <p className={classes.user_status}>{u.status}</p>
                    </div>
                    <div className={classes.location}>
                    </div>
                </div>
            </div>)
            }
        </div>
    )
}

export default Users