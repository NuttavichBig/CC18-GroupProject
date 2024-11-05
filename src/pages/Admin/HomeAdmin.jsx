import React from "react";
import NavbarAdmin from "../../Components/Admin/NavbarAdmin";
import SidebarAdmin from "../../Components/Admin/SidebarAdmin";
import { Outlet } from "react-router-dom";

export default function HomeAdmin() {
  return (
<<<<<<< HEAD
    <>
    {/* BG was not full */}
      <div className="h-screen w-full relative bg-[#FEF9F2] flex justify-center items-start">
        <div className="container mx-auto p-6 grid gap-5 h-full">
          <NavbarAdmin />
          <div className="grid grid-cols-3 gap-6 h-full">
            <div className="col-span-1">
              <SidebarAdmin />
            </div>
            <div className="col-span-2 h-full">
              <Outlet />
            </div>
=======
    <div className="h-screen bg-[#FEF9F2] flex justify-center items-start">
      <div className="container mx-auto p-6 grid gap-5 bg-white h-full w-full">
        <NavbarAdmin />
        <div className="grid grid-cols-3 gap-6 h-full">
          <div className="col-span-1 h-full">
            <SidebarAdmin />
          </div>
          <div className="col-span-2 h-full bg-white p-6 rounded-lg shadow-md">
            <Outlet />
>>>>>>> dev
          </div>
        </div>
      </div>
    </div>
  );
}
