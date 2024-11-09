import React from "react";
import useUserStore from "../../stores/user-store";
import useHotelStore from "../../stores/hotel-store";

function RoomSelection(props) {
  const { pageParams, setPageParams } = props
  const filter = useUserStore((state) => state.filter);
  const  selectedRoom = useHotelStore(state=>state.selectedRoom)

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




  const hdlChange = (e) => {
    setPageParams({ ...pageParams, [e.target.name]: +e.target.value })
  }

  return (
    <div className="container mx-auto grid grid-cols-1 gap-6">
      <div
        key={selectedRoom.id}
        className="p-6 bg-[#fef6e4] rounded-xl shadow-lg space-y-4"
      >
        {/* Image */}
        <div className="w-full h-40 bg-gray-200 rounded-lg overflow-hidden">
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
              <div className="w-16 h-0.5 bg-orange-500"></div>
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
              {pageParams.breakfastIncluded ? "With Breakfast" : "Without Breakfast"}
            </span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={pageParams.breakfastIncluded}
                onChange={() => setPageParams({ ...pageParams, breakfastIncluded: !pageParams.breakfastIncluded })}
              />
              <div className="w-[40px] h-5 bg-orange-200 rounded-full peer peer-checked:bg-orange-500 relative">
                <span
                  className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full transition-transform ${pageParams.breakfastIncluded
                    ? "translate-x-5 bg-orange-500 shadow-lg"
                    : "bg-white"
                    }`}
                  style={{
                    boxShadow: pageParams.breakfastIncluded
                      ? "0px 2px 5px rgba(0, 0, 0, 0.3)"
                      : "none",
                  }}
                ></span>
              </div>
              <span className="ml-2 text-sm text-gray-700">Slide</span>
            </label>
          </div>
        </div>

        {/* Price Details */}
        <div className="mt-4 text-sm">
          <p>Price details</p>
          <div className="flex justify-between">
            <div className="flex items-center gap-2">
              <p>Room(s)</p><input type="number" className="h-8 px-2 w-12" onChange={hdlChange} min={1} name="room" value={pageParams.room} /> <p>, {pageParams.nights} night(s)</p>
            </div>
            <p className="text-lg font-bold text-orange-600">
              THB {pageParams.totalPrice}.00
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RoomSelection;
