import React, { useState } from "react";
import useUserStore from "../../stores/user-store";
import useHotelStore from "../../stores/hotel-store";

function RoomSelection(props) {
  const { pageParams, setPageParams } = props;
  const filter = useUserStore((state) => state.filter);
  const selectedRoom = useHotelStore((state) => state.selectedRoom);

  const [isFacilitiesOpen, setIsFacilitiesOpen] = useState(true); 

  const journeyDate = new Date(filter.journeyDate).toLocaleDateString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const returnDate = new Date(filter.returnDate).toLocaleDateString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const formatFacilityName = (key) => {
    return key
      .slice(2) // Remove the first two characters
      .replace(/([A-Z])/g, " $1") // Add spaces before capital letters
      .trim(); // Trim any leading or trailing spaces
  };

  const currentHotel = useHotelStore((state) => state.currentHotel);

  const hdlChange = (e) => {
    setPageParams({ ...pageParams, [e.target.name]: +e.target.value });
  };

  const toggleFacilities = () => {
    setIsFacilitiesOpen((prev) => !prev);
  };


  return (
    <>
      <div className="flex flex-col rounded-lg w-full p-6 bg-cream-gradient space-y-6 text-[#543310]">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">{currentHotel.name}</h2>
          <div className="flex items-center space-x-2 ">
          <span className="font-semibold">Rating:</span>
          <div className="flex">
            <span className="text-yellow-500">
              {"★".repeat(currentHotel.star)}
            </span>
            <span className="text-gray-300">
              {"★".repeat(5 - currentHotel.star)}
            </span>
          </div>
        </div>
        </div>

        <div className="rounded-lg overflow-hidden">
          <img
            src={currentHotel.img}
            alt={currentHotel.name}
            className="w-full h-64 object-cover"
          />
        </div>

        <p className="text-gray-700">
          {currentHotel.detail ||
            "A beautiful hotel located in a prime area, offering luxurious facilities and services for a memorable stay."}
        </p>

        <div>
          <h3 className="font-semibold pb-2 cursor-pointer" onClick={toggleFacilities}>
            Facilities: {isFacilitiesOpen ? "▲" : "▼"}
          </h3>
          {isFacilitiesOpen && (
            <div className="flex flex-wrap gap-2">
              {Object.entries(currentHotel.facilitiesHotel || {})
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
          )}
        </div>

        <div
          key={selectedRoom.id}
          className="p-6 bg-cream-gradient rounded-xl shadow-lg space-y-4"
        >
          {/* Image */}
          <div className="w-full h-40 bg-gray-100 rounded-lg overflow-hidden">
            <img
              src={selectedRoom.images[0].img}
              alt={selectedRoom.title}
              className="object-cover w-full h-full"
            />
          </div>

          {/* Check-in / Check-out Dates */}
          <div className="flex items-center justify-center text-center mt-4 space-x-4">
            <div className="p-4 border border-orange-500 rounded-lg bg-white">
              <p className="font-medium">Check-In</p>
              <p>{journeyDate}</p>
            </div>

            {/* 6 nights with line and dots */}
            <div className="text-orange-500 font-medium text-center">
              <p>{pageParams.nights} nights</p>
              <div className="flex items-center space-x-2px">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <div className="w-20 h-0.5 bg-orange-500"></div>
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              </div>
            </div>

            <div className="p-4 border border-orange-500 rounded-lg bg-white">
              <p className="font-medium">Check-Out</p>
              <p>{returnDate}</p>
            </div>
          </div>

          {/* selectedRoom Details */}
          <div className="space-y-4 mt-4 text-sm">
            <div className="flex justify-between items-center">
              <span>Guests</span>
              <span>2</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Bed Type</span>
              <span>{selectedRoom.type}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>
                {pageParams.breakfastIncluded
                  ? "With Breakfast"
                  : "Without Breakfast"}
              </span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={pageParams.breakfastIncluded}
                  onChange={() =>
                    setPageParams({
                      ...pageParams,
                      breakfastIncluded: !pageParams.breakfastIncluded,
                    })
                  }
                />
                <div className="w-[40px] h-5 bg-orange-200 rounded-full peer peer-checked:bg-orange-500 relative">
                  <span
                    className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full transition-transform ${
                      pageParams.breakfastIncluded
                        ? "translate-x-5 bg-white shadow-lg"
                        : "bg-white"
                    }`}
                    style={{
                      boxShadow: pageParams.breakfastIncluded
                        ? "0px 2px 5px rgba(0, 0, 0, 0.3)"
                        : "none",
                    }}
                  ></span>
                </div>
              </label>
            </div>
          </div>

          {/* Price Details */}
          <div className="mt-4 text-sm">
            <p>Price details</p>
            <div className="flex justify-between">
              <div className="flex items-center gap-2">
                <p>Room(s)</p>
                <input
                  type="number"
                  className="h-8 px-2 w-12"
                  onChange={hdlChange}
                  min={1}
                  name="room"
                  value={pageParams.room}
                />{" "}
                <p>, {pageParams.nights} night(s)</p>
              </div>
              <p className="text-lg font-bold text-orange-600">
                THB {pageParams.totalPrice}.00
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default RoomSelection;
