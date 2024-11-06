import React from "react";
import room from "../../assets/room.png";
import Stars from "../../assets/Stars.png";

export default function DetailHotel({ setHotelDetail }) {
  return (
    <>
      <div
        onClick={() => setHotelDetail(false)}
        className="flex items-center justify-center fixed inset-0 bg-[#F2F7A140] z-50 text-[#543310]"
      >
        <div
          className="bg-[#FFF0D1] rounded-xl shadow-xl p-8 relative"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={() => setHotelDetail(false)}
            className="absolute top-4 right-4 text-3xl font-semibold text-[#543310] bg-transparent border-none cursor-pointer"
          >
            &times;
          </button>
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
      </div>
    </>
  );
}
