import React, { useContext, useState } from "react";
import loginIcons from "../assest/signin.gif";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import SummarApi from "../common";
import { toast } from "react-toastify";
import Context from "../context";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const { fetchUserDetails, fetchUserAddToCart } = useContext(Context);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataResponse = await fetch(SummarApi.signIn.url, {
      method: SummarApi.signIn.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const dataApi = await dataResponse.json();
    if (dataApi.success) {
      toast.success(dataApi.message);
      navigate("/");
      fetchUserDetails();
      fetchUserAddToCart();
    }

    if (dataApi.error) {
      toast.error(dataApi.message);
    }
  };
  // console.log(data);

  return (
    <section id="login">
      <div className="container mx-auto p-4">
        <div className="bg-white p-5 w-full max-w-sm mx-auto">
          <div className="w-20 h-20 mx-auto">
            <img src={loginIcons} alt="login icon" />
          </div>

          <form className="pt-6 flex flex-col gap-2" onSubmit={handleSubmit}>
            <div className="grid">
              <label>Email :</label>
              <div className="bg-slate-200 p-2 ">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full h-full outline-none bg-transparent"
                  onChange={handleChange}
                  name="email"
                  value={data.email}
                />
              </div>
            </div>
            <div className="grid">
              <label>Password :</label>
              <div className="bg-slate-200 p-2 flex items-center">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  className="w-full h-full outline-none bg-transparent"
                  onChange={handleChange}
                  name="password"
                  value={data.password}
                />
                <div
                  className="cursor-pointer text-xl"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  <span>{showPassword ? <FaEyeSlash /> : <FaEye />}</span>
                </div>
              </div>

              <Link
                to={"/forget-password"}
                className="block w-fit ml-auto hover:underline hover:text-red-700 py-2"
              >
                Forget Password?
              </Link>
            </div>

            <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6">
              Login
            </button>
          </form>
          <p className="my-5">
            Don't have an account?{" "}
            <Link
              to={"/sign-up"}
              className="hover:underline text-red-500 hover:text-red-700"
            >
              Sign Up
            </Link>{" "}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
