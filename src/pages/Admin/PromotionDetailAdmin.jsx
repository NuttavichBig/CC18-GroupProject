import React, { useState } from "react";
import room from "../../assets/room.png";
import CreatePromotion from "../../Components/Admin/CreatePromotion";

export default function PromotionDetailAdmin() {
  const [createPromotion, setCreatePromotion] = useState(false);
  return (
    <>
      {createPromotion && (
        <CreatePromotion setCreatePromotion={setCreatePromotion} />
      )}
      <div className="w-full text-[#543310]">
        <p className="bg-[#AF8F6F] text-3xl font-bold rounded-lg p-2 text-center shadow-lg">
          PROMOTION
        </p>
        <div className="flex justify-end my-2">
          <button
            onClick={(e) => setCreatePromotion(true)}
            className="p-2 rounded-lg border-2 bg-[#F8F4E1] border-[#543310] text-[#543310] font-semibold shadow-lg hover:bg-[#543310] hover:text-white transition-all duration-100 ease-in-out"
          >
            CREATE PROMOTION
          </button>
        </div>
        <div className="bg-[#F8F4E1] rounded-lg p-4 flex shadow-lg">
          <img
            src={room}
            alt="Hotel Room"
            className="w-[300px] h-[200px] rounded-lg"
          />
          <div className="flex flex-col gap-4 px-4">
            <p className="mb-4 text-3xl">Promotion NAME</p>
            <p>
              Promotion Detail : Book Flights with Traveloka at a special price.
              Exclusive for students only! Don't miss out on this amazing Flight
              price.
            </p>
            <p className="text-3xl">Promotion Code : PPAP22</p>
          </div>
          <div className="flex items-center">
            <button className=" rounded-lg p-1 border-2 border-[#CD1818] bg-[#F8F4E1] text-[#CD1818] font-semibold shadow-lg hover:bg-[#CD1818] hover:text-white transition-all duration-100 ease-in-out">
              Remove
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
