import React from "react";
import { useNavigate } from "react-router-dom";

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
    },
  ];

  return (
    <div
      style={{
        background: "linear-gradient(to bottom right, #fffaf2, #fff0db)",
        borderRadius: "12px",
        padding: "16px",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        width: "100%",
      }}
    >
      <h3
        style={{
          fontSize: "1.125rem",
          fontWeight: "600",
          marginBottom: "16px",
          color: "#413831",
        }}
      >
        Recommended Hotels
      </h3>
      {recommendedHotels.map((hotel) => (
        <div
          key={hotel.id}
          style={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "#fff",
            padding: "16px",
            borderRadius: "12px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            border: "1px solid #e5a478",
            marginBottom: "16px",
          }}
        >
          <img
            src={hotel.imageUrl}
            alt={hotel.name}
            style={{
              width: "8rem",
              height: "5rem",
              objectFit: "cover",
              borderRadius: "8px",
              marginRight: "16px",
            }}
          />
          <div style={{ flexGrow: 1 }}>
            <h4
              style={{
                fontWeight: "600",
                fontSize: "1.125rem",
                color: "#413831",
              }}
            >
              {hotel.name}
            </h4>
            <p style={{ color: "#6b6b6b", fontSize: "0.875rem" }}>
              {hotel.location}
            </p>
            <p
              style={{
                fontSize: "1.25rem",
                fontWeight: "bold",
                marginTop: "8px",
                color: "#f08a4b",
              }}
            >
              THB {hotel.price}
            </p>
          </div>
          <button
            className="bg-gradient-to-r from-[#f08a4b] to-[#e05b3c] text-white py-2 px-4 rounded-full font-bold shadow-lg transition-transform duration-200 cursor-pointer hover:scale-105 hover:shadow-[inset_0_0_8px_rgba(240,138,75,0.4),0_4px_15px_rgba(240,138,75,0.6),0_4px_15px_rgba(224,91,60,0.4)]"
            onClick={() => navigate("/bookinghotel-detail")}
          >
            BOOK NOW
          </button>
        </div>
      ))}
    </div>
  );
}

export default HotelDetailRecommend;
