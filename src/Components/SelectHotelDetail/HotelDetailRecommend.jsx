import React, { useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import useHotelStore from "../../stores/hotel-store";

function HotelDetailRecommend() {
  const navigate = useNavigate();

  const currentHotel = useHotelStore((state) => state.currentHotel);
  const allHotels = useHotelStore((state) => state.allHotels);
  const actionSetCurrentHotel = useHotelStore(
    (state) => state.actionSetCurrentHotel
  );

  // Filter and limit recommended hotels to a maximum of 4
  const recommendedHotels = useMemo(() => {
    return allHotels.filter((hotel) => hotel.id !== currentHotel?.id).slice(0, 4);
  }, [allHotels, currentHotel]);

  const handleViewDetails = useCallback(
    (hotel) => {
      if (currentHotel?.id !== hotel.id) {
        actionSetCurrentHotel(hotel);

        // เลื่อนหน้าไปด้านบนสุด
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });

      }
      navigate("/bookinghotel-detail");
    },
    [currentHotel, actionSetCurrentHotel, navigate]
  );

  return (
    <div className="bg-cream-gradient rounded-xl p-6 shadow-lg w-full">
      <h3 className="text-2xl font-semibold mb-6 text-[#543310]">Recommended Hotels</h3>
      <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
        {recommendedHotels.map((hotel) => (
          <div
            key={hotel.id}
            className="bg-white rounded-lg overflow-hidden shadow-md flex flex-col"
          >
            <img
              src={hotel.img}
              alt={hotel.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 flex flex-col flex-grow">
              <h4 className="text-[#543310] font-semibold text-lg">{hotel.name}</h4>
              <p className="text-gray-600 text-sm mt-2">{hotel.address}</p>
              <p className="text-[#f08a4b] font-bold text-lg mt-3">
                THB{" "}
                {hotel.rooms.length
                  ? Math.min(...hotel.rooms.map((room) => parseFloat(room.price)))
                  : "N/A"}
              </p>
              <button
                onClick={() => handleViewDetails(hotel)}
                className="bg-gradient-to-r from-[#f08a4b] to-[#e05b3c] text-white py-2 px-4 rounded-md font-bold shadow-md mt-4 hover:scale-105 transition-transform"
              >
                View More
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HotelDetailRecommend;
