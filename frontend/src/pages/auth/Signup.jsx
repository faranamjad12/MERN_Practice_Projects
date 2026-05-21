import React from "react";
import AuthLayout from "../../layouts/AuthLayout";
import TextInput from "../../components/TextInput";
import ActionButton from "../../components/ActionButton";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import axios from "axios";
import { SIGNUP_URL } from "../../utils/api.js";
import toast from "react-hot-toast";

const Signup = () => {
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();

  const handleRegister = async (data) => {
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

  // const [formData, setFormData] = useState({
  //   name: "",
  //   email: "",
  //   password: "",
  //   confirmPassword: "",
  // });

  // const handleChange = (e) => {
  //   setFormData({
  //     ...formData,
  //     [e.target.name]: e.target.value,
  //   });
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   console.log(formData);
  // };

  return (
    <AuthLayout>
      <div className="min-h-screen bg-slate-950 flex  items-center justify-center px-6 py-10 relative overflow-hidden">
        {/* Background Glow */}
        <div className=" absolute top-0 left-0 w-72 h-72 bg-indigo-500/20 blur-3xl rounded-full"></div>
        <div className=" absolute bottom-0 right-0 w-72 h-72 bg-cyan-500/20 blur-3xl rounded-full"></div>

        <div className="w-full  max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl relative z-10">
          <div className=" mb-8 text-center">
            <h1 className="text-4xl font-bold text-white">Create Account</h1>

            <p className="text-slate-400 mt-3">
              Join and start building amazing things
            </p>
          </div>

          <form onSubmit={handleSubmit(handleRegister)} className=" space-y-5">
            <TextInput
              label="fullName"
              type="text"
              // name="fullName"
              className="fullName"
              // placeholder="John Doe"
              hint="John Doe"
              borderColor="#537AF8"
              // value={formData.name}
              // onChange={handleChange}
              {...register("fullName")}
            />

            <TextInput
              label="email"
              type="email"
              // name="email"
              className="email"
              // placeholder="john@example.com"
              hint="john@example.com"
              borderColor="#537AF8"
              // value={formData.email}
              // onChange={handleChange}
              {...register("email")}
            />
            {/* <div name="password" className="w[100px]"> */}
            {/* <Password> */}
            <TextInput
              label="password"
              type="password"
              // name="password"
              // placeholder="••••••••"
              hint="••••••••"
              className={"w-full"}
              // {'w-full'}
              // style={{ 'width': 'full' }}
              borderColor="#537AF8"
              // value={formData.password}
              // onChange={handleChange}
              {...register("password")}
            />
            {/* </Password> */}
            {/* </div> */}
            {/* <TextInput
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            placeholder="••••••••"
            value={formData.confirmPassword}
            onChange={handleChange}
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
            Create Account
            </button> */}

            <ActionButton text="SignUp" className="w-full text-white" />
          </form>

          <p className="text-center text-slate-400 mt-8">
            Already have an account?{" "}
            <Link to={"/login"} className="text-cyan-400 hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Signup;

// const EditNote = styled.div`
// `;

// const Password= styled.div`
// width:100vh
// border :"yellow"
// `;
