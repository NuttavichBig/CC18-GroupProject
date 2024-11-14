import React, { useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import useHotelStore from "../../stores/hotel-store";

function HotelDetailRecommend() {
  const navigate = useNavigate();


  const currentHotel = useHotelStore((state) => state.currentHotel);
  const allHotels = useHotelStore((state) => state.allHotels);
  const actionSetCurrentHotel = useHotelStore(
    (state) => state.actionSetCurrentHotel
  );

  // ใช้ useMemo กรองโรงแรมที่ไม่ใช่โรงแรมปัจจุบัน
  const recommendedHotels = useMemo(() => {
    return allHotels.filter((hotel) => hotel.id !== currentHotel?.id);
  }, [allHotels, currentHotel]);

  // Memoize handleViewDetails เพื่อลดการสร้างฟังก์ชันใหม่ในทุกการ render
  const handleViewDetails = useCallback(
    (hotel) => {
      if (currentHotel?.id !== hotel.id) {
        // อัปเดตเฉพาะเมื่อโรงแรมเปลี่ยน
        actionSetCurrentHotel(hotel);
      }
      navigate("/bookinghotel-detail");
    },
    [currentHotel, actionSetCurrentHotel, navigate]
  );

  return (
    <div
      className="bg-cream-gradient"
      style={{
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
          color: "#543310",
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
            src={hotel.img}
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
                color: "#543310",
              }}
            >
              {hotel.name}
            </h4>
            <p style={{ color: "#6b6b6b", fontSize: "0.875rem" }}>
              {hotel.address}
            </p>
            <p
              style={{
                fontSize: "1.25rem",
                fontWeight: "bold",
                marginTop: "8px",
                color: "#f08a4b",
              }}
            >
              THB{" "}
              {hotel.rooms.length
                ? Math.min(...hotel.rooms.map((room) => parseFloat(room.price)))
                : "N/A"}
            </p>
          </div>
          <button
            className="bg-gradient-to-r from-[#f08a4b] to-[#e05b3c] text-white py-2 px-4 rounded-full font-bold shadow-lg transition-transform duration-200 cursor-pointer hover:scale-105 hover:shadow-[inset_0_0_8px_rgba(240,138,75,0.4),0_4px_15px_rgba(240,138,75,0.6),0_4px_15px_rgba(224,91,60,0.4)]"
            onClick={() => handleViewDetails(hotel)}
            style={{
              backgroundColor: "#f08a4b",
              padding: "8px 16px",
              borderRadius: "20px",
              color: "white",
              fontWeight: "bold",
              transition: "transform 0.2s",
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
