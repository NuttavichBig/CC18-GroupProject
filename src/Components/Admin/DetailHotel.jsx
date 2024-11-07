import React from "react";

export default function DetailHotel({ hotelData, setHotelDetail }) {
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
              src={hotelData?.img}
              alt="Hotel"
              className="w-[300px] h-[200px] rounded-lg"
            />
            <div className="flex flex-col gap-4 px-4">
              <p className="font-bold">
                {hotelData?.name || "Hotel Name"} | PHONE : {hotelData?.phone || "N/A"}
              </p>
              <p>{hotelData?.detail || "No description available."}</p>
              <p className="font-bold">WEB PAGE</p>
              <a href={hotelData?.website || "#"}>{hotelData?.website || "www.hotel.com"}</a>
              <div className="flex">
                    <span className="text-yellow-500">{'★'.repeat(hotelData.star)}</span>
                    <span className="text-gray-300">{'★'.repeat(5 - hotelData.star)}</span>
                </div>
              <p className="font-bold">STATUS : {hotelData?.status || "ACTIVE"}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
