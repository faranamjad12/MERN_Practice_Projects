import bcrypt from "bcryptjs";
import User from "./auth.model.js";

export const register = async (req, res) => {
  const { fullName, email, password } = req.body;
  if (!fullName || !email || !password) {
    return res.send({
      status: false,
      message: "All Fields are Required",
    });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.send({
        status: false,
        message: "User already exist with this Email",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const encPass = await bcrypt.hash(password, salt);

    const user = await User.create({
      fullName,
      email,
      password: encPass,
    });

    if (!user) {
      return res.send({
        status: false,
        message: "Error occured while Registering User",
      });
    }

    return res.send({
      status: true,
      message: "User Registered Successfully",
      data: {
        fullName: user.fullName,
        email: user.email,
      },
    });
  } catch (error) {
    console.log("ERR:", error);
    return res.send({
      status: false,
      message: "Error occurred while registering user",
    });
  }
};

export const login = async (req, res) => {};

export const forgotPassword = async (req, res) => {};

export const resetPassword = async (req, res) => {};
