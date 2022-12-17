import axios from "axios";
import { useState } from "react";
import useInput from "../../../hooks/use-input";
import { Link, useNavigate } from "react-router-dom";
import styles from "../Auth.module.css";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const [isFetching, setIsFetching] = useState(false);
  const {
    value: enteredUsername,
    inputBlurHandler: usernameBlurHandler,
    valueChangedHandler: usernameChangedHandler,
    isValid: usernameIsValid,
    hasError: usernameHasError,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredPassword,
    inputBlurHandler: passwordBlurHandler,
    valueChangedHandler: passwordChangedHandler,
    isValid: passwordIsValid,
    hasError: passwordHasError,
  } = useInput((value) => value.length > 1);

  const formIsValid = usernameIsValid && passwordIsValid;

  const sendFormData = async (data) => {
    const loading = toast.loading("Authenticating");
    try {
      const sendData = await axios.post(
        "https://forex.themaxibot.com/login/",
        data
      );
      toast.update(loading, {
        render: "Successfully Authenticated",
        type: "success",
        isLoading: false,
        closeButton: true,
      });
      console.log("Your request data is:", sendData);
      setIsFetching(false);
      const user = sendData.data;
      localStorage.setItem("user", JSON.stringify(user));
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } catch (error) {
      const response = error.response;
      const status = response.status;
      const data = response.data;
      console.log("There was an error", error)
      switch (status) {
        case 500:
          toast.update(loading, {
            render: "service unavailable, try later",
            type: "error",
            isLoading: false,
            autoClose: true,
            closeButton: true,
          });
          break;
        case 401:
          toast.update(loading, {
            render: data.detail,
            type: "error",
            isLoading: false,
            autoClose: true,
            closeButton: true,
          });
          break;
          case 406:
            toast.update(loading, {
              render: data.detail,
              type: "error",
              isLoading: false,
              autoClose: true,
              closeButton: true,
            });
            break;
        default:
          toast.update(loading, {
            render: "something went wrong, try later",
            type: "error",
            isLoading: false,
            autoClose: true,
            closeButton: true,
          });
          break;
      }
      setIsFetching(false);
    }
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }
    const user = {
      username: enteredUsername,
      password: enteredPassword,
    };
    setIsFetching(true);

    sendFormData(user);
  };

  return (
    <>
      <div className={styles.intro}>
        <h2>Welcome Back</h2>
        <p className={styles.subText}>
          We are glad to have you back, kindly fill in your details to continue
        </p>
      </div>
      <div>
        <p className={styles.title}>
          <span>Login</span> to continue
        </p>
        <div className={styles.card}>
          <form onSubmit={formSubmitHandler} action="" method="post">
            <input
              onChange={usernameChangedHandler}
              onBlur={usernameBlurHandler}
              name="username"
              type="text"
              placeholder="Username"
              className={usernameHasError ? styles.invalid : ""}
            />
            {usernameHasError ? (
              <p className={styles.error}>Username cannot be empty</p>
            ) : (
              ""
            )}

            <input
              onChange={passwordChangedHandler}
              onBlur={passwordBlurHandler}
              name="password"
              type="password"
              placeholder="Password"
              className={passwordHasError ? styles.invalid : ""}
            />
            {passwordHasError ? (
              <p className={styles.error}>Password cannot be empty</p>
            ) : (
              ""
            )}

            <button
              disabled={!formIsValid || isFetching ? true : false}
              type="submit"
            >
              {!isFetching && !formIsValid
                ? "Login"
                : isFetching && formIsValid
                ? "Please wait...."
                : "Login"}
            </button>
            <p className={styles.link}>
              Don't have an account register <Link to="/register">here</Link>
            </p>
            <p className={styles.terms}>
              By clicking the button, you are agreeing to our{" "}
              <span>Terms and Services</span>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};
export default Login;
