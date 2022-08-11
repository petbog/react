import React from "react";
import classes from "./Users.module.css"
let Users = (props) => {
    if (props.users.length === 0) {
        props.setUsers([{ id: 1, followed: true, fullname: 'Dmitry', status: 'bla bla', location: { city: 'Minsk', country: 'Belarus' } },
        { id: 2, followed: true, fullname: 'Andrei', status: 'bla bla', location: { city: 'Moscow', country: 'Russia' } },
        { id: 3, followed: false, fullname: 'Lena', status: 'bla bla', location: { city: 'Rostov-on-don', country: 'Russia' } },
        { id: 4, followed: false, fullname: 'Sveta', status: 'bla bla', location: { city: 'Krasnodar', country: 'Russia' } }])
    }
    return <div className={classes.wrapper}>
        {
            props.users.map(u => <div className={classes.wrapper_user}  key={u.id}>
                <div className={classes.img_wrapper}>
                    <img src="" alt="" className="" />
                    {u.followed ?
                        <button className={classes.button} onClick={() => { props.unfollow(u.id) }} >unfollow</button> :
                        <button className={classes.button} onClick={() => { props.follow(u.id) }} >follow</button>}
                </div>
                <div className={classes.info_wrapper}>
                    <div className={classes.user}>
                        <p className={classes.user_name}>{u.fullname}</p>
                        <p className={classes.user_status}>{u.status}</p>
                    </div>
                    <div className={classes.location}>
                        <p className={classes.user_city}>{u.location.city}</p>
                        <p className={classes.user_country}>{u.location.country}</p>
                    </div>
                </div>
            </div>)
        }
    </div>

}

export default Users;