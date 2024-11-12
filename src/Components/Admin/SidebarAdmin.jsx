import React, { useState } from "react"; 
import TRAVELHOMELOGOUSER from "../../assets/TRAVELHOMELOGO-HOMEPAGE.png";
import { Link } from "react-router-dom";
import AllChatAdmin from "../../pages/Admin/AllChatAdmin";

export default function SidebarAdmin() {
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <>
      {chatOpen && <AllChatAdmin setChatOpen={setChatOpen} />}
      <div className="bg-[#2c6cb7] h-screen flex flex-col p-6 rounded-2xl shadow-2xl sticky top-0">

        <div className="text-center mb-10">
          <Link to={"dashboard"}>
            <img
              src={TRAVELHOMELOGOUSER}
              alt="Logo"
              className="w-32 mx-auto mb-6"
            />
          </Link>
          <div className="flex flex-col space-y-4 items-center">
            {/* Menu Items */}
            {[ 
              { name: "BOOKING", link: "bookingDetailAdmin" },
              { name: "MANAGE USERS", link: "userDetailAdmin" },
              { name: "HOTELS", link: "hotelDetailAdmin" },
              { name: "REVIEWS", link: "reviewDetailAdmin" },
              { name: "PROMOTIONS", link: "promotionDetailAdmin" }
            ].map((item) => (
              <Link
                key={item.name}
                to={item.link}
                className="w-full text-white text-lg font-semibold p-3 hover:bg-[#82c0ffc9] hover:text-white rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105"
              >
                {item.name}
              </Link>
            ))}
            
            <button className="w-full text-[#E0E0E0] text-lg font-semibold p-3 mt-2 hover:bg-[#66B3FF] hover:text-white rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105">
              LOGOUT
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
