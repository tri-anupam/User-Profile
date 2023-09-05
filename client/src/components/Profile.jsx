import React, { useState } from "react";
import { Link } from "react-router-dom";
import addUser from "../assets/add-user.png";
import { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { profileValidation } from "../helper/validate.js";
import convertToBase64 from "../helper/convert";

// import styles from "../styles/Username.module.css";
// import extend from "../styles/Profile.module.css";

const Profile = () => {
  const [file, setFile] = useState();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      mobile: "",
      address: "",
    },
    validate: profileValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      values = await Object.assign(values, { profile: file || "" });
      console.log(values);
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
      <div className="flex justify-center items-center h-screen">
        <div
          // className={`${styles.glass} ${extend.glass}`}
          className="border-4 border-gray-50 shrink-0 md:w-[30%] w-[90%] h-fit rounded-3xl  min-w-max shadow-md shadow-[#bbb] bg-[#ffffff61] md:py-4 py-2"
        >
          <div className="title flex flex-col items-center">
            <h4 className="md:text-5xl text-3xl font-bold font-400">Profile</h4>
            <span className="md:py-4 py-2 md:text-xl text-l w-2/3 text-center text-gray-500">
              You can update the details.
            </span>
          </div>

          <form onSubmit={formik.handleSubmit}>
            <div className="profile flex justify-center md:py-4 py-2">
              <label htmlFor="profile">
                <img
                  src={file || addUser}
                  alt="avatar"
                  // className={`${styles.profile_img} ${extend.profile_img}`}
                  className="border-4 border-gray-100 rounded-full shadow-lg cursor-pointer hover:border-gray-200 md:h-40 md:w-40 h-24 w-24"
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

            <div className="textbox flex flex-col items-center justify-center md:gap-6 gap-3">
              <div className="name flex items-center md:w-3/4 w-[90%] md:gap-10 gap-4 flex-col md:flex-row">
                <input
                  {...formik.getFieldProps("firstName")}
                  type="text"
                  placeholder="First Name"
                  // className={`${styles.textbox} ${extend.textbox}`}
                  className="border-0 px-3 py-3 rounded-xl md:w-3/4  w-[90%] shadow-sm text-lg focus:outline-none"
                />
                <input
                  {...formik.getFieldProps("lastName")}
                  type="text"
                  placeholder="Last Name"
                  // className={`${styles.textbox} ${extend.textbox}`}
                  className="border-0 px-3 py-3 rounded-xl md:w-3/4  w-[90%] shadow-sm text-lg focus:outline-none"
                />
              </div>

              <div className="name flex items-center md:w-3/4 w-[90%] md:gap-10 gap-4  flex-col md:flex-row">
                <input
                  {...formik.getFieldProps("mobile")}
                  type="text"
                  placeholder="Mobile No."
                  // className={`${styles.textbox} ${extend.textbox}`}
                  className="border-0 px-3 py-3 rounded-xl md:w-3/4  w-[90%] shadow-sm text-lg focus:outline-none"
                />
                <input
                  {...formik.getFieldProps("email")}
                  type="email"
                  placeholder="Email"
                  // className={`${styles.textbox} ${extend.textbox}`}
                  className="border-0 px-3 py-3 rounded-xl md:w-3/4  w-[90%] shadow-sm text-lg focus:outline-none"
                />
              </div>

              <input
                {...formik.getFieldProps("address")}
                type="text"
                placeholder="Address"
                // className={`${styles.textbox} ${extend.textbox}`}
                className="border-0 px-3 py-3 rounded-xl md:w-3/4  w-[82%] shadow-sm text-lg focus:outline-none"
              />

              <button
                //  className={styles.btn}
                className="border border-gray-500 md:w-3/4 w-[90%] py-3 rounded-lg text-gray-600 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none
                text-xl shadow-sm text-center hover:bg-[#ff6a6a] hover:text-white hover:border-white"
                type="submit"
              >
                Update
              </button>
            </div>

            <div className="text-center py-4">
              <span className="text-gray-500">
                Come back later?
                <Link to="/" className="text-red-500 ml-2 hover:underline">
                  Logout
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
