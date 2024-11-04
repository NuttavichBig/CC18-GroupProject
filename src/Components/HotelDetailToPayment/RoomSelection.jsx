import React, { useState } from 'react';

function RoomSelection() {
    const [breakfastIncluded, setBreakfastIncluded] = useState(false);

    const rooms = [
        {
            id: 1,
            title: "Deluxe Premier",
            guests: "2 Adults",
            bedType: "1 King Bed",
            breakfast: "Without Breakfast",
            price: 890,
            imageUrl: "/1.jpg",
        },
        {
            id: 2,
            title: "Deluxe Premier",
            guests: "2 Adults",
            bedType: "3 King Bed",
            breakfast: "Without Breakfast",
            price: 890,
            imageUrl: "/2.jpg",
        },
    ];

    return (
        <div className="container mx-auto grid grid-cols-1 gap-6">
            {rooms.map(room => (
                <div key={room.id} className="p-6 bg-[#fef6e4] rounded-xl shadow-lg space-y-4">
                    {/* Image */}
                    <div className="w-full h-40 bg-gray-200 rounded-lg overflow-hidden">
                        <img src={room.imageUrl} alt={room.title} className="object-cover w-full h-full" />
                    </div>

                    {/* Check-in / Check-out Dates */}
                    <div className="flex items-center justify-center text-center mt-4 space-x-4">
                        <div className="p-4 border border-orange-500 rounded-lg bg-white">
                            <p className="font-medium">Check-In</p>
                            <p>Wed, 25 Oct 2024</p>
                            <p>From 14:00</p>
                        </div>

                        {/* 6 nights with line and dots */}
                        <div className="text-orange-500 font-medium text-center">
                            <p>6 nights</p>
                            <div className="flex items-center space-x-2px">
                                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                                <div className="w-16 h-0.5 bg-orange-500"></div>
                                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                            </div>
                        </div>

                        <div className="p-4 border border-orange-500 rounded-lg bg-white">
                            <p className="font-medium">Check-Out</p>
                            <p>Thu, 31 Oct 2024</p>
                            <p>Before 12:00</p>
                        </div>
                    </div>

                    {/* Room Details */}
                    <div className="space-y-4 mt-4 text-sm">
                        <div className="flex justify-between items-center">
                            <span>Guests</span>
                            <div className="flex justify-between items-center space-x-2 w-1/4">
                                <button className="bg-orange-300 w-6 h-6 rounded-full text-center font-bold">-</button>
                                <span>2</span>
                                <button className="bg-orange-300 w-6 h-6 rounded-full text-center font-bold">+</button>
                            </div>
                        </div>
                        <div className="flex justify-between items-center">
                            <span>Bed Type</span>
                            <button className="bg-orange-300 px-4 py-1 rounded-md">Drop Down</button>
                        </div>
                        <div className="flex justify-between items-center">
                            <span>{breakfastIncluded ? "With Breakfast" : "Without Breakfast"}</span>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="sr-only peer"
                                    checked={breakfastIncluded}
                                    onChange={() => setBreakfastIncluded(!breakfastIncluded)}
                                />
                                <div className="w-[70px] h-5 bg-orange-200 rounded-full peer peer-checked:bg-orange-500 relative">
                                    <span
                                        className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full transition-transform ${breakfastIncluded ? 'translate-x-5 bg-orange-500 shadow-lg' : 'bg-white'}`}
                                        style={{ boxShadow: breakfastIncluded ? '0px 2px 5px rgba(0, 0, 0, 0.3)' : 'none' }}
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
                            <p>1 room(s), 1 night(s)</p>
                            <p className="text-lg font-bold text-orange-600">THB {room.price}.00</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default RoomSelection;
