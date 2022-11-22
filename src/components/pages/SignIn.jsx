import { useRef, useState } from "react";
import FormInput from "../UI/FormInput";
import CustomButton from "../UI/CustomButton";
import classes from "./SignIn.module.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { login } from "../store/AuthSlice";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignIn = () => {
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);

  const emailRef = useRef();
  const passwordRef = useRef();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const emailValidity = () => {
    const re = /\S+@\S+\.\S+/;
    const result = re.test(emailRef.current.value);
    setIsEmailValid(result);
    return result;
  };

  const passwordValidity = () => {
    // regex for password validation (at least 1 uppercase, 1 lowercase, 1 number, 1 special character, 8 characters long)
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const result = re.test(passwordRef.current.value);
    setIsPasswordValid(result);
    return result;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validE = emailValidity();
    const validP = passwordValidity();

    if (validE && validP) {
      const body = {
        email: emailRef.current.value,
        password: passwordRef.current.value,
      };

      emailRef.current.value = "";
      passwordRef.current.value = "";

      const fetchData = async () => {
        try {
          const response = await axios.post(
            "https://moviedb-backend-1.herokuapp.com/api/signin",
            body,
            { withCredentials: true }
          );
          localStorage.setItem("token", response.data.token);
          setTimeout(() => {
            dispatch(login(response.data.movie));
          }, 3000);
          toast.success(response.data.message, {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
          });
          setTimeout(() => navigate("/"), 1000);
        } catch (error) {
          console.log(error);
          const error_msg = error.response.data.message;
          toast.error(error_msg, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
          });
        }
      };
      fetchData();
    } else return;
  };

  return (
    <>
      <div className={classes.center}>
        <div className={classes.sign_in}>
          <h1>SIGN IN</h1>
          <form className={classes.signInForm} onSubmit={handleSubmit}>
            <FormInput
              name="email"
              type="email"
              label="Email"
              Ref={emailRef}
              hasError={!isEmailValid}
              handleChange={() => setIsEmailValid(true)}
              errorMessage="Please enter a valid email"
              required
            />
            <FormInput
              name="password"
              type="password"
              label="Password"
              Ref={passwordRef}
              handleChange={() => setIsPasswordValid(true)}
              hasError={!isPasswordValid}
              errorMessage="Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter and one number"
              required
            />
            <CustomButton type="submit">Sign in</CustomButton>
          </form>
          <p>
            Don't have an account ?{" "}
            <Link to="/signup" className={classes.link}>
              Sign up
            </Link>
          </p>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default SignIn;
