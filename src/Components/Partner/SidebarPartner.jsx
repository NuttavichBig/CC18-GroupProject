import React from "react";
import TRAVELHOMELOGOUSER from "../../assets/TRAVELHOMELOGO-HOMEPAGE.png";
import { Link } from "react-router-dom";
import useUserStore from "../../stores/user-store";

export default function SidebarPartner() {
  const logout = useUserStore(state => state.logout);

  return (
    <div className="bg-orange-400 h-screen flex flex-col rounded-lg sticky top-0">
      <div className="text-center py-6">
        {/* Logo */}
        <Link to={"/partner"}>
        <img
          src={TRAVELHOMELOGOUSER}
          alt="Travel Home Logo"
          className="w-[40%] mx-auto mb-6"
        />
        </Link>
       
        
        {/* Navigation Links */}
        <div className="flex flex-col space-y-4 items-center">
          <Link
            to={"bookingDetailPartner"}
            className="w-full text-lg font-semibold text-white p-3 rounded transition-transform duration-200 ease-in-out hover:bg-orange-500 "
          >
            BOOKING
          </Link>
          <Link
            to={"hotelPartner"}
            className="w-full text-lg font-semibold text-white p-3 rounded transition-transform duration-200 ease-in-out hover:bg-orange-500 "
          >
            ROOMS
          </Link>
          <Link
            to={"reviewDetailPartner"}
            className="w-full text-lg font-semibold text-white p-3 rounded transition-transform duration-200 ease-in-out hover:bg-orange-500 "
          >
            REVIEWS
          </Link>
          <Link
            to={"partnerUpdate"}
            className="w-full text-lg font-semibold text-white p-3 rounded transition-transform duration-200 ease-in-out hover:bg-orange-500 "
          >
            UPDATE PROFILE PARTNER
          </Link>
          <Link
            to={"HotelUpdate"}
            className="w-full text-lg font-semibold text-white p-3 rounded transition-transform duration-200 ease-in-out hover:bg-orange-500"
          >
            UPDATE HOTEL DETAIL
          </Link>
          <Link
            to={"/"}
            className="w-full text-lg font-semibold text-white p-3 rounded transition-transform duration-200 ease-in-out hover:bg-orange-500"
            onClick={() => logout()}
          >
            LOGOUT
          </Link>
        </div>
      </div>
    </div>
  );
}

