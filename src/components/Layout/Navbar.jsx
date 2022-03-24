import React from 'react';
import classes from './Navbar.module.css';
import SearchBar from './SearchBar';
import Button from '../UI/Button';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {

    const isAuthenticated = useSelector(state => state.auth.isLoggedIn);
    const navigate = useNavigate();

    const moveToHome = () => {
        navigate('/');
    }

    return (
        <nav className={classes.navbar}>
            <div className={classes.navbar_brand} onClick={moveToHome} >MOVIES._.DB</div>
            <SearchBar />
            <Button title='My Watchlist' />
            {!isAuthenticated && <Button title="Sign In" />}
            {isAuthenticated && <Button title="Sign Out" />}
        </nav>
    );
};

export default Navbar;