import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/AuthSlice";
import classes from "./Login.module.css";
// import { useHistory } from "react-router-dom";

const Login = () => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  // const history = useHistory();
  const [isLoading, setisLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const dispatch = useDispatch();

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (events) => {
    events.preventDefault();
    const emailInputValue = emailInputRef.current.value;
    const passwordInputValue = passwordInputRef.current.value;

    let url;

    setisLoading(true);
    if (isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDPtCEgvHKWGjeLhta9rq5cIg_1JyrgsXk";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDPtCEgvHKWGjeLhta9rq5cIg_1JyrgsXk";
    }
    fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        email: emailInputValue,
        password: passwordInputValue,
        returnSecureToken: true,
      }),
    })
      .then((res) => {
        setisLoading(false);
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "Autentication Error!";
            if (data.error.message) {
              errorMessage = data.error.message;
            }
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        // console.log(data);
        // authCtx.login(data.idToken);
        dispatch(authActions.Login());
        // history.replace("/");
      })
      .catch((err) => {
        alert(err.message);
        console.error(err.message);
      });
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            required
            ref={passwordInputRef}
          />
        </div>
        <div className={classes.actions}>
          {!isLoading ? (
            <button>{isLogin ? "Login" : "Create Account"}</button>
          ) : (
            <p>Sending Request...</p>
          )}
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Login;
