import React from 'react';

const HotelDetailMain = ({hotelData}) => {
    const formatFacilityName = (key) =>{
        return key.replace(/is|([A-Z])/g, " $1").trim().replace(/  +/g, " ");
    }

    return (
        <div className="flex flex-col w-full p-6 bg-[#fef6e4] rounded-lg shadow-lg space-y-6">

            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">{hotelData.name}</h2>
                <span className="text-2xl font-bold text-orange-500">THB {hotelData.price}</span>
            </div>


            <div className="rounded-lg overflow-hidden">
                <img src={hotelData.img} alt={hotelData.name} className="w-full h-64 object-cover" />
            </div>


            <p className="text-gray-700">
                {hotelData.detail || "A beautiful hotel located in a prime area, offering luxurious facilities and services for a memorable stay."}
            </p>


            <div className="flex items-center space-x-2">
                <span className="font-semibold">Reviews:</span>
                <div className="flex">
                    <span className="text-yellow-500">{'★'.repeat(hotelData.star)}</span>
                    <span className="text-gray-300">{'★'.repeat(5 - hotelData.star)}</span>
                </div>
            </div>

            <div>
                <h3 className="font-semibold">Facilities:</h3>
                <div className="flex flex-wrap gap-2">
                {Object.entries(hotelData.facilitiesHotel || {})
                                    .filter(([key,value])=>value === true)
                                    .map(([key])=>(
                                        <span key={key} className="px-2 py-1 bg-gray-200 rounded">
                                            {formatFacilityName(key)}
                                        </span>
                    ))}
                </div>
            </div>


        </div>
    );
};

export default HotelDetailMain;
