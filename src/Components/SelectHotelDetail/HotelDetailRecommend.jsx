import React from "react";
import { useNavigate } from "react-router-dom";

function HotelDetailRecommend() {
  const navigate = useNavigate();
  const recommendedHotels = [
    {
      id: 1,
      name: "B2 South Pattaya Premier Hotel",
      price: 750,
      location: "Lotte Hotels & Resorts Korea",
      imageUrl: "/1.jpg",
    },
    {
      id: 2,
      name: "B2 North Pattaya Premier Hotel",
      price: 800,
      location: "Lotte Hotels & Resorts Korea",
      imageUrl: "/2.jpg",
    },
    {
      id: 3,
      name: "B2 Central Pattaya Premier Hotel",
      price: 820,
      location: "Lotte Hotels & Resorts Korea",
      imageUrl: "/3.jpg",
    },
  ];

  return (
    <div className="bg-[#fef6e4] text-[#543310] rounded-lg p-4 shadow-md space-y-4 w-full">
      <h3 className="text-lg font-semibold mb-4">Recommended Hotels</h3>
      {recommendedHotels.map((hotel) => (
        <div
          key={hotel.id}
          className="flex items-center bg-white p-4 rounded-lg shadow-md mb-4"
        >
          <img
            src={hotel.imageUrl}
            alt={hotel.name}
            className="w-32 h-20 object-cover rounded-lg mr-4"
          />
          <div className="flex-grow">
            <h4 className="font-semibold text-lg">{hotel.name}</h4>
            <p className="text-gray-500 text-sm">{hotel.location}</p>
            <p className="text-lg font-bold mt-1 text-orange-500">THB {hotel.price}</p>
          </div>
          <button
            onClick={() => navigate("/bookinghotel-detail")}
            className="shadow-lg bg-gradient-to-t from-orange-400 to-orange-600 text-white p-2 outline-none border-none transition-transform duration-150 rounded-lg overflow-hidden hover:scale-110 w-28 h-10"
          >
            BOOK
          </button>
        </div>
      ))}
    </div>
  );
}

export default HotelDetailRecommend;
