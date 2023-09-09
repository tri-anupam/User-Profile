import React, { useState } from "react";
import { Link } from "react-router-dom";
import addUser from "../assets/add-user.png";
import styles from "../styles/Username.module.css";
import { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { registerValidation } from "../helper/validate.js";
import convertToBase64 from "../helper/convert";
// import { registerUser } from "../helper/helper";

const Register = () => {
  const [file, setFile] = useState();

  const formik = useFormik({
    initialValues: {
      email: "",
      username: "",
      password: "",
    },
    validate: registerValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      values = await Object.assign(values, { profile: file || "" });
      // registerUser(values);
    },
  });

  //fromik does not support file upload so we need to create this handler
  const onUpload = async (e) => {
    const base64 = await convertToBase64(e.target.files[0]);
    setFile(base64);
  };

  return (
    <div className="container mx-auto">
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <div className="flex justify-center items-center h-screen ">
        <div
          className={styles.glass}
          style={{ width: "45%", height: "fit-content" }}
        >
          <div className="title flex flex-col items-center">
            <h4 className="md:text-5xl text-4xl font-bold font-400">
              Register Youself<span className="text-orange-500">!</span>
            </h4>
            <span className="py-4 md:text-xl text-l w-2/3 text-center text-gray-500">
              Happy to join you.
            </span>
          </div>

          <form className="py-1" onSubmit={formik.handleSubmit}>
            <div className="profile flex justify-center py-4">
              <label htmlFor="profile">
                <img
                  src={file || addUser}
                  alt="avatar"
                  className={styles.profile_img}
                  style={{ height: "110px", width: "110px" }}
                />
              </label>
              <input
                onChange={onUpload}
                type="file"
                id="profile"
                name="profile"
                accept="image/*"
              />
            </div>

            <div className="textbox flex flex-col items-center gap-6">
              <input
                {...formik.getFieldProps("email")}
                type="email"
                placeholder="Email"
                className={styles.textbox}
              />
              <input
                {...formik.getFieldProps("username")}
                type="text"
                placeholder="Username"
                className={styles.textbox}
              />
              <input
                {...formik.getFieldProps("password")}
                type="password"
                placeholder="Password"
                className={styles.textbox}
              />
              <button className={styles.btn} type="submit">
                Sign In
              </button>
            </div>

            <div className="text-center py-4">
              <span className="text-gray-500">
                Already User?
                <Link to="/" className="text-red-500 ml-2 hover:underline">
                  Login
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
