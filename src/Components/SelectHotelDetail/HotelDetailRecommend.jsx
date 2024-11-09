import React from 'react';
import { useNavigate } from 'react-router-dom';

function HotelDetailRecommend() {
    const navigate = useNavigate();
    const recommendedHotels = [
        {
            id: 1,
            name: "B2 South Pattaya Premier Hotel",
            price: 750,
            location: "Lotte Hotels & Resorts Korea",
            imageUrl: "/1.jpg",
        },
        {
            id: 2,
            name: "B2 North Pattaya Premier Hotel",
            price: 800,
            location: "Lotte Hotels & Resorts Korea",
            imageUrl: "/2.jpg",
        },
        {
            id: 3,
            name: "B2 Central Pattaya Premier Hotel",
            price: 820,
            location: "Lotte Hotels & Resorts Korea",
            imageUrl: "/3.jpg",
        }
    ];

    return (
        <div style={{
            background: 'linear-gradient(to bottom right, #fffaf2, #fff0db)',
            borderRadius: '12px',
            padding: '16px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            width: '100%',
        }}>
            <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '16px', color: '#413831' }}>Recommended Hotels</h3>
            {recommendedHotels.map(hotel => (
                <div key={hotel.id} style={{
                    display: 'flex',
                    alignItems: 'center',
                    backgroundColor: '#fff',
                    padding: '16px',
                    borderRadius: '12px',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                    border: '1px solid #e5a478',
                    marginBottom: '16px',
                }}>
                    <img src={hotel.imageUrl} alt={hotel.name} style={{
                        width: '8rem',
                        height: '5rem',
                        objectFit: 'cover',
                        borderRadius: '8px',
                        marginRight: '16px',
                    }} />
                    <div style={{ flexGrow: 1 }}>
                        <h4 style={{ fontWeight: '600', fontSize: '1.125rem', color: '#413831' }}>{hotel.name}</h4>
                        <p style={{ color: '#6b6b6b', fontSize: '0.875rem' }}>{hotel.location}</p>
                        <p style={{ fontSize: '1.25rem', fontWeight: 'bold', marginTop: '8px', color: '#f08a4b' }}>THB {hotel.price}</p>
                    </div>
                    <button
                        onClick={() => navigate('/bookinghotel-detail')}
                        style={{
                            background: 'linear-gradient(to right, #f08a4b, #e05b3c)',
                            color: '#fff',
                            padding: '0.5rem 1rem',
                            borderRadius: '9999px',
                            fontWeight: 'bold',
                            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                            transition: 'transform 0.2s ease-in-out',
                            cursor: 'pointer'
                        }}
                    >
                        BOOK NOW
                    </button>
                </div>
            ))}
        </div>
    );
}

export default HotelDetailRecommend;
