import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import SidebarUser from "../../Components/UserProfile/SidebarUser";
import HeaderUserPage from "../../Components/Nav-Footer-Chat/HeaderUserPage";

export default function HomeAdmin() {
    const [profileImage, setProfileImage] = useState(null);
    return (
        <>
            <div className="min-h-screen relative bg-white flex justify-center items-start">
                <div className="container mx-auto p-6 grid gap-5">
                    <HeaderUserPage />
                    <div className="grid grid-cols-3 gap-6 mt-20">
                        <div className="col-span-1 ml-20">
                            <SidebarUser profileImage={profileImage} />
                        </div>
                        <div className="col-span-2  h-screen">
                            <Outlet />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
