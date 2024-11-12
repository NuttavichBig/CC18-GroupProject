import React, { useState } from "react";
import travellogo from "../../assets/TRAVELHOMELOGO-USER.png";
import Login from "../Login-Register-Account/Login";
import Register from "../Login-Register-Account/Register";
import { Link, useNavigate } from "react-router-dom";
import useUserStore from "../../stores/user-store";
import { useShallow } from "zustand/shallow";

const HeaderUserPage = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isSearchHover , setIsSearchHover] =useState(false)
  const [input, setInput] = useState('');
  const setSearch = useUserStore(state => state.setSearch)
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

  const handleHoverEnterSearch = ()=>setIsSearchHover(true);
  const handleHoverLeaveSearch = ()=>setIsSearchHover(false); 
  const hdlChange = (e) => {
    setInput(e.target.value)
  }

  const hdlConfirm = () => {
    if (!input) {
      return
    }
    setSearch(input)
    navigate('/UUID')
  }
  return (
    <div>
      <div
        className="w-full flex items-center justify-between text-[#543310] absolute -top-[30px] left-0 z-10"
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
          <Link to="/user/bookinghotel" className="hover:text-gray-300">
            Booking
          </Link>
          <Link to="/user/promotion" className="hover:text-gray-300">
            Travel Promotion
          </Link>
          <Link to="/user/registerpartner" className="hover:text-gray-300">
            Contact Us
          </Link>

          {token ? (
            <div>
              <Link
                to={"/"}
                className="hover:text-gray-300 cursor-pointer"
                onClick={logout}
              >
                Logout
              </Link>
            </div>
          ) : (
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
                  className="absolute mt-4 bg-white bg-opacity-20 "
                  style={{
                    transform: "translateX(0%)",
                  }}
                  onMouseEnter={handleMouseEnterLogin}
                  onMouseLeave={handleMouseLeaveRegister}
                >
                  <a
                    href="#register"
                    className="text-center p-2 hover:bg-orange-500 hover:bg-opacity-10  rounded-lg border border-[#543310] transition duration-150 "
                    onClick={() => setIsRegisterModalOpen(true)}
                  >
                    Register
                  </a>
                </div>
              )}
            </div>
          )}
        </nav>

        {/* Profile Dropdown for "Hello, Guest!" */}
        <div className="flex items-center space-x-4 mr-12">
        <div className="flex absolute right-52 p-2" onMouseLeave={handleHoverLeaveSearch}>
            <input type="text" name="UUID" 
            className={`rounded-l-full text-black px-4 opacity-75 border border-black border-opacity-75 bg-white origin-right transition-transform ${isSearchHover ? 'scale-100': 'scale-x-0'}`}
              onChange={hdlChange} value={input} placeholder="Your Booking Number" />
            <button className={`bg-orange-dark-gradient px-4 max-2xl:px-2 max-2xl:text-sm rounded-r-full text-white ${isSearchHover?"rounded-l-none": "rounded-l-full"}`}
            onMouseEnter={handleHoverEnterSearch}
              onClick={hdlConfirm}>{isSearchHover ? 'Search': 'Find Your booking'}</button>
          </div>
          <div className="relative">
           
            <span
              className=" uppercase tracking-wider cursor-pointer hover:bg-orange-500 hover:bg-opacity-10 border-[#543310] border rounded-full text-sm p-3"
              onMouseEnter={handleMouseEnterProfile}
            >
              {token
                ? `Hello, ${user.firstName} ${user.lastName}`
                : "Hello, Guest !"}
            </span>

            {isProfileDropdownOpen && (
              <div
                className="absolute mt-4 bg-white bg-opacity-20 border border-[#543310]  rounded-lg"
                style={{
                  transform: "translateX(0%)",
                }}
                onMouseEnter={handleMouseEnterProfile}
                onMouseLeave={handleMouseLeaveProfile}
              >
                <button
                  onClick={() => navigate("/userprofile")}
                  className=" text-center p-2 hover:bg-orange-500 hover:bg-opacity-10 transition duration-150 "
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
    </div>
  );
};

export default HeaderUserPage;