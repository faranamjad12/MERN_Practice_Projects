import React from "react";
import AuthLayout from "../../layouts/AuthLayout";
import TextInput from "../../components/TextInput";
import ActionButton from "../../components/ActionButton";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { SIGNUP_URL } from "../../utils/api.js";

const Signup = () => {
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();

  const handleRegister = async (data) => {
    // console.log(data);
    try {
      const response = await axios.post(SIGNUP_URL, data);

      if (response.data.status == true) {
        toast.success(response.data.message);
        reset();
        navigate("/login");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log("ERR: ", error);
    }
  };

  return (
    <AuthLayout>
      <h1 className="text-3xl font-bold mb-2">Welcome to Notify</h1>
      <h1 className="text-xl mb-4">New here!</h1>
      <form onSubmit={handleSubmit(handleRegister)}>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="username"
          >
            Full Name
          </label>
          <TextInput
            id="fullName"
            type="text"
            {...register("fullName")}
            hint="Enter your full name"
            className="py-2 px-4 rounded-lg w-full border border-gray-300 bg-gray-100"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="username"
          >
            Email
          </label>
          <TextInput
            id="email"
            type="email"
            {...register("email")}
            hint="Enter your email"
            className="py-2 px-4 rounded-lg w-full border border-gray-300 bg-gray-100"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="username"
          >
            Password
          </label>
          <TextInput
            id="password"
            type="password"
            {...register("password")}
            hint="Enter your password"
            className="py-2 px-4 rounded-lg w-full border border-gray-300 bg-gray-100"
          />
        </div>

        <div className="flex items-center gap-4">
          <ActionButton text="Signup" />
          <Link to={"/login"} className="hover:text-blue-500">
            Already have an account? Login
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
};

export default Signup;
