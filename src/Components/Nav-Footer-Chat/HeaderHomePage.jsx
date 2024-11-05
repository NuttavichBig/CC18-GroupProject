import React, { useState } from "react";
import travellogo from "../../assets/TRAVELHOMELOGO-HOMEPAGE.png";
import Login from "../Login-Register-Account/Login";
import Register from "../Login-Register-Account/Register";
import { Link, useNavigate } from "react-router-dom";

const HeaderHomePage = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleMouseEnterLogin = () => setIsDropdownOpen(true);
  const handleMouseLeaveRegister = () => setIsDropdownOpen(false);

  const handleMouseEnterProfile = () => setIsProfileDropdownOpen(true);
  const handleMouseLeaveProfile = () => setIsProfileDropdownOpen(false);

  return (
    <div>
      <div
        className="w-full flex items-center text-white"
        style={{
          position: "absolute",
          top: -30,
          left: 0,
          zIndex: 10,
          backgroundColor: "rgba(0, 0, 0, 0.01)",

        }}
      >
        <img
          src={travellogo}
          alt="Travel Logo"
          className="ml-4 cursor-pointer"
          style={{
            width: "150px",
            zIndex: 3,
          }}
          onClick={() => navigate('/')}
        />

        <nav className="flex-grow flex justify-center space-x-8 text-xs tracking-widest uppercase">
          <Link to="/bookinghotel" className="hover:text-gray-300">
            Booking
          </Link>
          <Link to="/promotion" className="hover:text-gray-300">
            Travel Promotion
          </Link>
          <Link to="/partner/registerpartner" className="hover:text-gray-300">
            Contact Us
          </Link>

          {/* Login Dropdown */}
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
                  width: '100px',
                  transform: 'translateX(20%)',
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
        </nav>

        <div className="flex items-center space-x-4 mr-4">
          <div className="rounded-full border border-gray-500 cursor-pointer hover:bg-gray-200 transition p-2">
            🔍
          </div>

          {/* Profile Dropdown for "Hello, Guest!" */}
          <div className="relative">
            <span
              className="text-xs uppercase tracking-wider cursor-pointer hover:text-gray-300"
              onMouseEnter={handleMouseEnterProfile}
            >
              Hello, Guest!
            </span>

            {isProfileDropdownOpen && (
              <div
                className="absolute mt-1 bg-white bg-opacity-20 border border-white rounded-lg p-1"
                style={{
                  width: '80px',
                  transform: 'translateX(-30%)',
                }}
                onMouseEnter={handleMouseEnterProfile}
                onMouseLeave={handleMouseLeaveProfile}
              >
                <button
                  onClick={() => navigate('/userprofile')}
                  className="block text-center text-white rounded hover:bg-black hover:bg-opacity-10 transition duration-200 w-full"
                >
                  Profile
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
    </div>
  );
};

export default HeaderHomePage;
