import axios from "axios";
import React from "react";
import classes from "./Users.module.css";
import user from "../../assets/images/user.png";

class Users extends React.Component {

    componentDidMount(){
                    axios.get("https://social-network.samuraijs.com/api/1.0/users").then(response => {
                this.props.setUsers(response.data.items)
            });
    }
    render() {
        return <div className={classes.wrapper}>
            {
                this.props.users.map(u => <div className={classes.wrapper_user} key={u.id}>
                    <div className={classes.img_wrapper}>
                        <img src={u.photos.small != null ? u.photos.small : user} alt="" className={classes.img} />
                        {u.followed ?
                            <button className={classes.button} onClick={() => { this.props.unfollow(u.id) }} >unfollow</button> :
                            <button className={classes.button} onClick={() => { this.props.follow(u.id) }} >follow</button>}
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
    }
}

export default Users;