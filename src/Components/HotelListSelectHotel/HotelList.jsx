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
    // navigate('/bookinghotel-detail', { state: { hotel } });
  };

  const formatFacilityName = (key) => {
    return key
      .replace(/is|([A-Z])/g, " $1")
      .trim()
      .replace(/  +/g, " ");
  };

  return (
    <div className="w-full flex flex-col">
      {hotels.length === 0 ? (
        <div className="text-center text-gray-500">No hotels available</div>
      ) : (
        hotels.map((hotel) => (
          <div
            key={hotel.id}
            className="flex bg-[#FFFFFF] rounded-lg shadow-md mb-4 p-4"
          >
            <img
              src={hotel.img}
              alt={hotel.name}
              className="w-32 h-44 object-cover rounded-lg mr-4"
            />
            <div className="flex-grow flex flex-col space-y-2">
              <h3 className="text-lg font-semibold">{hotel.name}</h3>
              <p className="text-sm text-gray-500">{hotel.address}</p>
              <p className="text-lg font-bold">THB {hotel.price}</p>

              <div className="flex">
                <span className="text-yellow-500">
                  {"★".repeat(hotel.star)}
                </span>
                <span className="text-gray-300">
                  {"★".repeat(5 - hotel.star)}
                </span>
              </div>

              <div className="flex justify-between items-center mt-2">
                <div className="flex flex-wrap gap-2 items-center">
                  <h4 className="font-semibold">Facilities:</h4>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(hotel.facilitiesHotel || {})
                      .filter(([key, value]) => value === true)
                      .map(([key]) => (
                        <span
                          key={key}
                          className="px-3 py-1 bg-orange-100 text-sm rounded-full"
                        >
                          {formatFacilityName(key)}
                        </span>
                      ))}
                  </div>
                </div>
                <button
                  className="shadow-lg bg-gradient-to-t from-orange-400 to-orange-600 text-white p-2 outline-none border-none transition-transform duration-150 rounded-lg overflow-hidden hover:scale-110 w-28 h-10"
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
