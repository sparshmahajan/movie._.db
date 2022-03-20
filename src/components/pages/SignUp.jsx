import { useState } from "react";
import FormInput from "../UI/FormInput";
import CustomButton from "../UI/CustomButton";
import classes from "./SignUp.module.css";
import { Link } from "react-router-dom";


const SignUp = () => {

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
            <div className={classes.sign_up}>
                <h1>SIGN UP</h1>
                <form onSubmit={handleSubmit}>
                    <FormInput
                        name="displayName"
                        type="text"
                        handleChange={handleChange}
                        label="Display Name"
                        required
                    />
                    <FormInput
                        name="email"
                        type="email"
                        handleChange={handleChange}
                        label="Email"
                        required
                    />
                    <FormInput
                        name="password"
                        type="password"
                        handleChange={handleChange}
                        label="Password"
                        required
                    />
                    <FormInput
                        name="confirmPassword"
                        type="password"
                        handleChange={handleChange}
                        label="Confirm Password"
                        required
                    />
                    <CustomButton type="submit">Sign up</CustomButton>
                </form>
                <p>Already have an account ? <Link to="/sign_in" className={classes.link}>Sign in</Link></p>
            </div>
        </div>

    );
}

export default SignUp;