import express from "express";
import {
  forgotPassword,
  login,
  register,
  resetPassword,
  verifyUser,
} from "./auth.controller.js";

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/forgot-password", forgotPassword);
authRouter.post("/reset-password", resetPassword);
authRouter.get("/verify-user", verifyUser);

export default authRouter;
