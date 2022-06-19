import React from 'react';
import classes from './NavBar.module.css'
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className={classes.nav}>
      <div className={classes.nav__items}> <Link to='/' className={classes.nav_items_link}>Profile</Link></div>
      <div className={classes.nav__items}><Link to='/messages' className={classes.nav_items_link}>Messages</Link></div>
      <div className={classes.nav__items}><p className={classes.nav_items_link}>News</p></div>
      <div className={classes.nav__items}><Link to='/music' className={classes.nav_items_link}>Music</Link></div>
      <div className={classes.nav__items}><p className={classes.nav_items_link}>Setting</p></div>
    </nav>
  )
}

export default NavBar;