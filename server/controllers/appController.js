import UserModel from "../model/User.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//middleware for verify user
export async function verifyUser(req, res, next) {
  try {
    const { username } = req.method == "GET" ? req.query : req.body;

    //check the user existence
    let exist = await UserModel.findOne({ username });
    if (!exist)
      return res
        .status(404)
        .send({ error: "Can't find user middleware error" });
    next();
  } catch (error) {
    console.log(error);
    return res.status(404).send({ error: "Authentication error" });
  }
}

//!POST-->REGISTER USER
export async function register(req, res) {
  try {
    //check existing user
    const existingUser = await UserModel.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "User already exist",
      });
    }

    //encrypt password
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    req.body.password = hashedPassword;

    //create new user
    const newUser = new UserModel(req.body);
    await newUser.save();
    res.status(201).send({
      message: "User Register Successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: `Register controller ${error.message}`,
    });
  }
}

//!POST-->LOGIN USER
export async function login(req, res) {
  try {
    const user = await UserModel.findOne({ username: req.body.username });

    //if user not exist
    if (!user) {
      return res.status(200).send({
        message: "User not found",
        success: false,
      });
    }
    //check password
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.status(500).send({
        message: "Invalid email or password",
        success: false,
      });
    }

    //generate token
    const token = jwt.sign({ UserId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    //login
    res.status(200).send({
      message: "Login Successfull",
      success: true,
      username: user.username,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: `Error in login ctrl ${error.message}`,
      success: false,
    });
  }
}

//!GET-->GET SINGLE USER
export async function getUser(req, res) {
  const { username } = req.params;
  try {
    if (!username) return res.status(501).send({ error: "Invalid username" });

    const singleUser = await UserModel.findOne({ username });
    singleUser.password = undefined; //remove password from user
    if (!singleUser) {
      res.status(501).send({
        message: "Couldn't find user",
        success: false,
      });
    }

    return res.status(201).send({
      success: true,
      message: "User fetched successfully",
      singleUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error while fetching user",
      success: false,
      error,
    });
  }
}

//!PUT-->UPDATE USER
export async function updateUser(req, res) {
  try {
    const _id = req.query.id;

    if (_id) {
      const body = req.body;

      // Check if the "password" field is included in the request body
      if (body.password) {
        return res.status(400).send({ error: "Password update not allowed" });
      }

      //update the data
      const updateUser = await UserModel.findByIdAndUpdate(_id, body, {
        new: true,
      });
      updateUser.password = undefined;

      res.status(201).send({
        success: true,
        message: "User data update successfully",
        updateUser,
      });
    } else {
      return res.status(401).send({ error: "User Not Found...!" });
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({
      message: "Error while updating user",
      success: false,
      error,
    });
  }
}

//!GET-->GENERATE OTP
export async function generateOTP(req, res) {
  res.json("generateOTP route");
}

//!GET-->VERIFY OTP
export async function verifyOTP(req, res) {
  res.json("verifyOTP route");
}

//successfully redirect user when OTP is valid
//!GET-->CREATE RESET SESSION
export async function createResetSession(req, res) {
  res.json("createResetSession route");
}

//update the password when we have valid session
//!PUT-->RESET PASSWORD
export async function resetPassword(req, res) {
  res.json("resetPassword route");
}
