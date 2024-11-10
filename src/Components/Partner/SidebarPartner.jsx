import React from "react";
import TRAVELHOMELOGOUSER from "../../assets/TRAVELHOMELOGO-HOMEPAGE.png";
import { Link } from "react-router-dom";
import useUserStore from "../../stores/user-store";

export default function SidebarPartner() {
  const logout = useUserStore(state=>state.logout)

  return (
    <>
      <div className="bg-[#543310] h-screen flex flex-col rounded-lg">
        <div className="text-center">
          <div>
            <img
              src={TRAVELHOMELOGOUSER}
              alt=""
              className="w-[40%] mx-auto mb-4"
            />
          </div>
          <div action="" className="flex flex-col space-y-4 items-center">
            <Link
              to={"bookingDetailPartner"}
              className="w-full bg-[#F8F4E1] bg-opacity-30 font-semibold text-lg text-[#F8F4E1] p-3 hover:bg-[#F8F4E1] hover:text-amber-950 transition-all duration-100 ease-in-out"
            >
              BOOKING
            </Link>
            <Link
              to={"hotelPartner"}
              className="w-full bg-[#F8F4E1] bg-opacity-30 font-semibold text-lg text-[#F8F4E1] p-3 hover:bg-[#F8F4E1] hover:text-amber-950 transition-all duration-100 ease-in-out "
            >
              ROOMS
            </Link>
            <Link
              to={"reviewDetailPartner"}
              className="w-full bg-[#F8F4E1] bg-opacity-30 font-semibold text-lg text-[#F8F4E1] p-3 hover:bg-[#F8F4E1] hover:text-amber-950 transition-all duration-100 ease-in-out "
            >
              REVIEWS
            </Link>
            <Link
              to={"partnerUpdate"}
              className="w-full bg-[#F8F4E1] bg-opacity-30 font-semibold text-lg text-[#F8F4E1] p-3 hover:bg-[#F8F4E1] hover:text-amber-950 transition-all duration-100 ease-in-out "
            >
              UPDATE PROFILE PARTNER
            </Link>
            <Link
              to={"HotelUpdate"}
              className="w-full bg-[#F8F4E1] bg-opacity-30 font-semibold text-lg text-[#F8F4E1] p-3 hover:bg-[#F8F4E1] hover:text-amber-950 transition-all duration-100 ease-in-out "
            >
              UPDATE HOTEL DETAIL
            </Link>
            <Link to={'/'} className="w-full bg-[#F8F4E1] bg-opacity-30 font-semibold text-lg text-[#F8F4E1] p-3 hover:bg-[#F8F4E1] hover:text-amber-950 transition-all duration-100 ease-in-out "
            onClick={()=>logout()}>
              LOGOUT
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
