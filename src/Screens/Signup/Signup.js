import { useEffect, useState } from "react";
import classes from "./Signup.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { signupUser, googleSignup } from "../../Reducers/authReducer";
import { GoogleLogin } from "@react-oauth/google";

const Signup = (props) => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const error = useSelector((state) => state.auth.signupError);
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      signupUser({
        name,
        email,
        password,
      })
    );
  };

  const responseGoogleSuccess = async (response) => {
    dispatch(googleSignup(response.credential));
  };
  const responseGoogleError = (response) => {
    console.log(response);
  };

  useEffect(() => {
    if (isLoggedIn) navigate("/courses", { replace: true });
  }, [isLoggedIn]);
  return (
    <main
      className="d-flex align-items-center justify-content-center mt-5"
      style={{ flexDirection: "column" }}
    >
      <GoogleLogin
        className={classes.googleLogin}
        onSuccess={responseGoogleSuccess}
        onError={() => {
          console.log("Login Failed");
        }}
      />
      <h4 className="mt-3 mb-3">OR</h4>
      <form
        onSubmit={submitHandler}
        className="d-flex"
        style={{ flexDirection: "column" }}
      >
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="name"
          className={classes.input}
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email"
          className={classes.input}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
          className={classes.input}
        />
        {error && <p className={classes.error}>{error}</p>}
        <button type="submit" className={classes.btn}>
          Signin
        </button>
      </form>
    </main>
  );
};

export default Signup;
