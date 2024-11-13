import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import defaultPic from '../../assets/ProfilePicture.webp';
import useUserStore from '../../stores/user-store';

function SidebarUser() {
    const profileImage = useUserStore(state => state.user?.image);
    const FirstName = useUserStore(state => state.user?.firstName);
    const LastName = useUserStore(state => state.user?.lastName);
    const location = useLocation();

    return (
        <div className="bg-gradient-to-b from-cream to-light-cream border pb-40 p-8 rounded-2xl shadow-lg w-[350px] text-center relative mt-20 ml-16">
{
    location === 'userprofile' &&
                <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 w-28 h-28 rounded-full shadow-lg overflow-hidden border-4 border-white bg-white">
                <img
                    src={profileImage || defaultPic}
                    alt="User Profile"
                    className="w-full h-full object-cover"
                    />
            </div>
                }
          
            
            <div className="mt-10">
                <h3 className="text-2xl font-semibold text-[#543310]">
                    {FirstName || LastName ? `${FirstName || ''} ${LastName || ''}` : 'Guest'}
                </h3>
                <hr className="my-4 border-[#543310]  mx-auto" />
                
                <ul className="text-[#543310] space-y-6 mt-6 text-lg">
                    <li>
                        <NavLink
                            to="/userprofile"
                            end
                            className={({ isActive }) =>
                                isActive ? 'text-orange-500 font-bold' : 'hover:text-orange-500 cursor-pointer transition duration-300'
                            }
                        >
                            My Account
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/userprofile/achievements"
                            className={({ isActive }) =>
                                isActive ? 'text-orange-500 font-bold' : 'hover:text-orange-500 cursor-pointer transition duration-300'
                            }
                        >
                            My Achievement
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/userprofile/purchasehistory"
                            className={({ isActive }) =>
                                isActive ? 'text-orange-500 font-bold' : 'hover:text-orange-500 cursor-pointer transition duration-300'
                            }
                        >
                            My Purchase
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/userprofile/reviewhistory"
                            className={({ isActive }) =>
                                isActive ? 'text-orange-500 font-bold' : 'hover:text-orange-500 cursor-pointer transition duration-300'
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
