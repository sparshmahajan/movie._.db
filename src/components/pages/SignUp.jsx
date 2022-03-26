import { Fragment, useRef } from "react";
import FormInput from "../UI/FormInput";
import CustomButton from "../UI/CustomButton";
import classes from "./SignIn.module.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const SignUp = () => {

    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();

        if (passwordRef.current.value !== confirmPasswordRef.current.value) {
            toast.error("Passwords do not match");
            return;
        }

        const body = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value
        };
        const fetchData = async () => {
            try {
                const response = await axios.post("https://moviedb-backend-1.herokuapp.com/api/signup", body);
                toast.success(response.data.message, {
                    position: "top-right",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true
                });
                setTimeout(() => navigate("/signin"), 2000);
            } catch (error) {
                console.log(error);
                const error_msg = error.response.data.message;
                toast.error(error_msg, {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true
                });
            }
        };
        fetchData();
    };

    return (
        <Fragment>
            <div className={classes.center}>
                <div className={classes.sign_in}>
                    <h1>SIGN UP</h1>
                    <form onSubmit={handleSubmit}>
                        <FormInput
                            name="displayName"
                            type="text"
                            label="Display Name"
                            Ref={nameRef}
                            required
                        />
                        <FormInput
                            name="email"
                            type="email"
                            label="Email"
                            Ref={emailRef}
                            required
                        />
                        <FormInput
                            name="password"
                            type="password"
                            label="Password"
                            Ref={passwordRef}
                            required
                        />
                        <FormInput
                            name="confirmPassword"
                            type="password"
                            label="Confirm Password"
                            Ref={confirmPasswordRef}
                            required
                        />
                        <CustomButton type="submit">Sign up</CustomButton>
                    </form>
                    <p>Already have an account ? <Link to="/signin" className={classes.link}>Sign in</Link></p>
                </div>
            </div>
            <ToastContainer />
        </Fragment>
    );
}

export default SignUp;