import { useEffect, useState } from "react";
import classes from "./Signup.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { signupUser, googleSignup } from "../../Reducers/authReducer";
import { GoogleLogin } from "@react-oauth/google";
import Form from "react-bootstrap/Form";
import { Formik } from "formik";
import * as yup from "yup";

let schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password should have atleast 8 characters"),
});

const Signup = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const error = useSelector((state) => state.auth.signupError);
  const submitHandler = (values) => {
    dispatch(
      signupUser({
        ...values,
      })
    );
  };

  const responseGoogleSuccess = async (response) => {
    dispatch(googleSignup(response.credential));
  };
  // const responseGoogleError = (response) => {
  //   console.log(response);
  // };

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
        onError={() => {}}
      />
      <h4 className="mt-3 mb-3">OR</h4>
      <Formik
        validationSchema={schema}
        onSubmit={submitHandler}
        initialValues={{
          name: "",
          email: "",
          password: "",
        }}
      >
        {({
          handleSubmit,
          handleChange,
          handleBlur,
          values,
          touched,
          isValid,
          errors,
        }) => (
          <Form
            noValidate
            onSubmit={handleSubmit}
            className="d-flex"
            style={{ flexDirection: "column" }}
          >
            <input
              type="text"
              placeholder="name"
              className={classes.input}
              name="name"
              value={values.name}
              onChange={handleChange}
              isValid={touched.firstName && !errors.firstName}
            />
            {errors.name && touched.name && (
              <div className={classes.errorInput}>{errors.name}</div>
            )}
            <input
              type="email"
              placeholder="email"
              className={classes.input}
              name="email"
              value={values.email}
              onChange={handleChange}
              isValid={touched.firstName && !errors.firstName}
            />
            {errors.email && touched.email && (
              <div className={classes.errorInput}>{errors.email}</div>
            )}
            <input
              type="password"
              placeholder="password"
              className={classes.input}
              name="password"
              value={values.password}
              onChange={handleChange}
              isValid={touched.firstName && !errors.firstName}
            />
            {errors.password && touched.password && (
              <div className={classes.errorInput}>{errors.password}</div>
            )}
            {error && <p className={classes.error}>{error}</p>}
            <button type="submit" className={classes.btn}>
              Signin
            </button>
          </Form>
        )}
      </Formik>
    </main>
  );
};

export default Signup;
