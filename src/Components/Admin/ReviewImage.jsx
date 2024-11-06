import React from "react";
import Stars from "../../assets/Stars.png";
import room from "../../assets/room.png";

export default function ReviewImage({ setReviewDetail }) {
  return (
    <>
      <div
        onClick={() => setReviewDetail(false)}
        className="flex items-center justify-center fixed inset-0 bg-[#F2F7A140] z-50 text-[#543310]"
      >
        <div
          className="bg-[#FFF0D1] rounded-xl shadow-xl p-8 relative"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={() => setReviewDetail(false)}
            className="absolute top-4 right-4 text-3xl font-semibold bg-transparent border-none cursor-pointer"
          >
            &times;
          </button>

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
          </div>
        </div>
      </div>
    </>
  );
}
