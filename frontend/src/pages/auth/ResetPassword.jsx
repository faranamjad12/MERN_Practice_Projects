import React from "react";
import AuthLayout from "../../layouts/AuthLayout";
import TextInput from "../../components/TextInput";
import ActionButton from "../../components/ActionButton";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import axios from "axios";
import { RESET_PASSWORD_URL } from "../../utils/api.js";
import { toast } from "react-hot-toast";

const ResetPassword = () => {
  // const [formData, setFormData] = useState({
  //   email: "",
  //   password: "",
  //  });
  // register;
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const handleResetPassword = async (data) => {
      try {
        const email = localStorage.getItem('useremail')
      data.email = email
      const response = await axios.post(RESET_PASSWORD_URL, data);
    //   console.log(response.data);
      if (response.data.status == true) {
        toast.success(response.data.message);
        localStorage.setItem("usertoken", response.data.token);
        navigate("/login");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Network error occurred");
      console.log("ERR:", error);
    }
    
  };

  // const handleChange = (e) => {
  //   setFormData({
  //     ...formData,
  //     [e.target.name]: e.target.value,
  //   });
  //   console.log(formData);
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //    console.log(formData);
  // };

  return (
    <AuthLayout>
      <div className="min-h-screen bg-slate-950 flex items-center justify-center px-6 py-10 relative overflow-hidden">
        {/* Background Glow */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-cyan-500/20 blur-3xl rounded-full"></div>
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-indigo-500/20 blur-3xl rounded-full"></div>

        <div className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl relative z-10">
          <div className="mb-8 text-center">
            <h1 className=" text-4xl font-bold text-white">
              Reset Your Password?
            </h1>

            <p className="text-slate-400 mt-3">
              Enter the OTP and your new password
            </p>
          </div>

          <form
            onSubmit={handleSubmit(handleResetPassword)}
            className="space-y-5"
          >
            <TextInput
            //   label="OTP"
              type="text"
              hint="Enter your given otp"
            //   className="otp"
              borderColor="#537AF8"
            //   name="otp"
            //   placeholder="Enter your given otp"
              // value={formData.email}
              // onChange={handleChange}
              {...register("otp")}
              className={"w-full"}
            />

            <TextInput
            //   label="password"
              type="password"
              hint="Enter your new password"
            //   className="password"
              borderColor="#537AF8"
            //   name="password"
            //   placeholder="Enter your new password"
              // value={formData.email}
              // onChange={handleChange}
              {...register("newPassword")}
              className={"w-full"}
            />

            {/* <TextInput
              label="Password"
              id="password"
              type="password"
              className="password"
              hint="••••••••"
              borderColor="#537AF8"
              name="password"
              placeholder="••••••••"
              // value={formData.password}
              // onChange={handleChange}
              {...register("password")}
              className={"w-full"}
            /> */}

            {/* <button
            type="submit"
            className="
              w-full
              py-3
              rounded-xl
              bg-gradient-to-r
              from-indigo-500
              to-cyan-500
              text-white
              font-semibold
              hover:scale-[1.02]
              transition-all
              duration-300
              shadow-lg
              shadow-cyan-500/20
            "
          >
            Sign In
          </button> */}
            <ActionButton text="Reset Password" className="w-full text-white" />
          </form>

          {/* <div className="flex items-center gap-3 my-7">
            <div className="flex-1 h-px bg-slate-700"></div>
            <span className="text-slate-500 text-sm">OR</span>
            <div className="flex-1 h-px bg-slate-700"></div>
          </div> */}

          {/* <div className="grid grid-cols-2 gap-4">
            <button className="bg-slate-800 hover:bg-slate-700 transition text-white py-3 rounded-xl">
              Google
            </button>

            <button className="bg-slate-800 hover:bg-slate-700 transition text-white py-3 rounded-xl">
              GitHub
            </button>
          </div> */}

          {/* <p className="text-center text-slate-400 mt-8">
            Don&apos;t have an account?{" "}
            <Link to={"/register"} className="text-cyan-400 hover:underline">
              Create Account
            </Link>
          </p> */}
          {/* <p className="text-center text-slate-400 mt-8">
           <div>
          <Link to={'/forgot-password'} className='text-cyan-400 hover:underline'>Forgot your password?</Link>
          </div>
          </p> */}
        </div>
      </div>
    </AuthLayout>
  );
};

export default ResetPassword;
