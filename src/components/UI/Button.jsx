import classes from './Button.module.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/AuthSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Fragment } from 'react';

let navigationRoute = null;

const Button = (props) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isAuthenticated = useSelector(state => state.auth.isLoggedIn);

    const handleClick = () => {
        if (props.title === "Sign In") {
            navigationRoute = "/signin";
            navigate(navigationRoute);
        } else if (props.title === "Sign Out") {
            dispatch(logout());
            navigate("/");
        } else if (props.title === "My WatchList") {
            if (isAuthenticated) {
                navigate("/watchlist");
            } else {
                toast.info("You need to be logged in to add to watchlist", {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        }
    }

    return (
        <Fragment>
            <button className={classes.button} onClick={handleClick} >{props.title}</button>
            <ToastContainer />
        </Fragment>
    );
}

export default Button;