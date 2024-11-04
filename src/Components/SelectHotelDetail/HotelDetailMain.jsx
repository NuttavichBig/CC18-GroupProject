import React from 'react';

const HotelDetailMain = () => {
    const sampleHotel = {
        name: "B2 South Pattaya Premier Hotel",
        price: 750,
        imageUrl: "/1.jpg",
        rating: 4,
        facilities: ["Air Condition", "Car Parking", "Pet Friendly", "Kitchenette"],
        description: "A luxurious hotel located in the heart of Pattaya with stunning views and top-notch facilities."
    };


    return (
        <div className="flex flex-col w-full p-6 bg-[#fef6e4] rounded-lg shadow-lg space-y-6">

            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">{sampleHotel.name}</h2>
                <span className="text-2xl font-bold text-orange-500">THB {sampleHotel.price}</span>
            </div>


            <div className="rounded-lg overflow-hidden">
                <img src={sampleHotel.imageUrl} alt={sampleHotel.name} className="w-full h-64 object-cover" />
            </div>


            <p className="text-gray-700">
                {sampleHotel.description || "A beautiful hotel located in a prime area, offering luxurious facilities and services for a memorable stay."}
            </p>


            <div className="flex items-center space-x-2">
                <span className="font-semibold">Reviews:</span>
                <div className="flex">
                    {Array.from({ length: 5 }, (_, i) => (
                        <span key={i} className={i < sampleHotel.rating ? "text-yellow-500" : "text-gray-300"}>
                            ★
                        </span>
                    ))}
                </div>
            </div>

            {/* Facilities */}
            <div>
                <h3 className="font-semibold">Facilities:</h3>
                <div className="flex flex-wrap gap-2">
                    {sampleHotel.facilities.map((facility, index) => (
                        <span key={index} className="bg-orange-100 px-2 py-1 rounded-full text-sm text-gray-700">
                            {facility}
                        </span>
                    ))}
                </div>
            </div>


        </div>
    );
};

export default HotelDetailMain;
