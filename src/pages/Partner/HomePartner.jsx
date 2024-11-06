import React from "react";
import NavbarPartner from "../../Components/Partner/NavbarPartner";
import SidebarPartner from "../../Components/Partner/SidebarPartner";
import { Outlet } from "react-router-dom";

export default function HomePartner() {
  return (
    <>
      <div className="h-screen w-full relative bg-[#FEF9F2] flex justify-center items-start">
        <div className="container mx-auto p-6 grid gap-5 h-full">
          <NavbarPartner />
          <div className="grid grid-cols-4 gap-6 h-full">
            <div className="col-span-1">
              <SidebarPartner />
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
