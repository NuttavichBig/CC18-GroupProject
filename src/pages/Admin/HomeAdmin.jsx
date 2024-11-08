import React from "react";
import NavbarAdmin from "../../Components/Admin/NavbarAdmin";
import SidebarAdmin from "../../Components/Admin/SidebarAdmin";
import { Outlet } from "react-router-dom";

export default function HomeAdmin() {
  return (
    <>
      <div className="flex flex-col p-8 gap-4 bg-[#F8F4E1]">
        <NavbarAdmin />
        <div className="flex gap-4">
          <div className="w-[25%]">
            <SidebarAdmin />
          </div>
          <div className="mx-auto">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}
