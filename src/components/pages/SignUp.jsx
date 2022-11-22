import { Fragment, useRef, useState } from "react";
import FormInput from "../UI/FormInput";
import CustomButton from "../UI/CustomButton";
import classes from "./SignIn.module.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUp = () => {
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(true);

  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const navigate = useNavigate();

  const emailValidity = () => {
    const re = /\S+@\S+\.\S+/;
    const result = re.test(emailRef.current.value);
    setIsEmailValid(result);
    return result;
  };

  const passwordValidity = () => {
    // regex for password validation (at least 1 uppercase, 1 lowercase, 1 number, 1 special character,  min 8 characters long)
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const result = re.test(passwordRef.current.value);
    setIsPasswordValid(result);
    return result;
  };

  const confirmPasswordValidity = () => {
    const result =
      passwordRef.current.value === confirmPasswordRef.current.value;
    setIsConfirmPasswordValid(result);
    return result;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validE = emailValidity();
    const validP = passwordValidity();
    const validCP = confirmPasswordValidity();

    if (validE && validP && validCP) {
      const body = {
        name: nameRef.current.value,
        email: emailRef.current.value,
        password: passwordRef.current.value,
      };
      const fetchData = async () => {
        try {
          const response = await axios.post(
            "https://moviedb-backend-1.herokuapp.com/api/signup",
            body
          );
          toast.success(response.data.message, {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
          });
          setTimeout(() => navigate("/signin"), 2000);
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
    <Fragment>
      <div className={classes.center}>
        <div className={classes.sign_in}>
          <h1>SIGN UP</h1>
          <form className={classes.signInForm} onSubmit={handleSubmit}>
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
              hasError={!isEmailValid}
              errorMessage="Please enter a valid email address"
              required
            />
            <FormInput
              name="password"
              type="password"
              label="Password"
              Ref={passwordRef}
              hasError={!isPasswordValid}
              errorMessage="Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter and one number"
              required
            />
            <FormInput
              name="confirmPassword"
              type="password"
              label="Confirm Password"
              Ref={confirmPasswordRef}
              handleBlur={confirmPasswordValidity}
              hasError={!isConfirmPasswordValid}
              errorMessage="Passwords do not match"
              required
            />
            <CustomButton type="submit">Sign up</CustomButton>
          </form>
          <p>
            Already have an account ?{" "}
            <Link to="/signin" className={classes.link}>
              Sign in
            </Link>
          </p>
        </div>
      </div>
      <ToastContainer />
    </Fragment>
  );
};

export default SignUp;
