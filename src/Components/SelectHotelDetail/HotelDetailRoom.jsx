import React from 'react';

function HotelDetailRoom() {
    const rooms = [
        {
            id: 1,
            type: "Deluxe",
            amenities: ["Without Breakfast", "1 double bed", "Air conditioning"],
            guests: "2 Adults",
            availability: "2 rooms left",
            price: 750,
            imageUrl: "/1.jpg"
        },
        {
            id: 2,
            type: "Deluxe",
            amenities: ["Without Breakfast", "1 double bed", "Air conditioning"],
            guests: "2 Adults",
            availability: "2 rooms left",
            price: 750,
            imageUrl: "/2.jpg"
        },
        {
            id: 3,
            type: "Deluxe",
            amenities: ["Without Breakfast", "1 double bed", "Air conditioning"],
            guests: "2 Adults",
            availability: "2 rooms left",
            price: 750,
            imageUrl: "/3.jpg"
        },
    ];

    return (
        <div className="bg-[#fef6e4] rounded-lg p-4 shadow-md space-y-6 w-full">
            <h3 className="text-lg font-semibold mb-4">Rooms</h3>
            {rooms.map((room) => (
                <div key={room.id} className="flex bg-white p-4 rounded-lg shadow-md">

                    <img src={room.imageUrl} alt={room.type} className="w-32 h-24 object-cover rounded-lg mr-4" />


                    <div className="flex-grow flex flex-col justify-between">
                        <div className="flex space-x-8">
                            <div>
                                <h4 className="text-md font-semibold">{room.type}</h4>
                                {room.amenities.map((amenity, index) => (
                                    <p key={index} className="text-sm text-gray-600">{amenity}</p>
                                ))}
                            </div>
                            <div>
                                <p className="font-semibold">Guests</p>
                                <p className="text-sm text-gray-600">{room.guests}</p>
                            </div>
                            <div>
                                <p className="font-semibold">Available Room</p>
                                <p className="text-sm text-gray-600">{room.availability}</p>
                            </div>
                        </div>
                    </div>


                    <div className="flex flex-col items-end justify-between ml-4">
                        <span className="text-lg font-bold text-orange-500">THB {room.price}</span>
                        <button className="bg-orange-500 text-white py-1 px-4 rounded-md">BOOK NOW</button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default HotelDetailRoom;
