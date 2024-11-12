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
        className="w-full flex items-center text-white"
        style={{
          position: "absolute",
          top: -30,
          left: 0,
          zIndex: 10,
          background:
            "linear-gradient(180deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.5) 30%, rgba(0, 0, 0, 0) 100%)",
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

        <nav className="flex-grow flex justify-center space-x-16 tracking-widest uppercase">
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
                  className="absolute mt-4 rounded-lg p-2 flex items-center justify-center"
                  style={{
                    width: "100px",
                    height: "35px",
                    transform: "translateX(0%)",
                  }}
                  onMouseEnter={handleMouseEnterLogin}
                  onMouseLeave={handleMouseLeaveRegister}
                >
                  <a
                    href="#register"
                    className="text-center p-2 hover:bg-white hover:bg-opacity-10  rounded-lg border border-[#ffffff] transition duration-150 "
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
          {token ? (
            <div className="relative">
              <span
                className="uppercase tracking-wider cursor-pointer hover:text-gray-300 text-sm border rounded-full p-3"
                onMouseEnter={handleMouseEnterProfile}
              >
                Hello, {user.firstName} {user.lastName}
              </span>

              {isProfileDropdownOpen && (
                <div
                  className="absolute mt-4 border border-white rounded-lg"
                  style={{
                    transform: "translateX(0%)",
                  }}
                  onMouseEnter={handleMouseEnterProfile}
                  onMouseLeave={handleMouseLeaveProfile}
                >
                  <button
                    onClick={() => navigate("/userprofile")}
                    className="p-2 block text-center rounded hover:bg-white hover:bg-opacity-10 transition duration-150 w-full"
                  >
                    PROFILE
                  </button>
                </div>
              )}
            </div>
          ) : (
            <span className="uppercase tracking-wider cursor-pointer hover:bg-white hover:bg-opacity-10 border-white border rounded-full text-sm p-3">
              Hello, Guest !
            </span>
          )}
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
