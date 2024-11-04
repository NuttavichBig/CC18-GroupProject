import React from "react";
import NavbarAdmin from "../../Components/Admin/NavbarAdmin";
import SidebarAdmin from "../../Components/Admin/SidebarAdmin";
import { Outlet } from "react-router-dom";

export default function HomeAdmin() {
  return (
    <>
      <div className="min-h-screen relative bg-[#FEF9F2] flex justify-center items-start">
        <div className="container mx-auto p-6 grid gap-5">
          <NavbarAdmin />
          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-1 ">
              <SidebarAdmin />
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
