import React from 'react';
import { useNavigate } from 'react-router-dom';

function HotelDetailRoom({ rooms }) {
    const navigate = useNavigate();

    if (!rooms || rooms.length === 0) {
        return <div>No rooms available at this time.</div>;
    }

    const formatFacilityName = (key) => {
        return key.replace(/is|([A-Z])/g, " $1").trim().replace(/  +/g, " ");
    }

    const handleBookNow = (room) => {
        navigate('/bookinghotel-detail-payment', { state: { room } });
    };

    return (
        <div style={{
            background: 'linear-gradient(to bottom right, #fffaf2, #fff0db)',
            borderRadius: '12px',
            padding: '16px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            width: '100%',
        }}>
            <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '16px', color: '#413831' }}>Rooms</h3>
            {rooms.map((room) => (
                <div key={room.id} style={{
                    position: 'relative',
                    display: 'flex',
                    backgroundColor: '#fff',
                    padding: '16px',
                    borderRadius: '12px',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                    border: '1px solid #e5a478',
                    marginBottom: '16px',
                }}>
                    <img
                        src={room.images && room.images.length > 0 ? room.images[0].img : "/default-room.jpg"}
                        alt={room.type}
                        style={{
                            width: '8rem',
                            height: '6rem',
                            objectFit: 'cover',
                            borderRadius: '8px',
                            marginRight: '16px',
                        }}
                    />
                    <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                            <div>
                                <h4 style={{ fontSize: '1rem', fontWeight: '600', color: '#413831' }}>{room.type}</h4>
                                {Object.entries(room.facilitiesRoom || {})
                                    .filter(([key, value]) => value === true)
                                    .map(([key]) => (
                                        <span key={key} style={{
                                            padding: '0.25rem 0.5rem',
                                            backgroundColor: '#fbd1a2',
                                            borderRadius: '4px',
                                            color: '#413831',
                                            fontSize: '0.875rem',
                                            fontWeight: 'bold',
                                            marginRight: '0.5rem',
                                            display: 'inline-block'
                                        }}>
                                            {formatFacilityName(key)}
                                        </span>
                                    ))}
                            </div>
                            <div>
                                <p style={{ fontWeight: '600', color: '#413831' }}>Guests</p>
                                <p style={{ fontSize: '0.875rem', color: '#6b6b6b' }}>{room.recommendPeople || "Not specified"} Adult</p>
                            </div>
                            <div>
                                <p style={{ fontWeight: '600', color: '#413831' }}>Available Room</p>
                                <p style={{ fontSize: '0.875rem', color: '#6b6b6b' }}>{room.status || "Not specified"}</p>
                            </div>
                        </div>
                    </div>
                    <span style={{
                        fontSize: '1.25rem',
                        fontWeight: 'bold',
                        color: '#f08a4b',
                        marginLeft: '16px',
                        whiteSpace: 'nowrap'
                    }}>THB {room.price || "N/A"}</span>
                    <button
                        style={{
                            position: 'absolute',
                            right: '16px',
                            bottom: '16px',
                            background: 'linear-gradient(to right, #f08a4b, #e05b3c)',
                            color: '#fff',
                            fontWeight: 'bold',
                            padding: '0.4rem 1rem',
                            borderRadius: '20px',
                            fontSize: '0.875rem',
                            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                            transition: 'transform 0.2s ease-in-out',
                            cursor: 'pointer',
                        }}
                        onClick={() => handleBookNow(room)}
                    >
                        BOOK NOW
                    </button>
                </div>
            ))}
        </div>
    );
}

export default HotelDetailRoom;
