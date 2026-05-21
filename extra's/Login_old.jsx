import React from "react";
import AuthLayout from "../frontend/src/layouts/AuthLayout";
import TextInput from "../frontend/src/components/TextInput";
import ActionButton from "../frontend/src/components/ActionButton";
import { Link } from "react-router";

const Login = () => {
  return (
    <AuthLayout>
      <h1 className="text-3xl font-bold mb-2">Welcome to Notify</h1>
      <h1 className="text-xl mb-4">Sign in to Continue</h1>
      <form>
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
            hint="Enter your password"
            className="py-2 px-4 rounded-lg w-full border border-gray-300 bg-gray-100"
          />
        </div>

        <div className="flex items-center gap-4">
          <ActionButton text="Login" />
          <Link to={"/register"} className="hover:text-blue-500">
            Don't have an account? Signup
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
};

export default Login;
