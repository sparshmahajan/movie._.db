import React from 'react';
import classes from './Navbar.module.css';
import SearchBar from './SearchBar';
import Button from '../UI/Button';

const Navbar = () => {
    return (
        <nav className={classes.navbar}>
            <div className={classes.navbar_brand}>MOVIES._.DB</div>
            <SearchBar />
            <Button />
        </nav>
    );
};

export default Navbar;