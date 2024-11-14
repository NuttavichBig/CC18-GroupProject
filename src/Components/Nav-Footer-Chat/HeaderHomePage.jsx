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
  const [isSearchHover, setIsSearchHover] = useState(false);
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const setSearch = useUserStore((state) => state.setSearch);
  const { user, token, logout } = useUserStore(
    useShallow((state) => ({
      user: state.user,
      token: state.token,
      logout: state.logout,
    }))
  );

  const toSearchBar = () => {
    window.scrollTo({
      top: 750,
      behavior: "smooth",
    });
  };

  const handleMouseEnterLogin = () => setIsDropdownOpen(true);
  const handleMouseLeaveRegister = () => setIsDropdownOpen(false);

  const handleMouseEnterProfile = () => setIsProfileDropdownOpen(true);
  const handleMouseLeaveProfile = () => setIsProfileDropdownOpen(false);

  const handleHoverEnterSearch = () => setIsSearchHover(true);
  const handleHoverLeaveSearch = () => setIsSearchHover(false);

  const hdlChange = (e) => {
    setInput(e.target.value);
  };

  const hdlConfirm = () => {
    if (!input) {
      return;
    }
    setSearch(input);
    navigate(`/UUID`);
  };
  return (
    <>
      <div
        className="w-full justify-between flex items-center  text-white"
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

        <nav className=" flex justify-center space-x-16 tracking-widest uppercase text-[0.925rem]">
          <button onClick={toSearchBar} className="hover:text-gray-300">
            Booking
          </button>
          <Link to="/promotion" className="hover:text-gray-300">
            Travel Promotion
          </Link>
          <Link to="/user/registerpartner" className="hover:text-gray-300">
            Be Partner
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
          <div className="relative">
            <div
              className={`flex absolute  p-2 -top-5 ${
                isSearchHover ? "-left-[300px]" : "-z-10 -left-[392px]"
              }`}
              onMouseLeave={handleHoverLeaveSearch}
            >
              <input
                type="text"
                name="UUID"
                className={`rounded-l-full text-black px-4 opacity-75 border border-black border-opacity-75 bg-white origin-right transition-transform ${
                  isSearchHover ? "scale-100" : "scale-x-0"
                }`}
                onChange={hdlChange}
                value={input}
                placeholder="Your Booking Number"
              />
              <button
                className={`bg-orange-dark-gradient px-4 max-2xl:px-2 max-2xl:text-sm rounded-r-full ${
                  isSearchHover
                    ? "rounded-l-none w-[80px] max-2xl:w-[68px]"
                    : "rounded-l-full w-[172px] max-2xl:w-[160px]"
                }`}
                onMouseEnter={handleHoverEnterSearch}
                onClick={hdlConfirm}
              >
                {isSearchHover ? "Search" : "Find Your booking"}
              </button>
            </div>
          </div>

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
            <div className="flex gap-8 relative">
              <div
                className="uppercase tracking-wider cursor-pointer hover:bg-white hover:bg-opacity-10 border-white border rounded-lg py-1 px-2
              max-2xl:w-fit max-2xl:self-end"
              >
                Hello, Guest
              </div>
            </div>
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
