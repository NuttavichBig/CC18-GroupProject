import React from 'react';

const HotelList = () => {
    const hotels = [
        {
            id: 1,
            name: "B2 South Pattaya Premier Hotel",
            price: 750,
            location: "Lotte Hotels & Resorts Korea",
            imageUrl: "/1.jpg",
            rating: 4,
            facilities: ["Air Condition", "Car Parking", "Pet Friendly", "Kitchenette"]
        },
        {
            id: 2,
            name: "B2 North Pattaya Premier Hotel",
            price: 800,
            location: "Lotte Hotels & Resorts Korea",
            imageUrl: "/2.jpg",
            rating: 5,
            facilities: ["Air Condition", "Car Parking"]
        },
        {
            id: 3,
            name: "B2 Central Pattaya Premier Hotel",
            price: 820,
            location: "Lotte Hotels & Resorts Korea",
            imageUrl: "/3.jpg",
            rating: 3,
            facilities: ["Car Parking", "Pet Friendly"]
        },
        {
            id: 4,
            name: "B2 East Pattaya Premier Hotel",
            price: 850,
            location: "Lotte Hotels & Resorts Korea",
            imageUrl: "/4.jpg",
            rating: 4,
            facilities: ["Air Condition", "Kitchenette"]
        },
        {
            id: 5,
            name: "B2 West Pattaya Premier Hotel",
            price: 780,
            location: "Lotte Hotels & Resorts Korea",
            imageUrl: "/5.jpg",
            rating: 4,
            facilities: ["Air Condition", "Pet Friendly"]
        },
        {
            id: 6,
            name: "B2 Sea View Pattaya Hotel",
            price: 900,
            location: "Lotte Hotels & Resorts Korea",
            imageUrl: "/6.jpg",
            rating: 5,
            facilities: ["Car Parking", "Kitchenette"]
        },
        {
            id: 7,
            name: "B2 Beach Front Pattaya Hotel",
            price: 950,
            location: "Lotte Hotels & Resorts Korea",
            imageUrl: "/7.jpg",
            rating: 3,
            facilities: ["Pet Friendly", "Kitchenette"]
        },
        {
            id: 8,
            name: "B2 Mountain View Pattaya Hotel",
            price: 870,
            location: "Lotte Hotels & Resorts Korea",
            imageUrl: "/8.jpg",
            rating: 4,
            facilities: ["Air Condition", "Car Parking"]
        },
        {
            id: 9,
            name: "B2 Luxury Pattaya Hotel",
            price: 1000,
            location: "Lotte Hotels & Resorts Korea",
            imageUrl: "/9.jpg",
            rating: 5,
            facilities: ["Air Condition", "Pet Friendly"]
        },
        {
            id: 10,
            name: "B2 Grand Pattaya Hotel",
            price: 1100,
            location: "Lotte Hotels & Resorts Korea",
            imageUrl: "/10.jpg",
            rating: 4,
            facilities: ["Kitchenette", "Pet Friendly"]
        },
        {
            id: 11,
            name: "B2 Pattaya City Hotel",
            price: 780,
            location: "Lotte Hotels & Resorts Korea",
            imageUrl: "/11.jpg",
            rating: 3,
            facilities: ["Air Condition", "Car Parking"]
        },
        {
            id: 12,
            name: "B2 Premier Pattaya Hotel",
            price: 1200,
            location: "Lotte Hotels & Resorts Korea",
            imageUrl: "/12.jpg",
            rating: 5,
            facilities: ["Air Condition", "Car Parking", "Pet Friendly", "Kitchenette"]
        }
    ];

    return (
        <div className="w-full flex flex-col">
            {hotels.map(hotel => (
                <div key={hotel.id} className="flex bg-[#fef6e4] rounded-lg shadow-md mb-4 p-4">
                    <img src={hotel.imageUrl} alt={hotel.name} className="w-32 h-44 object-cover rounded-lg mr-4" />
                    <div className="flex-grow flex flex-col space-y-2">
                        <h3 className="text-lg font-semibold">{hotel.name}</h3>
                        <p className="text-sm text-gray-500">{hotel.location}</p>
                        <p className="text-lg font-bold">THB {hotel.price}</p>

                        {/* Rating */}
                        <div className="flex">
                            {Array.from({ length: 5 }, (_, i) => (
                                <span key={i} className={i < hotel.rating ? "text-yellow-500" : "text-gray-300"}>
                                    ★
                                </span>
                            ))}
                        </div>

                        {/* Facilities and BOOK NOW Button */}
                        <div className="flex justify-between items-center mt-2">
                            <div className="text-sm text-gray-700">
                                <h4 className="font-semibold">Facilities:</h4>
                                <div className="flex flex-wrap gap-2">
                                    {hotel.facilities.map((facility, index) => (
                                        <span key={index}>{facility}</span>
                                    ))}
                                </div>
                            </div>
                            <button className="bg-orange-500 text-white py-2 px-4 rounded">BOOK NOW</button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default HotelList;
