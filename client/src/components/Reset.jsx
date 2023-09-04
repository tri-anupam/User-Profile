import React from "react";
import { Link } from "react-router-dom";
import styles from "../styles/Username.module.css";
import { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { resetPasswordVaidate } from "../helper/validate";

const Reset = () => {
  const formik = useFormik({
    initialValues: {
      password: "",
      confirm_pwd: "",
    },
    validate: resetPasswordVaidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      console.log(values);
    },
  });

  return (
    <div className="container mx-auto">
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <div className="flex justify-center items-center h-screen ">
        <div className={styles.glass}>
          <div className="title flex flex-col items-center">
            <h4 className="md:text-5xl text-4xl font-bold font-400">
              Reset Password
            </h4>
            <span className="py-4 md:text-xl text-l w-2/3 text-center text-gray-500">
              Enter new password.
            </span>
          </div>

          <form className="py-1" onSubmit={formik.handleSubmit}>
            <div className="textbox flex flex-col items-center gap-6">
              <input
                {...formik.getFieldProps("password")}
                type="password"
                placeholder="New Password"
                className={styles.textbox}
              />
              <input
                {...formik.getFieldProps("confirm_pwd")}
                type="password"
                placeholder="Confirm Password"
                className={styles.textbox}
              />
              <button className={styles.btn} type="submit">
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Reset;
