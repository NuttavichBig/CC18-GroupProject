// SummaryRoomDetail.jsx
import React, { useState } from 'react';
import useHotelStore from '../../stores/hotel-store';
import useBookingStore from '../../stores/booking-store';

function SummaryRoomDetail() {
    const selectedRoom = useHotelStore(state=>state.selectedRoom)
    const bookingDetail = useBookingStore(state=>state.bookingDetail)
    const currentHotel = useHotelStore((state) => state.currentHotel);
    const [isFacilitiesOpen, setIsFacilitiesOpen] = useState(true); 
  
    const toggleFacilities = () => {
      setIsFacilitiesOpen((prev) => !prev);
    };
    const formatFacilityName = (key) => {
      return key
        .slice(2) // Remove the first two characters
        .replace(/([A-Z])/g, " $1") // Add spaces before capital letters
        .trim(); // Trim any leading or trailing spaces
    };
    return (
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
        <div className="p-6 bg-cream-gradient rounded-lg shadow-md space-y-4">
                <div className="flex items-center space-x-4">
                    <div className="w-1/3 h-24 rounded-lg overflow-hidden">
                        <img src={selectedRoom.images[0].img} alt={selectedRoom.name} className="object-cover w-full h-full" />
                    </div>
                    <div className="text-sm space-y-1">
                        <h3 className="text-lg font-bold text-brown-700">{selectedRoom.name}</h3>
                        <p>{selectedRoom.type}</p>
                    </div>
                </div>

            <div className="flex justify-between items-center mt-6">
                <div className="text-center border border-orange-500 rounded-lg p-4 bg-white w-1/3">
                    <p className="font-medium">Check-In</p>
                    <p className='text-xs'>{bookingDetail.checkinDate}</p>
                    <p>From 14:00</p>
                </div>
                <div className="text-orange-500 font-medium text-center">
                    <p>6 nights</p>
                    <div className="flex items-center space-x-0">
                        <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                        <div className="w-28 h-0.5 bg-orange-500"></div>
                        <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    </div>
                </div>

                <div className="text-center border border-orange-500 rounded-lg p-4 bg-white w-1/3">
                    <p className="font-medium">Check-Out</p>
                    <p className='text-xs'>{bookingDetail.checkoutDate}</p>
                    <p>Before 12:00</p>
                </div>
            </div>

            <div className="flex justify-between mt-6 space-y-1">
                <div>
                    <p>Total Room Price</p>
                    <p>{bookingDetail.amount} room(s), {bookingDetail.nights} night(s)</p>
                </div>
                <div>
                    <p className="text-2xl font-bold text-orange-600">{bookingDetail.totalPrice} THB</p>
                </div>
            </div>

            <div className="mt-6 text-sm space-y-1">
                <p className='font-bold'>Contact Details</p>
                <p className='ml-5'>Name: {bookingDetail.firstName} {bookingDetail.lastName}</p>
                <p className='ml-5'>Tel: {bookingDetail.phone}</p>
                <p className='ml-5'>Email: {bookingDetail.email}</p>
            </div>
        </div>
        </div>
    );
}

export default SummaryRoomDetail;
