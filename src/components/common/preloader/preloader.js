import React from "react";
import loader from "../../../assets/images/loader.gif";
import classes from '../../users/Users.module.css'



let Preloader =() =>{
    return(
        <img className={classes.loader_img} src={loader} alt='' />
    )
}

export default Preloader;