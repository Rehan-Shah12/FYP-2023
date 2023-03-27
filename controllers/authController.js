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
    } = req.body;

    if (!fname) {
      return res.send({ error: "First Name is Required" });
    }
    if (!lname) {
      return res.send({ error: "Last Name is Required" });
    }
    if (!email) {
      return res.send({ error: "Email is Required" });
    }
    if (!password) {
      return res.send({ error: "Password is Required" });
    }
    if (!phone) {
      return res.send({ error: "Phone is Required" });
    }
    if (!city) {
      return res.send({ error: "City is Required" });
    }
    if (!postcode) {
      return res.send({ error: "Postcode is Required" });
    }
    if (!country) {
      return res.send({ error: "Country is Required" });
    }
    if (!state) {
      return res.send({ error: "State is Required" });
    }
    if (!address) {
      return res.send({ error: "Address is Required" });
    }

    //Check User
    const existingUser = await userModel.findOne({ email });
    //Existing User
    if (existingUser) {
      return res.status(200).send({
        success: true,
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
