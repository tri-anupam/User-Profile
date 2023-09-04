import toast from "react-hot-toast";

//Validate login page username
export async function usernameValidate(values) {
  const errors = usernameVerify({}, values);

  return errors;
}

//Validate login page password
export async function passwordValidate(values) {
  const errors = passwordVerify({}, values);
  return errors;
}

//validate reset/new password
export async function resetPasswordVaidate(values) {
  const errors = resetPasswordVerify({}, values);
  return errors;
}

//validate register form
export async function registerValidation(values) {
  const errors = registerUser({}, values);
  return errors;
}

//*************************************** */

//validate Password
function passwordVerify(errors = {}, values) {
  const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  if (!values.password) {
    errors.password = toast.error("Password Required");
  } else if (values.password.includes(" ")) {
    errors.password = toast.error("Invalid Password");
  } else if (values.password.length < 4) {
    errors.password = toast.error("Password should be max to 4 characters");
  } else if (!specialChars.test(values.password)) {
    errors.password = toast.error("Password should contain special characters");
  }

  return errors;
}

//Validate user name
function usernameVerify(error = {}, values) {
  if (!values.username) {
    error.username = toast.error("Username Required");
  } else if (values.username.includes(" ")) {
    error.username = toast.error("Invalid Username");
  }
  return error;
}

//Reset Password Verify
function resetPasswordVerify(error = {}, values) {
  if (!(values.password && values.confirm_pwd)) {
    error.password = toast.error("Password required");
  } else if (values.password !== values.confirm_pwd) {
    error.password = toast.error("Both password not Matched");
  }
  return error;
}

//register validate
function registerUser(errors = {}, values) {
  //password
  const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  if (!values.password) {
    errors.password = toast.error("Password Required");
  } else if (values.password.includes(" ")) {
    errors.password = toast.error("Invalid Password");
  } else if (values.password.length < 4) {
    errors.password = toast.error("Password should be max to 4 characters");
  } else if (!specialChars.test(values.password)) {
    errors.password = toast.error(
      "Password should contain special characters and numbers"
    );
  }
  //username
  if (!values.username) {
    errors.username = toast.error("Username Required");
  } else if (values.username.includes(" ")) {
    errors.username = toast.error("Invalid Username");
  }
  //email
  if (!values.email) {
    errors.email = toast.error("Email Required");
  } else if (values.email.includes(" ")) {
    errors.email = toast.error("Invalid email");
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = toast.error("Invalid email address...!");
  }
  return errors;
}
