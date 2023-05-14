import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";

// Protected Route token base

export const requireSignIn = async (req, res, next) => {
  try {
    console.log(req.headers.authorization);
    const decode = JWT.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );

    //parsing
    req.user = decode;
    next();
  } catch (error) {
    console.log(error);
  }
};

//Admin Access
export const isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);
    if (user.role !== 1) {
      return res.status(401).send({
        success: false,
        message: "UnAuthorized Access",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      message: "Error in admin Middleware",
      error,
    });
  }
};
