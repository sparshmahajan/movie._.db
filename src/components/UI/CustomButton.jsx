import classes from './CustomButton.module.css';

const CustomButton = (props) => {
    return (
        <button className={classes.custom_button} onClick={props.onClick}>
            {props.children}
        </button>
    );
}

export default CustomButton;