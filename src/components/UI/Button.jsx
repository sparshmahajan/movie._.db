import classes from './Button.module.css';
import { useNavigate } from 'react-router-dom';



const Button = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/signin');
    }

    return (
        <button className={classes.button} onClick={handleClick} >Sign In</button>
    );
}

export default Button;