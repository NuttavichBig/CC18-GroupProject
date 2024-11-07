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
    const navigate = useNavigate();
    const { user, token, logout } = useUserStore(useShallow(state => ({
        user: state.user,
        token: state.token,
        logout: state.logout
      })))
    const handleMouseEnterLogin = () => setIsDropdownOpen(true);
    const handleMouseLeaveRegister = () => setIsDropdownOpen(false);

    const handleMouseEnterProfile = () => setIsProfileDropdownOpen(true);
    const handleMouseLeaveProfile = () => setIsProfileDropdownOpen(false);
    return (
        <div>
            <div
                className="w-full flex items-center text-black"
                style={{
                    position: "absolute",
                    top: -30,
                    left: 0,
                    zIndex: 10,
                    backgroundColor: "white",
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
                    onClick={() => navigate('/')}
                />

                <nav className="flex-grow flex justify-center space-x-8 text-xs tracking-widest uppercase">
                    <Link to="/user/bookinghotel" className="hover:text-gray-300">
                        Booking
                    </Link>
                    <Link to="/user/promotion" className="hover:text-gray-300">
                        Travel Promotion
                    </Link>
                    <Link to="/user/registerpartner" className="hover:text-gray-300">
                        Contact Us
                    </Link>

                    {token ?
                    <div>
                    <span className="hover:text-gray-300 cursor-pointer"
                      onClick={logout}>
                      Logout
                    </span>
                  </div>
                    :
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
                                className="absolute mt-1 bg-gray-200 bg-opacity-20 border border-black rounded-lg p-2"
                                style={{
                                    width: '100px',
                                    transform: 'translateX(20%)', // ขยับ dropdown ไปทางขวา
                                }}
                                onMouseEnter={handleMouseEnterLogin} // คง dropdown เมื่อ hover ที่ dropdown เอง
                                onMouseLeave={handleMouseLeaveRegister} // ปิด dropdown เมื่อออกจาก dropdown
                            >
                                <a
                                    href="#register"
                                    className="block text-center text-black rounded  hover:bg-white hover:bg-opacity-10 transition duration-200"
                                    onClick={() => setIsRegisterModalOpen(true)}
                                >
                                    Register
                                </a>
                            </div>
                        )}
                    </div>}
                </nav>

                {/* Profile Dropdown for "Hello, Guest!" */}
                <div className="flex items-center space-x-4 mr-4">
                <div className="relative">
                    <span
                        className="text-xs uppercase tracking-wider cursor-pointer hover:text-gray-300"
                        onMouseEnter={handleMouseEnterProfile}
                    >
                         {token ? `Hello, ${user.firstName} ${user.lastName}` : 'Hello, Guest!'}
                    </span>

                    {isProfileDropdownOpen && (
                        <div
                            className="absolute mt-1 bg-white bg-opacity-20 border border-black rounded-lg p-1"
                            style={{
                                width: '80px',
                                transform: 'translateX(-30%)',
                            }}
                            onMouseEnter={handleMouseEnterProfile}
                            onMouseLeave={handleMouseLeaveProfile}
                        >
                            <button
                                onClick={() => navigate('/userprofile')}
                                className="block text-center text-black rounded hover:bg-black hover:bg-opacity-10 transition duration-200 w-full"
                            >
                                Profile
                            </button>
                        </div>
                    )}
                    </div>
                </div>
            </div>


            {isLoginModalOpen && <Login setIsLoginModalOpen={setIsLoginModalOpen} />}
            {
                isRegisterModalOpen && (
                    <Register setIsRegisterModalOpen={setIsRegisterModalOpen} />
                )
            }
        </div >
    );
};

export default HeaderUserPage;
