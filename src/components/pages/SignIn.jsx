import { useRef } from "react";
import FormInput from "../UI/FormInput";
import CustomButton from "../UI/CustomButton";
import classes from './SignIn.module.css';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";


const SignIn = (props) => {

    const emailRef = useRef();
    const passwordRef = useRef();

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        const body = {
            email: emailRef.current.value,
            password: passwordRef.current.value
        };

        const fetchData = async () => {
            try {
                const response = await axios.post("http://localhost:5000/user/signin", body, { withCredentials: true });
                console.log(response);
                alert(response.data.message);
            } catch (error) {
                console.log(error);
                const error_msg = error.response.data.message;
                alert(error_msg);
            }
        }
        fetchData();
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
                        label="Email"
                        Ref={emailRef}
                        required
                    />
                    <FormInput
                        name="password"
                        type="password"
                        value={props.password}
                        label="Password"
                        Ref={passwordRef}
                        required
                    />
                    <div className="buttons">
                        <CustomButton type="submit">Sign in</CustomButton>
                    </div>
                </form>
                <p>Don't have an account ? <Link to="/signup" className={classes.link} >Sign up</Link></p>
            </div>
        </div>
    );
}

export default SignIn;