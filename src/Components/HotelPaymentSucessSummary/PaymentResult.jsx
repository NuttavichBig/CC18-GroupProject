// PaymentResult.jsx
import React from 'react';
import hotelsuccessicon from '../../assets/hotelsuccesspaymenticon.jpg';

function PaymentResult() {
    const roomDetails = [
        {
            title: "Superior Premier",
            description: ["Without Breakfast", "1 double bed", "Air conditioning"],
            imageUrl: "/1.jpg",
        },
        {
            title: "Deluxe Premier",
            description: ["Without Breakfast", "1 double bed", "Air conditioning"],
            imageUrl: "/2.jpg",
        },
        {
            title: "Junior Suite",
            description: ["With Breakfast", "1 king bed", "Sea view"],
            imageUrl: "/3.jpg",
        },
        {
            title: "Executive Suite",
            description: ["With Breakfast", "2 double beds", "City view"],
            imageUrl: "/4.jpg",
        }
    ];

    return (
        <div className="max-w-4xl mx-auto p-8 bg-[#fef6e4] rounded-lg shadow-md space-y-8">

            <div className="flex justify-between items-center text-gray-700">
                <p className="text-lg font-medium">Book Number</p>
                <p className="text-lg font-medium">LL866PT</p>
            </div>


            <div className="flex items-center justify-between">
                <div className="w-[250px] text-center p-4 border rounded-lg bg-white border-orange-400">
                    <p className="text-orange-500 font-medium ">Check-In</p>
                    <p>Wed, 25 Oct 2024</p>
                    <p>From 14:00</p>
                </div>

                <div className="text-orange-500 font-medium text-center flex flex-col items-center">
                    <p>6 nights</p>
                    <div className="flex items-center space-x-0">
                        <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                        <div className="w-64 h-0.5 bg-orange-500"></div>
                        <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    </div>
                </div>

                <div className="w-[250px] text-center p-4 border rounded-lg bg-white border-orange-400">
                    <p className="text-orange-500 font-medium">Check-Out</p>
                    <p>Thur, 31 Oct 2024</p>
                    <p>Before 12:00</p>
                </div>
            </div>


            <div className="grid grid-cols-2 gap-8 mt-4">
                {roomDetails.map((room, index) => (
                    <div key={index} className="flex space-x-4 items-start">
                        <img src={room.imageUrl} alt={room.title} className="w-48 h-28 rounded-lg object-cover" />
                        <div className="text-left">
                            <p className="font-medium mt-2">{room.title}</p>
                            {room.description.map((line, i) => (
                                <p key={i}>{line}</p>
                            ))}
                        </div>
                    </div>
                ))}
            </div>


            <div className="flex justify-between items-center mt-4 text-gray-700">
                <p className="text-lg font-medium">Total Price</p>
                <p className="text-xl font-semibold text-orange-500">THB 3,890.00</p>
            </div>


            <div className="flex justify-between items-start mt-6 text-gray-700">
                <p className="font-medium">Contact Details</p>
                <div className="text-left">
                    <p>Name: Konkamon Fungsuk</p>
                    <p>Tel: +668926924147</p>
                    <p>Email: konkamonfungsuk@gmail.com</p>
                </div>
            </div>


            <div className="flex flex-col items-center mt-8">
                <p className="text-green-500 text-2xl font-semibold">SUCCESS</p>
                <img src={hotelsuccessicon} alt="Success Icon" className="w-20 h-20" />
            </div>
        </div>
    );
}

export default PaymentResult;
