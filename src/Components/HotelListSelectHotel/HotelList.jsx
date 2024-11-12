import React from "react";
import { useNavigate } from "react-router-dom";
import useHotelStore from "../../stores/hotel-store";

const HotelList = ({ hotels }) => {
  const navigate = useNavigate();

  const actionSetCurrentHotel = useHotelStore(
    (state) => state.actionSetCurrentHotel
  );

  const handleBookNow = (hotel) => {
    actionSetCurrentHotel(hotel);
    navigate("/bookinghotel-detail");
  };

  const formatFacilityName = (key) => {
    return key
      .replace(/is|([A-Z])/g, " $1")
      .trim()
      .replace(/  +/g, " ");
  };

  return (
    <div className="w-full flex flex-col text-[#543310]">
      {hotels.length === 0 ? (
        <div className="text-center text-gray-500">No hotels available</div>
      ) : (
        hotels.map((hotel) => (
          <div
            key={hotel.id}
            className="flex bg-cream-gradient rounded-lg shadow-md mb-4 p-4"
          >
            <img
              src={hotel.img}
              alt={hotel.name}
              className="w-32 h-44 object-cover rounded-lg mr-4"
            />
            <div className="flex-grow flex flex-col space-y-2">
              <div className="flex justify-between">
                <div>
                  <h3 className="text-lg font-semibold">{hotel.name}</h3>
                  <p className="text-sm text-gray-500">{hotel.address}</p>
                </div>
                <p className="text-lg font-bold">THB {hotel.price}</p>
              </div>

              <div className="flex">
                <span className="text-yellow-500">
                  {"★".repeat(hotel.star)}
                </span>
                <span className="text-gray-400">
                  {"★".repeat(5 - hotel.star)}
                </span>
              </div>

              <div className="flex justify-between items-center mt-2">
                <div className="text-sm text-[#543310]">
                  <h4 className="font-semibold pb-1">Facilities:</h4>
                  <div className="flex flex-wrap w-[500px] gap-2">
                    {Object.entries(hotel.facilitiesHotel || {})
                      .filter(([key, value]) => value === true)
                      .map(([key]) => (
                        <span
                          key={key}
                          className="px-3 py-1 bg-orange-50 shadow-md rounded-lg"
                        >
                          {formatFacilityName(key)}
                        </span>
                      ))}
                  </div>
                </div>
                <button
                  className="bg-gradient-to-r from-[#f08a4b] to-[#e05b3c] text-white py-2 px-4 rounded-full font-bold shadow-lg transition-transform duration-200 cursor-pointer hover:scale-105 hover:shadow-[inset_0_0_8px_rgba(240,138,75,0.4),0_4px_15px_rgba(240,138,75,0.6),0_4px_15px_rgba(224,91,60,0.4)]"
                  onClick={() => handleBookNow(hotel)}
                >
                  BOOK NOW
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default HotelList;
