import React, { useEffect, useState } from "react";
import travellogo from "../../assets/TRAVELHOMELOGO-USER.png";
import useUserStore from "../../stores/user-store";
import { useShallow } from "zustand/shallow";
import {  useGoogleLogin } from "@react-oauth/google";
import googleloginbutton from "../../assets/googleloginbuttonanimation3.gif";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
const API = import.meta.env.VITE_API

const Login = ({ setIsLoginModalOpen }) => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    err: "",
  });
  const { token, login, loginWithGoogle } = useUserStore(
    useShallow((state) => ({
      token: state.token,
      login: state.login,
      loginWithGoogle: state.googleLogin,
    }))
  );
  const navigate = useNavigate();
  useEffect(() => {
    if (token) {
      setIsLoginModalOpen(false);
      getCheckRole();
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login({ email: input.email, password: input.password });
    } catch (err) {
      const errMsg = err?.response?.data?.message || err.message;
      setInput((prev) => ({ ...prev, err: errMsg }));
    }
  };

  const getCheckRole = async()=>{
    const result = await axios.get(`${API}/auth/user`,{
    headers:{
      Authorization: `Bearer ${token}`
    }
    })
    console.log(result.data.user.role)
    if(result.data.user.role === 'PARTNER'){
      navigate('/partner')
    }else if(result.data.user.role === 'ADMIN'){
      navigate('/admin')
    }
  }

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const accessToken = tokenResponse.access_token;
      if (accessToken) {
        try {
          await loginWithGoogle(accessToken);
          setIsLoginModalOpen(false);
        } catch (error) {
          console.error("Google login error:", error);
        }
      } else {
        console.error("No access token found in response.");
      }
    },
    onError: () => console.log("Google login failed"),
  });

  return (
    <div
      onClick={() => setIsLoginModalOpen(false)}
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 text-[#543310]"
    >
      <form
        onSubmit={handleSubmit}
        className="bg-[#FFF8EB] rounded-lg shadow-lg p-8 w-full max-w-3xl h-[400px] relative flex"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={() => setIsLoginModalOpen(false)}
          className="absolute top-4 right-4 text-gray-600 hover:text-red-500 focus:outline-none transition duration-200"
        >
          ✕
        </button>

        <div className="absolute top-[-4rem] left-1/2 transform -translate-x-1/2">
          <img
            src={travellogo}
            alt="Travel Logo"
            className="w-[100px] h-[100px] rounded-lg shadow-lg bg-[#FFF8EB]"
          />
        </div>

        <div className="w-1/2 pr-4 mt-6">
          <img
            src="/1.jpg"
            alt="Hotel Preview"
            className="w-full h-[295px] rounded-lg object-cover"
          />
        </div>

        <div className="w-1/2 pl-4 space-y-4">
          <div className="mt-8 space-y-4">
            <label>Email</label>
            <input
              name="email"
              type="email"
              placeholder="Email"
              className="bg-[#FFE4B0] w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
              onChange={handleChange}
            />
            <label className="block mt-4">Password</label>
            <input
              name="password"
              type="password"
              placeholder="Password"
              className="bg-[#FFE4B0] w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
              onChange={handleChange}
            />
          </div>
          <div className="flex justify-between">
    <div className="text-left text-xs text-red-500">
      {input.err}
    </div>
          <Link to={'/reset-password'} className="text-right text-xs pb-3 text-gray-400 cursor-pointer hover:underline">
            Forget Password
          </Link>
          </div>

          <button
            onClick={() => googleLogin()}
            type="button"
            className="flex items-center justify-center w-full"
            style={{
              outline: "none",
              border: "2px solid #ccc",
              borderRadius: "8px",
              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
              backgroundColor: "transparent",
              padding: "4px",
              margin: 0,
              transition: "box-shadow 0.3s ease, transform 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow =
                "0px 4px 8px rgba(0, 0, 0, 0.2)";
              e.currentTarget.style.transform = "scale(1.05)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow =
                "0px 2px 4px rgba(0, 0, 0, 0.1)";
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            <img
              src={googleloginbutton}
              alt="Google Login"
              className="w-[150px] h-[40px] rounded-lg"
              style={{
                transition: "transform 0.3s ease",
              }}
            />
          </button>
        </div>

        <div className="absolute bottom-[-20px] left-1/2 transform -translate-x-1/2">
          <button
            type="submit"
            className="font-bold shadow-lg bg-gradient-to-t from-orange-400 to-orange-500 text-white p-2 outline-none border-none transition-transform duration-200 rounded-lg overflow-hidden hover:scale-105 w-28 h-10"
          >
            LOGIN
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;