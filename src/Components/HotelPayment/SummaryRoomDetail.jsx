// SummaryRoomDetail.jsx
import React from 'react';

function SummaryRoomDetail() {
    const roomDetails = [
        {
            title: "Superior Premier",
            description: ["Without Breakfast", "1 double bed", "Air conditioning"],
            imageUrl: "/5.jpg",
        },
        {
            title: "Deluxe Premier",
            description: ["Without Breakfast", "1 double bed", "Air conditioning"],
            imageUrl: "/6.jpg",
        },
    ];

    return (
        <div className="p-6 bg-cream-gradient rounded-lg shadow-md space-y-4">
            {roomDetails.map((room, index) => (
                <div key={index} className="flex items-center space-x-4">
                    <div className="w-1/3 h-24 rounded-lg overflow-hidden">
                        <img src={room.imageUrl} alt={room.title} className="object-cover w-full h-full" />
                    </div>
                    <div className="text-sm space-y-1">
                        <h3 className="text-lg font-bold text-brown-700">{room.title}</h3>
                        {room.description.map((line, i) => (
                            <p key={i}>{line}</p>
                        ))}
                    </div>
                </div>
            ))}

            <div className="flex justify-between items-center mt-6">
                <div className="text-center border border-orange-500 rounded-lg p-4 bg-white w-1/3">
                    <p className="font-medium">Check-In</p>
                    <p className='text-xs'>Wed, 25 Oct 2024</p>
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
                    <p className='text-xs'>Thu, 31 Oct 2024</p>
                    <p>Before 12:00</p>
                </div>
            </div>

            <div className="flex justify-between mt-6 space-y-1">
                <div>
                    <p>Total Room Price</p>
                    <p>1 room(s), 1 night(s)</p>
                </div>
                <div>
                    <p className="text-lg font-bold text-gray-600 line-through">THB 1,186.67</p>
                    <p className="text-2xl font-bold text-orange-600">THB 890.00</p>
                </div>
            </div>

            <div className="mt-6 text-sm space-y-1">
                <p className='font-bold'>Contact Details</p>
                <p className='ml-5'>Name: Konkamon Fungsuk</p>
                <p className='ml-5'>Tel: +66982942147</p>
                <p className='ml-5'>Email: konkamonfungsuk@gmail.com</p>
            </div>
        </div>
    );
}

export default SummaryRoomDetail;
