import classes from './Button.module.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../store/AuthSlice';

let navigationRoute = null;

const Button = (props) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleClick = () => {
        if (props.title === "Sign In") {
            navigationRoute = "/signin";
            navigate(navigationRoute);
        } else if (props.title === "Sign Out") {
            dispatch(logout());
            navigationRoute = "/";
            navigate(navigationRoute);
        }

    }

    return (
        <button className={classes.button} onClick={handleClick} >{props.title}</button>
    );
}

export default Button;