import { useState } from "react";
import FormInput from "../UI/FormInput";
import CustomButton from "../UI/CustomButton";
import classes from './SignIn.module.css';
import { Link } from "react-router-dom";


const SignIn = (props) => {

    const [formData, setFormData] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };


    return (
        <div className={classes.center}>
            <div className={classes.sign_in}>
                <h1>SIGN IN</h1>
                <form onSubmit={handleSubmit}>
                    <FormInput
                        name="email"
                        type="email"
                        value={props.email}
                        handleChange={handleChange}
                        label="Email"
                        required
                    />
                    <FormInput
                        name="password"
                        type="password"
                        value={props.password}
                        handleChange={handleChange}
                        label="Password"
                        required
                    />
                    <div className="buttons">
                        <CustomButton type="submit">Sign in</CustomButton>
                    </div>
                </form>
                <p>Don't have an account ? <Link to="/sign_up" className={classes.link} >Sign up</Link></p>
            </div>
        </div>
    );
}

export default SignIn;