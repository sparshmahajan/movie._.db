import React from 'react';
import classes from './Navbar.module.css';
import SearchBar from './SearchBar';
import Button from '../UI/Button';
import { useSelector } from 'react-redux';

const Navbar = () => {

    const isAuthenticated = useSelector(state => state.auth.isLoggedIn);


    return (
        <nav className={classes.navbar}>
            <div className={classes.navbar_brand}>MOVIES._.DB</div>
            <SearchBar />
            {!isAuthenticated && <Button title="Sign In" />}
            {isAuthenticated && <Button title="Sign Out" />}
        </nav>
    );
};

export default Navbar;