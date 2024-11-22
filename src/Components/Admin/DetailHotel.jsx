import React, { useState } from "react";

export default function DetailHotel({ hotelData, setHotelDetail }) {
  console.log('hotelData', hotelData);

  const hotel = Array.isArray(hotelData) && hotelData.length > 0 ? hotelData[0] : null;

  const [room, setRoom] = useState(null)

  console.log(room)


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
          <div className="bg-white rounded-lg p-4 flex flex-col mt-4 shadow-lg">
            <select className="text-[#0088d1] border-[#0088d1] border-2 text-center rounded-lg py-1" defaultValue={''}
              onChange={(e) => { setRoom(hotel.rooms[e.target.value]) }}>
              <option disabled value={''} selected>Select Room</option>
              {hotel.rooms?.map((room, index) =>
                <option value={index} key={index}>{room.name}</option>
              )}
            </select>
            {
              room &&
              <div className="flex">
                <div className="flex flex-wrap w-[300px] rounded-lg">
                  {room.images?.map((pic, index) =>
                    <img key={index} className={`${index === 0 ? 'w-full h-[200px]' : 'w-1/2 h-[100px]'} rounded-lg mb-1`} src={pic.img} alt={'room picture'} />
                  )}
                </div>
                <div className="px-4 flex flex-col gap-4">
                  <p className="font-bold">
                    {room.name} | {room.type} Bedroom
                  </p>
                  <p>{room?.detail || "No description available."}</p>
                    <div className="flex flex-col gap-1">
                  <div className="flex gap-2">
                      <p className="underline">Price</p>
                      <p>{room.price}</p>
                      <p>THB</p>
                    </div>
                    <div className="flex gap-2">
                      <p className="underline">For</p>
                      <p>{room.recommendPeople}</p>
                      <p>people</p>
                    </div>
                    <div className="flex gap-2">
                      <p className="underline">Have</p>
                      <p>{room.roomAmount}</p>
                      <p>room</p>
                    </div>
                  </div>
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    </>
  );
}
