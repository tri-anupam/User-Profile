import React from "react";
import { Link, useNavigate } from "react-router-dom";
import user from "../assets/user.png";
import styles from "../styles/Username.module.css";
import { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { passwordValidate } from "../helper/validate";
import useFetch from "../hooks/fetch.hook";
import { useAuthStore } from "../store/store";

const Password = () => {
  const navigate = useNavigate();
  const { username } = useAuthStore((state) => state.auth);
  const [{ isLoading, apiData, serverError }] = useFetch(`/user/${username}`);

  const formik = useFormik({
    initialValues: {
      password: "",
    },
    validate: passwordValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      navigate("/profile");
    },
  });

  if (isLoading)
    return (
      <>
        <button type="button" class="bg-indigo-500" disabled>
          <svg class="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24"></svg>
          Processing...
        </button>
      </>
    );

  if (serverError)
    return (
      <h1 className="text-xl text-red-500 text-center">
        {serverError.message}
      </h1>
    );

  return (
    <div className="container mx-auto">
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <div className="flex justify-center items-center h-screen ">
        <div className={styles.glass}>
          <div className="title flex flex-col items-center">
            <h4 className="md:text-5xl text-4xl font-bold font-400">
              Hello {apiData?.firstName || apiData?.username}
            </h4>
            <span className="py-4 md:text-xl text-l w-2/3 text-center text-gray-500">
              Explore More by connecting with us.
            </span>
          </div>

          <form className="py-1" onSubmit={formik.handleSubmit}>
            <div className="profile flex justify-center py-4">
              <img
                src={apiData?.profile || user}
                alt="avatar"
                className={styles.profile_img}
              />
            </div>

            <div className="textbox flex flex-col items-center gap-6">
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
                Forgot Password
                <Link
                  to="/recovery"
                  className="text-red-500 ml-2 hover:underline"
                >
                  Recover Now
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Password;
