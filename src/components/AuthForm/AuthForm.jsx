import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import css from "./Authform.module.css";

const AuthForm = ({ onSignIn, onSignUp, error }) => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email format").required("Email is required"),
      password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
      confirmPassword: onSignUp
        ? Yup.string()
            .oneOf([Yup.ref("password"), null], "Passwords must match")
            .required("Confirm Password is required")
        : Yup.string(),
    }),
    onSubmit: (values) => {
      if (onSignUp) {
        onSignUp(values.email, values.password, values.confirmPassword);
      } else {
        onSignIn(values.email, values.password);
      }
    },
  });

  return (
    <div className={css.container}>
      <h2>{onSignUp ? "Sign Up" : "Login"}</h2>
      <form onSubmit={formik.handleSubmit} className={css.inputsContainer}>
        <div className={css.inputErrors}>
          <input type="email" placeholder="Email" {...formik.getFieldProps("email")} className={css.input} />
          {formik.touched.email && formik.errors.email && <p className={css.error}>{formik.errors.email}</p>}
        </div>

        <div className={css.inputErrors}>
          <input type="password" placeholder="Password" {...formik.getFieldProps("password")} className={css.input} />
          {formik.touched.password && formik.errors.password && <p className={css.error}>{formik.errors.password}</p>}
        </div>

        <div className={css.inputErrors}>
          {onSignUp && (
            <>
              <input type="password" placeholder="Confirm Password" {...formik.getFieldProps("confirmPassword")} className={css.input} />
              {formik.touched.confirmPassword && formik.errors.confirmPassword && <p className={css.error}>{formik.errors.confirmPassword}</p>}
            </>
          )}
        </div>

        <button type="submit" className={css.btn}>
          {onSignUp ? "Sign Up" : "Login"}
        </button>
      </form>
    </div>
  );
};

export default AuthForm;
