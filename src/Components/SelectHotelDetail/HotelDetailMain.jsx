import React, { useState } from 'react';
import useHotelStore from '../../stores/hotel-store';

const HotelDetailMain = () => {
    const formatFacilityName = (key) => {
        return key.replace(/is|([A-Z])/g, " $1").trim().replace(/  +/g, " ");
    }

    const currentHotel = useHotelStore(state => state.currentHotel)



    return (
        <div className="flex flex-col rounded-lg w-full p-6 bg-cream-gradient space-y-6 text-[#543310]">

            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">{currentHotel.name}</h2>
            </div>


            <div className="rounded-lg overflow-hidden">
                <img src={currentHotel.img} alt={currentHotel.name} className="w-full h-64 object-cover" />
            </div>


            <p className="text-gray-700">
                {currentHotel.detail || "A beautiful hotel located in a prime area, offering luxurious facilities and services for a memorable stay."}
            </p>


            <div className="flex items-center space-x-2">
                <span className="font-semibold">Reviews:</span>
                <div className="flex">
                    <span className="text-yellow-500">{'★'.repeat(currentHotel.star)}</span>
                    <span className="text-gray-300">{'★'.repeat(5 - currentHotel.star)}</span>
                </div>
            </div>

            <div>
                <h3 className="font-semibold pb-2">Facilities:</h3>
                <div className="flex flex-wrap gap-2">
                    {Object.entries(currentHotel.facilitiesHotel || {})
                        .filter(([key, value]) => value === true)
                        .map(([key]) => (
                            <span key={key} className="px-3 py-1 bg-orange-50 shadow-md rounded-lg">
                                {formatFacilityName(key)}
                            </span>
                        ))}
                </div >
            </div >


        </div >
    );
};

export default HotelDetailMain;
