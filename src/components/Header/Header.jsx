import React from 'react';
import classes from './Header.module.css';
import {NavLink} from 'react-router-dom'


const Header = (props) => {
    return (
        <header className={classes.header}>
            <div className=""></div>
            <div className={classes.login}>
                {props.isAuth?<div>{props.login}  <button onClick={props.logout}> Log out</button></div>   :<NavLink to ={'/login'}>Login</NavLink>}
            </div>
        </header>
    )
}

export default Header;