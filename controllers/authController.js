import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import JWT from "jsonwebtoken";

export const registerController = async (req, res) => {
  try {
    const {
      fname,
      lname,
      email,
      password,
      phone,
      city,
      postcode,
      country,
      state,
      address,
      answer,
      role,
    } = req.body;

    if (!fname) {
      return res.send({ message: "First Name is Required" });
    }
    if (!lname) {
      return res.send({ message: "Last Name is Required" });
    }
    if (!email) {
      return res.send({ message: "Email is Required" });
    }
    if (!password) {
      return res.send({ message: "Password is Required" });
    }
    if (!phone) {
      return res.send({ message: "Phone is Required" });
    }
    if (!city) {
      return res.send({ message: "City is Required" });
    }
    if (!postcode) {
      return res.send({ message: "Postcode is Required" });
    }
    if (!country) {
      return res.send({ message: "Country is Required" });
    }
    if (!state) {
      return res.send({ message: "State is Required" });
    }
    if (!address) {
      return res.send({ message: "Address is Required" });
    }
    if (!answer) {
      return res.send({ message: "Answer is Required" });
    }
    // if (!role) {
    //   return res.send({ message: "Role is Required" });
    // }

    //Check User
    const existingUser = await userModel.findOne({ email });
    //Existing User
    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "Already Registered Please Login",
      });
    }

    const hashedPassword = await hashPassword(password);

    //save
    const user = await new userModel({
      fname,
      lname,
      email,
      password: hashedPassword,
      phone,
      city,
      postcode,
      country,
      state,
      address,
      answer,
      role,
    }).save();

    res.status(201).send({
      success: true,
      message: "User Registered Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Registeration",
      error,
    });
  }
};

// POST LOGIN
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    //Validation
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid Email or Password",
      });
    }

    //Check User
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not Registered",
      });
    }

    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid Password",
      });
    }

    //Token
    //Things we are passing
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).send({
      success: true,
      message: "Login Successfully",
      user: {
        fname: user.fname,
        lname: user.lname,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Login",
      error,
    });
  }
};

// Forgot Password
export const forgotPasswordController = async (req, res) => {
  try {
    const { email, answer, newPassword } = req.body;
    if (!email) {
      res.status(400).send({ message: "Email is required" });
    }
    if (!answer) {
      res.status(400).send({ message: "Answer is required" });
    }
    if (!newPassword) {
      res.status(400).send({ message: "New Password is required" });
    }

    // Checking Email & Answer are correct or not

    const user = await userModel.findOne({ email, answer });
    //Validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Wrong Email or Answer",
      });
    }

    const hashed = await hashPassword(newPassword);
    await userModel.findByIdAndUpdate(user._id, { password: hashed });
    res.status(200).send({
      success: true,
      message: "Password Reset Successfully",
    });
  } catch (error) {
    console.log(error);
    res.state(500).send({
      success: false,
      message: "Something Went Wrong",
      error,
    });
  }
};

// Test Controller

export const testController = (req, res) => {
  res.send("Protected Route");
};
