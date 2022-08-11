import React from "react";
// import classes from "./Users.module.css"
let Users = (props) => {
    return <div>
        {
            props.users.map(u => <div key={u.id}>
                <span>
                    <div className="">
                        <img src="" alt="" className="" />
                    </div>
                    <div className="">
                        {u.followed ?
                            <button onClick={() => { props.unfollow(u.id) }} className="">Unfollow</button>
                            : <button onClick={() => { props.follow(u.id) }} className="">Follow</button>}

                    </div>
                </span>

                <span>
                    <span className="">
                        <div className="">{u.fullname}</div>
                        <div className="">{u.status}</div>
                    </span>
                    <span className="">
                        <div className="">{u.location.country}</div>
                        <div className="">{u.location.city}</div>
                    </span>
                </span>
            </div>)
        }
    </div>

}

export default Users;