import React, { useState } from "react";
import loginIcons from "../assest/signin.gif";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import imageTobase64 from "../helpers/imageTobase64";
import SummarApi from "../common";
import { toast } from "react-toastify";
const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfrimPassword,setShowConfirmPassword]=useState(false)
  const [data, setData] = useState({
    email: "",
    password: "",
    name:"",
    confirmPassword:"",
    profilePic:"",
  });
  const navigate=useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit =async (e) => {
    e.preventDefault();

    //backend + fronend
    if(data.password === data.confirmPassword){

      const dataResponse=await fetch(SummarApi.signUp.url,{
        method:SummarApi.signUp.method,
        headers:{
          "content-type":"application/json"
        },
        body:JSON.stringify(data)
      })
  
      const dataApi=await dataResponse.json()

      if(dataApi.success){
        toast.success(dataApi.message)
      }else{
        toast.error(dataApi.message)
      }

    }else{
      toast.error("Password and Confirm Password are not same")
    }
   
  };

  const handleUploadPic=async (e)=>{
    const file=e.target.files[0]
    const imagePic=await imageTobase64(file)
    setData((prev)=>{
      return{
        ...prev,profilePic:imagePic
      }
    })
  }
  console.log(data);
  return (
    <section id="signup">
      <div className="container mx-auto p-4">
        <div className="bg-white p-5 w-full max-w-sm mx-auto">
          <div className="w-20 h-20 mx-auto relative overflow-hidden rounded-full">
            <div>
            <img src={data.profilePic || loginIcons} alt="login icon" />
            </div>
            <form>
              <label>
                 <input type="file" className="hidden" onChange={handleUploadPic}/>
                 <div className="text-xs bg-opacity-80 bg-slate-200 pb-4 pt-2 cursor-pointer text-center absolute bottom-0 w-full">
                  Upload Photo
              </div>
              </label>
             
            </form>
           
          </div>

          <form className="pt-6 flex flex-col gap-2
          " onSubmit={handleSubmit}>
            <div className="grid">
              <label>Name :</label>
              <div className="bg-slate-200 p-2 ">
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="w-full h-full outline-none bg-transparent"
                  onChange={handleChange}
                  name="name"
                  value={data.name}
                  required
                />
              </div>
            </div>
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
                  required
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
                  required
                />
                <div
                  className="cursor-pointer text-xl"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  <span>{showPassword ? <FaEyeSlash /> : <FaEye />}</span>
                </div>
              </div>
            </div>

            <div className="grid">
              <label>Confirm Password :</label>
              <div className="bg-slate-200 p-2 flex items-center">
                <input
                  type={showConfrimPassword? "text" : "password"}
                  placeholder="Enter confirm password"
                  className="w-full h-full outline-none bg-transparent"
                  onChange={handleChange}
                  name="confirmPassword"
                  value={data.confirmPassword}
                  required
                />
                <div
                  className="cursor-pointer text-xl"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                >
                  <span>{showConfrimPassword ? <FaEyeSlash /> : <FaEye />}</span>
                </div>
              </div>

            </div>

            <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6">
              Sign Up
            </button>
          </form>
          <p className="my-5">
            Already have an account?{" "}
            <Link
              to={"/login"}
              className="hover:underline text-red-500 hover:text-red-700"
            >
            Login
            </Link>{" "}
          </p>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
