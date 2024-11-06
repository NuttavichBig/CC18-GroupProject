import React from "react";
import NavbarAdmin from "../../Components/Admin/NavbarAdmin";
import SidebarAdmin from "../../Components/Admin/SidebarAdmin";
import { Outlet } from "react-router-dom";

export default function HomeAdmin() {
  return (
    <>
    {/* BG was not full */}
      <div className="h-screen w-full relative bg-[#FEF9F2] flex justify-center items-start">
        <div className="container mx-auto p-6 grid gap-5 h-full">
          <NavbarAdmin />
          <div className="grid grid-cols-4 gap-6 h-full">
            <div className="col-span-1">
              <SidebarAdmin />
            </div>
            <div className="col-span-3 h-full">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
