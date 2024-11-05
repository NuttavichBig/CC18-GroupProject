import React from "react";
import room from "../../assets/room.png";
import Stars from "../../assets/Stars.png";

export default function HotelDetailAdmin() {
  return (
    <>
      <div className="w-full text-[#543310]">
        <p className="bg-[#F8F4E1] text-3xl font-bold rounded-lg p-2 text-center mb-8 shadow-lg">
          HOTEL INFORMATION
        </p>
        <div className="bg-[#F8F4E1] rounded-lg p-4 flex shadow-lg">
          <img
            src={room}
            alt="Hotel Room"
            className="w-[300px] h-[200px] rounded-lg"
          />
          <div className="flex flex-col gap-4 px-4">
            <p className="font-bold">
              IMAGE SLIDE Lotte Hotels & Resorts Korea PHONE : 0000000000
            </p>
            <p>
              Book Flights with Traveloka at a special price. Exclusive for
              students only! Don't miss out on this amazing Flight price.
            </p>
            <p className="font-bold">Facility</p>
            <p>
              Book Flights with Traveloka at a special price. Exclusive for
              students only! Don't miss out on this amazing Flight price.
            </p>
            <p className="font-bold">WEB PAGE</p>
            <a href="#">www.hotel.com</a>
            <p className="font-bold">CHECK-IN CHECK-OUT</p>
            <div className="flex gap-4">
              <p>AFTER 14.00</p>
              <p>BEFORE 12.00</p>
            </div>
            <div className="flex">
              {[...Array(5)].map((_, index) => (
                <img
                  key={index}
                  src={Stars}
                  alt="Star"
                  className="w-[40px] h-[40px]"
                />
              ))}
            </div>
            <p className="font-bold">STATUS : ACTIVE</p>
          </div>
        </div>
      </div>
    </>
  );
}
