import React from "react";
import classes from "./BestFriends.module.css";



let InnerFriends = [
    { id: 1, name: "Sacha" },
    { id: 2, name: "Andrei" },
    { id: 3, name: "Victor" },
]

let BestFriends = (props) => {
    // let NewFrends = InnerFriends
    // .map
    return (
        <div className={classes.BestFriends_box}>
            <div className={classes.BestFriends_inner}><p className={classes.BestFriends_name}>Sacha</p></div>
            <div className={classes.BestFriends_inner}><p className={classes.BestFriends_name}>Andrei</p></div>
            <div className={classes.BestFriends_inner}><p className={classes.BestFriends_name}>Victor</p></div>
        </div>
    )
}

export default BestFriends;