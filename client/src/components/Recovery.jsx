import React from "react";
import { Link } from "react-router-dom";
import user from "../assets/user.png";
import styles from "../styles/Username.module.css";
import { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { passwordValidate } from "../helper/validate";

const Recovery = () => {
  return (
    <div className="container mx-auto">
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <div className="flex justify-center items-center h-screen ">
        <div className={styles.glass} style={{ width: "fit" }}>
          <div className="title flex flex-col items-center">
            <h4 className="md:text-5xl text-4xl font-bold font-400">
              Recovery
            </h4>
            <span className="py-4 md:text-xl text-l w-2/3 text-center text-gray-500">
              Enter OTP to recover Password
            </span>
          </div>

          <form className="pt-10">
            <div className="textbox flex flex-col items-center gap-6">
              <div className="input text-center">
                <span className="pb-4 text-sm text-left text-gray-500">
                  Enter 6 digit OTP sent to your email address.
                </span>
                <input
                  type="text"
                  placeholder="enter OTP"
                  className={styles.textbox}
                />
              </div>
              <button className={styles.btn} type="submit">
                Sign In
              </button>
            </div>

            <div className="text-center py-4">
              <span className="text-gray-500">
                Can't get OTP
                <button className="text-red-500 ml-2 hover:underline">
                  Resend
                </button>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Recovery;
