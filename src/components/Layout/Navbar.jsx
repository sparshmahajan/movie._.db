import React from 'react';
import classes from './Navbar.module.css';
import Search_bar from './Search_bar';
import Button from '../UI/Button';

const Navbar = () => {
    return (
        <nav className={classes.navbar}>
            <div className={classes.navbar_brand}>MOVIES._.DB</div>
            <Search_bar />
            {/* <ul className={classes.navbar_nav}>
                <li className={classes.navbar_item}>MOVIES</li>
                <li className={classes.navbar_item}> TV SHOWS </li>
            </ul> */}
            <Button />
        </nav>
    );
};

export default Navbar;