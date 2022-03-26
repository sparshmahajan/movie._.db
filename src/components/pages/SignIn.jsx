import { useRef } from "react";
import FormInput from "../UI/FormInput";
import CustomButton from "../UI/CustomButton";
import classes from './SignIn.module.css';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { login } from "../store/AuthSlice";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const SignIn = (props) => {
    const emailRef = useRef();
    const passwordRef = useRef();

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        const body = {
            email: emailRef.current.value,
            password: passwordRef.current.value
        };

        emailRef.current.value = "";
        passwordRef.current.value = "";

        const fetchData = async () => {
            try {
                const response = await axios.post("https://moviedb-backend-1.herokuapp.com/api/signin", body, { withCredentials: true });
                setTimeout(() => {
                    dispatch(login(response.data.movie));
                }, 3000);
                toast.success(response.data.message, {
                    position: "top-right",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true
                });
                setTimeout(() => navigate("/"), 1000);
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
        }
        fetchData();
    };

    return (
        <>
            <div className={classes.center}>
                <div className={classes.sign_in}>
                    <h1>SIGN IN</h1>
                    <form onSubmit={handleSubmit}>
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
                        <div className="buttons">
                            <CustomButton type="submit">Sign in</CustomButton>
                        </div>
                    </form>
                    <p>Don't have an account ? <Link to="/signup" className={classes.link} >Sign up</Link></p>
                </div>
            </div>
            <ToastContainer />
        </>
    );
}

export default SignIn;