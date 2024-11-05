import React from "react";
import Stars from "../../assets/Stars.png";
import room from "../../assets/room.png";

export default function ReviewDetailAdmin() {
  return (
    <>
      <div className="w-full text-[#543310]">
        <p className="bg-[#F8F4E1] text-3xl font-bold rounded-lg p-2 text-center mb-8 shadow-lg">
          REVIEWS
        </p>
        <div className="bg-[#F8F4E1] rounded-lg p-4 flex shadow-lg">
          <img
            src={room}
            alt="Hotel Room"
            className="w-[300px] h-[200px] rounded-lg"
          />
          <div className="flex flex-col gap-4 px-8">
            <p className="mb-4 font-bold">
              IMAGE SLIDE Lotte Hotels & Resorts Korea
            </p>
            <p>
              Book Flights with Traveloka at a special price. Exclusive for
              students only! Don't miss out on this amazing Flight price.
            </p>
            <p className="font-bold">Review</p>
            <p>
              Book Flights with Traveloka at a special price. Exclusive for
              students only! Don't miss out on this amazing Flight price.
            </p>
            <div className="flex">
              {[...Array(5)].map((_, index) => (
                <img
                  key={index}
                  src={Stars}
                  alt="Star"
                  className="w-[50px] h-[50px]"
                />
              ))}
            </div>
          </div>
          <div className="flex items-center">
            <button className=" w-[100px] h-[100px] rounded-lg p-3 border-2 border-[#CD1818] bg-[#F8F4E1] text-[#CD1818] font-semibold shadow-lg hover:bg-[#CD1818] hover:text-white transition-all duration-100 ease-in-out">
              Remove Review
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
