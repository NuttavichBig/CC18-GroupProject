import React, { useEffect } from "react";
import NavbarPartner from "../../Components/Partner/NavbarPartner";
import SidebarPartner from "../../Components/Partner/SidebarPartner";
import { Outlet } from "react-router-dom";
import usePartnerStore from "../../stores/partner-store";

export default function HomePartner() {
  const setPartner = usePartnerStore(state=>state.setPartner)
  useEffect(()=>{
    setPartner()
  },[])
  return (
    <>
      <div className="h-screen w-full relative bg-white flex justify-center items-start">
        <div className="container mx-auto p-6 grid gap-5 h-full">
          {/* <NavbarPartner /> */}
          <div className="grid grid-cols-4 gap-6 h-full">
            <div className="col-span-1">
              <SidebarPartner />
            </div>
            <div className="col-span-3 h-full bg-white">
              <Outlet/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
