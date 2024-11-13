import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import SidebarUser from "../../Components/UserProfile/SidebarUser";
import HeaderUserPage from "../../Components/Nav-Footer-Chat/HeaderUserPage";

export default function HomeAdmin() {

    return (
        <>
            <div className="min-h-screen relative bg-white flex justify-center items-start">
                <div className="container mx-auto p-6 grid gap-5">
                    <HeaderUserPage />
                    <div className="flex gap-20 justify-start mt-20">
                        <div className="">
                            <SidebarUser />
                        </div>
                        <div className="w-4/5">
                            <Outlet />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
