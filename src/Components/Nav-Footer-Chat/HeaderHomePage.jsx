import React, { useState } from "react";
import travellogo from "../../assets/TRAVELHOMELOGO-HOMEPAGE.png";
import Login from "../Login-Register-Account/Login";
import Register from "../Login-Register-Account/Register";
import { Link } from "react-router-dom";


const HeaderHomePage = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleMouseEnterLogin = () => setIsDropdownOpen(true);
  const handleMouseLeaveRegister = () => setIsDropdownOpen(false);

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
          className="ml-4"
          style={{
            width: "150px",
            zIndex: 3,
          }}
        />

        <nav className="flex-grow flex justify-center space-x-8 text-xs tracking-widest uppercase">
          <Link to="/select-hotel" className="hover:text-gray-300">
            Booking
          </Link>
          <Link to="/promotion" className="hover:text-gray-300">
            Travel Promotion
          </Link>
          <a href="#contact" className="hover:text-gray-300">
            Contact Us
          </a>

          {/* Wrapper for Login and Register Dropdown */}
          <div className="relative">
            <span
              className="hover:text-gray-300 cursor-pointer"
              onClick={() => setIsLoginModalOpen(true)} // แก้ไขตรงนี้เพื่อเปิด Login modal
              onMouseEnter={handleMouseEnterLogin} // แสดง dropdown เมื่อ hover ที่ Login
            >
              Login
            </span>


            {/* Register Dropdown */}
            {isDropdownOpen && (
              <div
                className="absolute mt-1 bg-white bg-opacity-20 border border-white rounded-lg p-2"
                style={{
                  width: '100px',
                  transform: 'translateX(20%)', // ขยับ dropdown ไปทางขวา
                }}
                onMouseEnter={handleMouseEnterLogin} // คง dropdown เมื่อ hover ที่ dropdown เอง
                onMouseLeave={handleMouseLeaveRegister} // ปิด dropdown เมื่อออกจาก dropdown
              >
                <a
                  href="#register"
                  className="block text-center text-white rounded  hover:bg-black hover:bg-opacity-10 transition duration-200"
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
          <span className="text-xs uppercase tracking-wider">
            Hello, Guest!
          </span>
        </div>
      </div>

      {/* Modals */}
      {isLoginModalOpen && <Login setIsLoginModalOpen={setIsLoginModalOpen} />}
      {isRegisterModalOpen && (
        <Register setIsRegisterModalOpen={setIsRegisterModalOpen} />
      )}
    </div>
  );
};

export default HeaderHomePage;
