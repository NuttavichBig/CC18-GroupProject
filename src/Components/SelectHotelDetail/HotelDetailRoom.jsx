import React from 'react';
import { useNavigate } from 'react-router-dom';
import useHotelStore from '../../stores/hotel-store';

function HotelDetailRoom({ rooms }) {
    const navigate = useNavigate();
    const actionSetSelectedRoom = useHotelStore(state=>state.actionSetSelectedRoom)
    const actionClearSelectedRooms = useHotelStore(state=>state.actionClearSelectedRooms)

    if (!rooms || rooms.length === 0) {
        return <div>No rooms available at this time.</div>;
    }

    const formatFacilityName = (key) => {
        return key.replace(/is|([A-Z])/g, " $1").trim().replace(/  +/g, " ");
    }

    const handleBookNow = (room) => {
        // actionClearSelectedRooms()
        actionSetSelectedRoom(room)
        navigate('/bookinghotel-detail-payment');
    };

    return (
        <div className="bg-[#fef6e4] rounded-lg p-4 shadow-md space-y-6 w-full">
            <h3 className="text-lg font-semibold mb-4">Rooms</h3>
            {rooms.map((room) => (
                <div key={room.id} className="flex bg-white p-4 rounded-lg shadow-md">
                    <img
                        src={room.images && room.images.length > 0 ? room.images[0].img : "/default-room.jpg"}
                        alt={room.type}
                        className="w-32 h-24 object-cover rounded-lg mr-4"
                    />

                    <div className="flex-grow flex flex-col justify-between">
                        <div className="flex space-x-8">
                            <div>
                                <h4 className="text-md font-semibold">{room.type}</h4>
                                {Object.entries(room.facilitiesRoom || {})
                                    .filter(([key, value]) => value === true)
                                    .map(([key]) => (
                                        <span key={key} className="px-2 py-1 bg-gray-200 rounded">
                                            {formatFacilityName(key)}
                                        </span>
                                    ))}
                            </div>
                            <div>
                                <p className="font-semibold">Guests</p>
                                <p className="text-sm text-gray-600">{room.recommendPeople || "Not specified"} Adult</p>
                            </div>
                            <div>
                                <p className="font-semibold">Available Room</p>
                                <p className="text-sm text-gray-600">{room.status || "Not specified"}</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col items-end justify-between ml-4">
                        <span className="text-lg font-bold text-orange-500">THB {room.price || "N/A"}</span>
                        <button
                            className="bg-orange-500 text-white py-1 px-4 rounded-md"
                            onClick={() => handleBookNow(room)}
                        >
                            BOOK NOW
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default HotelDetailRoom;
