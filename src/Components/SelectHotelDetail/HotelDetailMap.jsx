import React from 'react';
import HotelMapPic from '../../assets/hotel-map.webp';

function HotelDetailMap() {
    return (
        <div className="bg-white rounded-lg p-4 shadow-md h-full">
            <h3 className="text-lg font-semibold mb-4">Location</h3>

            <div className="bg-gray-200 h-64 w-full flex items-center justify-center rounded-lg overflow-hidden">
                <img src={HotelMapPic} className="w-full h-full object-cover" alt="Hotel Map" />
            </div>
        </div>
    );
}

export default HotelDetailMap;
