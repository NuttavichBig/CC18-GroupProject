import React from "react";
import { useNavigate } from "react-router-dom";

function HotelDetailRoom({ rooms }) {
  console.log(rooms);
  const navigate = useNavigate();

  if (!rooms || rooms.length === 0) {
    return <div>No rooms available at this time.</div>;
  }

  const formatFacilityName = (key) => {
    return key
      .replace(/is|([A-Z])/g, " $1")
      .trim()
      .replace(/  +/g, " ");
  };

  const handleBookNow = (room) => {
    navigate("/bookinghotel-detail-payment", { state: { room } });
  };

  return (
    <div className="bg-[#fef6e4] rounded-lg p-4  space-y-6 w-full">
      <h3 className="text-lg font-semibold mb-4">Rooms</h3>
      {rooms.map((room) => (
        <div key={room.id} className="flex bg-white p-4 rounded-lg shadow-md">
          <img
            src={
              room.images && room.images.length > 0
                ? room.images[0].img
                : "/default-room.jpg"
            }
            alt={room.type}
            className="w-32 h-24 object-cover rounded-lg mr-4"
          />

          <div className="flex-grow flex flex-col">
            <div className="flex space-x-8">
              <div className="">
                <h4 className="text-lg font-semibold">{room.type}</h4>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(room.facilitiesRoom || {})
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
              <div>
                <p className="font-semibold">Guests</p>
                <p className="text-sm text-gray-600">
                  {room.recommendPeople || "Not specified"} Adult
                </p>
              </div>
              <div>
                <p className="font-semibold">Available Room</p>
                <p className="text-sm text-gray-600">
                  {room.status || "Not specified"}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-end justify-between ml-4">
            <span className="text-lg font-bold text-orange-500">
              THB {room.price || "N/A"}
            </span>
            <button
              className="shadow-lg bg-gradient-to-t from-orange-400 to-orange-600 text-white p-2 outline-none border-none transition-transform duration-150 rounded-lg overflow-hidden hover:scale-110 w-28 h-10"
              onClick={() => handleBookNow(room)}
            >
              BOOK NOW
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default HotelDetailRoom;
