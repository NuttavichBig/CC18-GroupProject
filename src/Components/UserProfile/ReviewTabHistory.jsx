import React, { useState } from 'react';
import dropdownIcon from '../../assets/drop-down-arrow-icon_Mypurchase.gif';

function ReviewTabHistory() {
    const [selectedHotelIndexes, setSelectedHotelIndexes] = useState([]);

    const HotelReviewlist = [
        {
            hotelName: "B2 South Pattaya Premier Hotel",
            imageUrl: "/1.jpg",
            details: {
                description: "B2 South Pattaya Premier Hotel is a hotel in a good neighborhood, which is located at South Pattaya. 24-hours front desk is available to serve you, from check-in to check-out.",
                rating: 4,
                review: "โรงแรมหรูใจกลางเมืองพัทยา พร้อมวิวที่สวยงามและสิ่งอำนวยความสะดวกที่ครบครัน บรรยากาศดีมากๆเลย",
                images: ["/5.jpg", "/6.jpg"]
            }
        },
        {
            hotelName: "Lotte Hotels & Resorts Korea",
            imageUrl: "/2.jpg",
            details: {
                description: "An exquisite hotel in Korea offering a blend of luxury and Korean traditional aesthetics.",
                rating: 5,
                review: "โรงแรมหรูในเกาหลีที่มีการผสมผสานความหรูหรากับสไตล์ดั้งเดิมของเกาหลี ให้ฟีลดี มีกิมจิให้กิน บริการดี",
                images: ["/7.jpg", "/8.jpg"]
            }
        },
        {
            hotelName: "The Grand Palace Hotel Tokyo",
            imageUrl: "/3.jpg",
            details: {
                description: "Experience Tokyo’s traditional charm at The Grand Palace Hotel with views of Japanese gardens.",
                rating: 3,
                review: "เข้าที่พักง่าย สบาย มีสระน้ำ สะอาดดี สัมผัสเสน่ห์แบบดั้งเดิมของโตเกียวที่โรงแรม The Grand Palace พร้อมวิวสวนญี่ปุ่น",
                images: ["/9.jpg", "/10.jpg"]
            }
        }
    ];

    const handleToggleDetails = (index) => {
        setSelectedHotelIndexes(prevIndexes =>
            prevIndexes.includes(index)
                ? prevIndexes.filter(i => i !== index) // ลบ index ออกหากมีอยู่แล้ว
                : [...prevIndexes, index] // เพิ่ม index หากไม่มี
        );
    };


    const renderStars = (rating) => {
        const fullStars = "★".repeat(rating);
        const emptyStars = "★".repeat(5 - rating);

        return (
            <div className="flex">
                <span className="text-yellow-500">{fullStars}</span>
                <span className="text-gray-300">{emptyStars}</span>
            </div>
        );
    };

    return (
        <div className="max-w-4xl mx-auto p-8 rounded-lg space-y-4">
            {HotelReviewlist.map((hotel, index) => (
                <div key={index} className="p-4 bg-[#FFF8EC] rounded-lg shadow-lg mb-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <img
                                src={hotel.imageUrl}
                                alt={hotel.hotelName}
                                className="w-24 h-24 rounded-lg object-cover mr-4"
                            />
                            <div className="text-left">
                                <p className="text-lg font-medium">{hotel.hotelName}</p>
                                <div className="flex items-center">
                                    <span className="text-gray-600 mr-2">Rating:</span>
                                    {renderStars(hotel.details.rating)}
                                </div>
                            </div>
                        </div>
                        <button onClick={() => handleToggleDetails(index)}>
                            <img
                                src={dropdownIcon}
                                alt="Toggle Details"
                                className={`w-12 h-12 transform ${selectedHotelIndexes.includes(index) ? 'rotate-180' : ''}`}
                            />
                        </button>
                    </div>
                    {selectedHotelIndexes.includes(index) && (
                        <div className="mt-4 p-4 bg-[#FFE6C4] rounded-lg shadow-md">
                            <p className="font-semibold">Review</p>
                            <div className="mt-2 p-3 bg-[#FFF3D6] rounded-lg shadow-inner">
                                <p className="text-gray-700">{hotel.details.review}</p>
                            </div>
                            <div className="grid grid-cols-2 gap-4 mt-4">
                                {hotel.details.images.map((img, imgIndex) => (
                                    <img key={imgIndex} src={img} alt={`Room ${imgIndex + 1}`} className="w-full h-40 object-cover rounded-lg" />
                                ))}
                            </div>
                            <div className="flex justify-end mt-4">
                                <button
                                    className="bg-orange-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-orange-600 transition duration-200 ease-in-out flex items-center"
                                >
                                    <span className="mr-2">🗑️</span>
                                    ลบรีวิว
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

export default ReviewTabHistory;
