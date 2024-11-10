import React, { useState } from "react";
import travellogo from "../../assets/TRAVELHOMELOGO-HOMEPAGE.png";
import Login from "../Login-Register-Account/Login";
import Register from "../Login-Register-Account/Register";
import { Link, useNavigate } from "react-router-dom";
import useUserStore from "../../stores/user-store";
import { useShallow } from "zustand/shallow";

const HeaderHomePage = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const { user, token, logout } = useUserStore(
    useShallow((state) => ({
      user: state.user,
      token: state.token,
      logout: state.logout,
    }))
  );

  const handleMouseEnterLogin = () => setIsDropdownOpen(true);
  const handleMouseLeaveRegister = () => setIsDropdownOpen(false);

  const handleMouseEnterProfile = () => setIsProfileDropdownOpen(true);
  const handleMouseLeaveProfile = () => setIsProfileDropdownOpen(false);

  return (
    <>
      <div
        className="w-full h-[100px] flex items-center text-white"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 10,
          background: "linear-gradient(180deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.5) 30%, rgba(0, 0, 0, 0) 100%)",
        }}
      >


        <img
          src={travellogo}
          alt="Travel Logo"
          className="mx-4 my-4 cursor-pointer"
          style={{
            width: "150px",
            zIndex: 3,
          }}
          onClick={() => navigate("/")}
        />

        <nav className="flex-grow flex justify-center space-x-8 text-xs tracking-widest uppercase">
          <Link to="/bookinghotel" className="hover:text-gray-300">
            Booking
          </Link>
          <Link to="/promotion" className="hover:text-gray-300">
            Travel Promotion
          </Link>
          <Link to="/user/registerpartner" className="hover:text-gray-300">
            Contact Us
          </Link>



          {token ? (
            <div>
              <span
                className="hover:text-gray-300 cursor-pointer"
                onClick={logout}
              >
                Logout
              </span>
            </div>
          ) : (
            <div className="relative">
              <span
                className="hover:text-gray-300 cursor-pointer"
                onClick={() => setIsLoginModalOpen(true)}
                onMouseEnter={handleMouseEnterLogin}
              >
                Login
              </span>

              {isDropdownOpen && (
                <div
                  className="absolute mt-1 bg-white bg-opacity-20 border border-white rounded-lg p-2"
                  style={{
                    width: "100px",
                    transform: "translateX(20%)",
                  }}
                  onMouseEnter={handleMouseEnterLogin}
                  onMouseLeave={handleMouseLeaveRegister}
                >
                  <a
                    href="#register"
                    className="block text-center text-white rounded hover:bg-black hover:bg-opacity-10 transition duration-200"
                    onClick={() => setIsRegisterModalOpen(true)}
                  >
                    Register
                  </a>
                </div>
              )}
            </div>
          )}
        </nav>
        <div className="space-x-4 pr-12 flex items-center">
          <div className="relative">
            <span
              className="text-xs uppercase tracking-wider cursor-pointer hover:text-gray-300"
              onMouseEnter={handleMouseEnterProfile}
            >
              {token
                ? `Hello, ${user.firstName} ${user.lastName}`
                : "Hello, Guest!"}
            </span>

            {isProfileDropdownOpen && (
              <div
                className="absolute mt-1 bg-white bg-opacity-20 border border-white rounded-lg p-2"
                style={{
                  width: "100px",
                  transform: "translateX(20%)",
                }}
                onMouseEnter={handleMouseEnterProfile}
                onMouseLeave={handleMouseLeaveProfile}
              >
                <button
                  onClick={() => navigate("/userprofile")}
                  className="block text-center text-white rounded text-xs hover:bg-black hover:bg-opacity-10 transition duration-200"
                >
                  PROFILE
                </button>
              </div>
            )}
          </div>
        </div>

      </div>

      {isLoginModalOpen && <Login setIsLoginModalOpen={setIsLoginModalOpen} />}
      {isRegisterModalOpen && (
        <Register setIsRegisterModalOpen={setIsRegisterModalOpen} />
      )}
    </>
  );
};

export default HeaderHomePage;
