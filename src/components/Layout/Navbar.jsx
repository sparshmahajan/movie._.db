import classes from './Navbar.module.css';
import SearchBar from './SearchBar';
import Button from '../UI/Button';
import Dropdown from '../../assets/images/Dropdown.svg';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {

    const isAuthenticated = useSelector(state => state.auth.isLoggedIn);
    const navigate = useNavigate();

    const moveToHome = () => {
        navigate('/');
    }


    return (
        <nav className={classes.navbar} >
            <div className={classes.navbar_brand} onClick={moveToHome} >MOVIES._.DB</div>
            <SearchBar />
            <button className={classes.dropdown} >
                <img src={Dropdown} alt="dropdown" className={classes.dropdown_img} />
            </button>
            <Button title='My WatchList' />
            {!isAuthenticated && <Button title="Sign In" />}
            {isAuthenticated && <Button title="Sign Out" />}
        </nav>
    );
};

export default Navbar;