import React from 'react';
import { NavLink } from 'react-router-dom';
import defaultPic from '../../assets/ProfilePicture.webp';
import useUserStore from '../../stores/user-store';

function SidebarUser() {
    const profileImage = useUserStore(state => state.user?.image);
    const FirstName = useUserStore(state => state.user?.firstName);
    const LastName = useUserStore(state => state.user?.lastName);
    return (
        <div className="bg-white border p-6 rounded-lg shadow-md w-[300px] text-center relative mt-16 ml-14 ">
            <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 w-24 h-24 rounded-full shadow-md overflow-hidden bg-white">
                <img
                    src={profileImage || defaultPic}
                    alt="User Profile"
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="mt-2">
                <h3 className="text-center text-base font-semibold">{FirstName || LastName ? `${FirstName || ''} ${LastName || ''}` : 'Guest'}</h3>
                <hr className="my-2 border-gray-400 w-full mx-auto" />
                <ul className="text-gray-700 space-y-6 mt-4">
                    <li>
                        <NavLink
                            to="/userprofile/edit"
                            end
                            className={({ isActive }) =>
                                isActive ? 'text-orange-500 font-bold' : 'hover:text-orange-500 cursor-pointer'
                            }
                        >
                            My Account
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/userprofile/achievements"
                            className={({ isActive }) =>
                                isActive ? 'text-orange-500 font-bold' : 'hover:text-orange-500 cursor-pointer'
                            }
                        >
                            My Achievement
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/userprofile/purchasehistory"
                            className={({ isActive }) =>
                                isActive ? 'text-orange-500 font-bold' : 'hover:text-orange-500 cursor-pointer'
                            }
                        >
                            My Purchase
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/userprofile/reviewhistory"
                            className={({ isActive }) =>
                                isActive ? 'text-orange-500 font-bold' : 'hover:text-orange-500 cursor-pointer'
                            }
                        >
                            Review
                        </NavLink>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default SidebarUser;
