import bcrypt from "bcryptjs";
import User from "./auth.model.js";
import jwt from "jsonwebtoken";
import { generateOTP, sendEmail } from "../../utils/common.js";

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

export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.send({
      status: false,
      message: "All fields are required",
    });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.send({
        status: false,
        message: "User not found",
      });
    }

    const isMatched = await bcrypt.compare(password, user.password); // true
    const secret = "notlifyapp107";

    // dbiwuq2992f8g239f3.f3j339fj3900322f2qjf2.f23uf0u2f22452
    if (isMatched) {
      const token = jwt.sign(
        { id: user._id, name: user.fullName, email: user.email },
        secret,
        { expiresIn: "7d" },
      );

      return res.send({
        status: true,
        message: "Loggedin successfull",
        token,
      });
    }

    return res.send({
      status: false,
      message: "Credentials don't matched",
    });
  } catch (error) {
    console.log("ERR:", error);
  }
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.send({
        status: false,
        message: "User not found with this email",
      });
    }

    const otp = generateOTP();

    user.otp = otp;
    user.isOtpverified = false;

    await user.save();

    const html = `<p>Your OTP code is:<b>${otp}</b></p>`;

    sendEmail(email, "Password Reset OTP", html);

    return res.send({
      status: true,
      message: "OTP send to your email",
    });
  } catch (error) {
    console.log("ERR:", error);
  }

  console.log("OTP Code:", otp);
};

export const resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.send({
        status: false,
        message: "User not found with this email",
      });
    }

    if (user.otp !== otp) {
      return res.send({
        status: false,
        message: "Given OTP is invalid",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const encPass = await bcrypt.hash(newPassword, salt);
    user.password = encPass;
    user.isOTPverified = true;
    user.otp = null;

    await user.save();
    return res.send({
      status: true,
      message: "Password reset successfull",
    });
  } catch (error) {
    console.log("ERR:", error);
  }
};
