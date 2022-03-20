import classes from './FormInput.module.css';

const FormInput = (props) => {
    return (
        <div className={classes.form_input}>
            <label className={classes.label}>{props.label}</label>
            <input
                className={classes.input}
                type={props.type}
                name={props.name}
                value={props.value}
                onChange={props.handleChange}
                placeholder={props.label}
                required
            />
        </div>
    );
}

export default FormInput;