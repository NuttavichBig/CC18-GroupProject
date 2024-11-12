import React from "react";

export default function DetailHotel({ hotelData, setHotelDetail }) {
  console.log('hotelData', hotelData);

  const hotel = Array.isArray(hotelData) && hotelData.length > 0 ? hotelData[0] : null;

  if (!hotel) return <div>No hotel found.</div>;

  return (
    <>
      <div
        onClick={() => setHotelDetail(false)}
        className="flex items-center justify-center fixed inset-0 bg-[#c7d5dc7c] z-50 text-[#071a25]"
      >
        <div
          className="bg-[#ebf8ff] rounded-xl shadow-xl p-8 relative"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={() => setHotelDetail(false)}
            className="absolute top-4 right-4 text-3xl font-semibold text-[#071a25] bg-transparent border-none cursor-pointer"
          >
            &times;
          </button>
          <div className="bg-white rounded-lg p-4 flex shadow-lg">
            <img
              src={hotel?.img}
              alt="Hotel"
              className="w-[300px] h-[200px] rounded-lg"
            />
            <div className="flex flex-col gap-4 px-4">
              <p className="font-bold">
                {hotel?.name || "Hotel Name"} | PHONE: {hotel?.phone || "N/A"}
              </p>
              <p>{hotel?.detail || "No description available."}</p>
              <p className="font-bold">WEB PAGE</p>
              <a
                href={hotel?.webPage || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                {hotel?.webPage || "www.hotel.com"}
              </a>
              <div className="flex">
                <span className="text-yellow-500">
                  {'★'.repeat(hotel?.star || 0)}
                </span>
                <span className="text-gray-300">
                  {'★'.repeat(5 - (hotel?.star || 0))}
                </span>
              </div>
              <p className="font-bold">
                STATUS: {hotel?.isActive ? "ACTIVE" : "INACTIVE"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
