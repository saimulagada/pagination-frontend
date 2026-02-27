import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"

const Login = () => {
  const navigate = useNavigate();
    const [email,setEmail] = useState();
    const [password,setPassword]=useState();

  const handleLogin = async (e) => {
      e.preventDefault();

      try{
    const resp = await axios.post("http://localhost:3000/login",{
        email,
        password
    });
     console.log("resp is",resp)
    if (resp){
        localStorage.setItem("accessToken", resp.data.accessToken);
localStorage.setItem("refreshToken", resp.data.refreshToken);
                alert("login successful")
        navigate("/paginated-emails")
    }
     }
   
      catch(e){
         alert("invalid credentials")
        console.log("error is",e)
      }
  

  };

 

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-8">
        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Welcome Back
        </h2>

        {/* Form */}
        <form className="space-y-5" onSubmit={handleLogin}>
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition duration-300"

          >
            Login
          </button>
        </form>

        {/* Footer */}
       <p className="text-sm text-center text-gray-500 mt-6">
  Don’t have an account?{" "}
  <span
    className="text-indigo-600 font-medium cursor-pointer"
    onClick={() => navigate("/register")}
  >
    Sign up
  </span>
</p>
      </div>
    </div>
  );
};

export default Login;
