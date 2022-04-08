import classes from './Navbar.module.css';
import SearchBar from './SearchBar';
import Button from '../UI/Button';
import Dropdown from '../../assets/images/Dropdown.svg';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Navbar = () => {

    const isAuthenticated = useSelector(state => state.auth.isLoggedIn);
    const navigate = useNavigate();

    const moveToHome = () => {
        navigate('/');
    }

    const [visible, setVisible] = useState(window.outerWidth > 767);

    useEffect(() => {
        const handleResize = () => {
            setVisible(window.outerWidth > 767);
        }

        window.addEventListener('resize', handleResize);
    });



    const clickHandler = () => {
        setVisible(prevState => !prevState);
    }

    return (
        <nav className={classes.navbar} >
            <div className={classes.navbar_brand} onClick={moveToHome} >MOVIES._.DB</div>
            <SearchBar />
            <button className={classes.dropdown} >
                <img src={Dropdown} alt="dropdown" className={classes.dropdown_img} onClick={clickHandler} />
            </button>
            {(visible) && < Button title='My WatchList' />}
            {!isAuthenticated && (visible) && <Button title="Sign In" />}
            {isAuthenticated && (visible) && <Button title="Sign Out" />}
        </nav>
    );
};

export default Navbar;