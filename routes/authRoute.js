import express from "express";
import {
  registerController,
  loginController,
  testController,
} from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Register Signup
router.post("/register", registerController);

// Login POST

router.post("/login", loginController);

//Test Route Dummy
router.get("/test", requireSignIn, isAdmin, testController);

export default router;
