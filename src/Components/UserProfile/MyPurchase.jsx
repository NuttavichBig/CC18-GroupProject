import React, { useState } from 'react';
import hotelsuccessicon from '../../assets/hotelsuccesspaymenticon.jpg';
import dropdownhistorymyPurchase from '../../assets/drop-down-arrow-icon_Mypurchase.gif';
import HotelDetailMain from '../SelectHotelDetail/HotelDetailMain';
import ReviewModal from '../ModalOther/ReviewModal';



function MyPurchase() {
    const [selectedHotelIndexes, setSelectedHotelIndexes] = useState([]);
    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
    const [reviewHotel, setReviewHotel] = useState(null);

    const HotelPurchasedlist = [
        {
            hotelName: "B2 South Pattaya Premier Hotel",
            imageUrl: "/1.jpg",
            details: {
                name: "B2 South Pattaya Premier Hotel",
                price: 750,
                imageUrl: "/1.jpg",
                rating: 4,
                facilities: ["Air Condition", "Car Parking", "Pet Friendly", "Kitchenette"],
                description: "A luxurious hotel located in the heart of Pattaya with stunning views and top-notch facilities."
            }
        },
        {
            hotelName: "Lotte Hotels & Resorts Korea",
            imageUrl: "/2.jpg",
            details: {
                name: "Lotte Hotels & Resorts Korea",
                price: 1050,
                imageUrl: "/2.jpg",
                rating: 5,
                facilities: ["Free Wifi", "Swimming Pool", "Spa", "City View"],
                description: "An exquisite hotel in Korea offering a blend of luxury and Korean traditional aesthetics."
            }
        },
        {
            hotelName: "The Grand Palace Hotel Tokyo",
            imageUrl: "/3.jpg",
            details: {
                name: "The Grand Palace Hotel Tokyo",
                price: 890,
                imageUrl: "/3.jpg",
                rating: 3,
                facilities: ["Japanese Garden", "Restaurant", "Bar", "Close to Airport"],
                description: "Experience Tokyo’s traditional charm at The Grand Palace Hotel with views of Japanese gardens."
            }
        }
    ];

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
        }
    ];

    const handleToggleDetails = (index) => {
        setSelectedHotelIndexes(prevIndexes =>
            prevIndexes.includes(index)
                ? prevIndexes.filter(i => i !== index) // ลบ index ออกหากมีอยู่แล้ว
                : [...prevIndexes, index] // เพิ่ม index หากไม่มี
        );
    };


    const handleOpenReviewModal = (hotel) => {
        setReviewHotel(hotel);
        setIsReviewModalOpen(true);
    };

    return (
        <div className="max-w-4xl mx-auto p-8 rounded-lg space-y-4 ">
            {HotelPurchasedlist.map((purchase, index) => (
                <div key={index} className="p-4 bg-[#FFF8EC] rounded-lg shadow-lg mb-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <img
                                src={purchase.imageUrl}
                                alt={purchase.hotelName}
                                className="w-24 h-24 rounded-lg object-cover mr-4"
                            />
                            <div className="text-left">
                                <p className="text-lg font-medium">{purchase.hotelName}</p>
                            </div>
                        </div>
                        <button onClick={() => handleToggleDetails(index)}>
                            <img
                                src={dropdownhistorymyPurchase}
                                alt="Toggle Details"
                                className={`w-12 h-12 transform ${selectedHotelIndexes.includes(index) ? 'rotate-180' : ''}`}
                            />
                        </button>
                    </div>
                    {selectedHotelIndexes.includes(index) && (
                        <div className="mt-4">
                            <HotelDetailMain sampleHotel={purchase.details} />
                            <div className="flex justify-end items-center">
                                <button
                                    onClick={() => handleOpenReviewModal(purchase)}
                                    className="bg-orange-500 text-white px-4 py-2 mt-5 rounded-md shadow-md hover:bg-orange-600 transition duration-200 ease-in-out"
                                >
                                    Review
                                </button>
                            </div>

                            <div className="grid grid-cols-2 gap-8 mt-4">
                                {roomDetails.map((room, i) => (
                                    <div key={i} className="flex space-x-4 items-start">
                                        <img src={room.imageUrl} alt={room.title} className="w-48 h-28 rounded-lg object-cover" />
                                        <div className="text-left">
                                            <p className="font-medium text-xl mt-2">{room.title}</p>
                                            {room.description.map((line, j) => (
                                                <p key={j}>{line}</p>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="flex justify-between items-center mt-4 text-gray-700">
                                <p className="text-lg font-medium">Total Price</p>
                                <p className="text-2xl font-bold text-orange-500">THB {(purchase.details.price * 10).toLocaleString('th-TH')}</p>
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
                    )}
                </div>
            ))}
            {isReviewModalOpen && reviewHotel && (
                <ReviewModal
                    hotelName={reviewHotel.hotelName}
                    hotelImage={reviewHotel.imageUrl}
                    onClose={() => setIsReviewModalOpen(false)}
                    onSubmit={() => console.log("Review submitted!")}
                />
            )}
        </div>
    );
}

export default MyPurchase;
