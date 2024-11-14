import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import useHotelStore from "../../stores/hotel-store";

function HotelDetailRoom({ rooms }) {
  const navigate = useNavigate();
  const actionSetSelectedRoom = useHotelStore((state) => state.actionSetSelectedRoom);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImages, setModalImages] = useState([]);

  if (!rooms || rooms.length === 0) {
    return <div>No rooms available at this time.</div>;
  }

  const formatFacilityName = (key) => {
    return key
      .replace(/is|([A-Z])/g, " $1")
      .trim()
      .replace(/  +/g, " ");
  };

  const openImageModal = (images) => {
    setModalImages(images);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Close modal when clicking outside of modal content
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (event.target.classList.contains("modal-overlay")) {
        closeModal();
      }
    };

    if (isModalOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isModalOpen]);

  const handleBookNow = (room) => {
    actionSetSelectedRoom(room);
    navigate("/bookinghotel-detail-payment");
  };

  return (
    <div style={{ padding: "16px", width: "100%" }}>
      <h3 style={{ fontSize: "1.125rem", fontWeight: "600", marginBottom: "16px", color: "#413831" }}>
        Rooms
      </h3>
      {rooms.map((room) => (
        <div
          key={room.id}
          style={{
            position: "relative",
            display: "flex",
            backgroundColor: "#fff",
            padding: "16px",
            borderRadius: "12px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            border: "1px solid #e5a478",
            marginBottom: "16px",
          }}
        >
          <div style={{ width: "12rem", height: "8rem", marginRight: "16px" }} onClick={() => openImageModal(room.images)}>
            <Carousel showThumbs={false} showStatus={false} infiniteLoop>
              {room.images && room.images.length > 0 ? (
                room.images.map((image, index) => (
                  <div key={index}>
                    <img
                      src={image.img}
                      alt={`${room.type} image ${index + 1}`}
                      style={{ objectFit: "cover", borderRadius: "8px", width: "100%", height: "100%" }}
                    />
                  </div>
                ))
              ) : (
                <div>
                  <img
                    src="/default-room.jpg"
                    alt="Default room"
                    style={{ objectFit: "cover", borderRadius: "8px", width: "100%", height: "100%" }}
                  />
                </div>
              )}
            </Carousel>
          </div>
          <div style={{ flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
              <h4 style={{ fontSize: "1rem", fontWeight: "600", color: "#543310" }}>{room.name}</h4>
              <div className="text-[#543310] flex items-center ">
                <div className="w-[100px]">Facilities :</div>
                <div className="h-full flex flex-wrap items-center">
                  {Object.entries(room.facilitiesRoom || {})
                    .filter(([key, value]) => value === true)
                    .map(([key]) => (
                      <span
                        key={key}
                        className="text-[#543310] m-1 px-3 py-1 bg-orange-100 shadow-md rounded-lg"
                      >
                        {formatFacilityName(key)}
                      </span>
                    ))}
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-5">
            <div className="flex flex-col gap-2 w-[60px]">
              <p style={{ fontWeight: "600", color: "#543310" }}>Guests</p>
              <p style={{ fontSize: "0.875rem", color: "#6b6b6b" }}>
                {room.recommendPeople || "Not specified"} Adults
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <p style={{ fontWeight: "600", color: "#543310" }}>Room</p>
              <p style={{ fontSize: "0.875rem", color: "#6b6b6b" }}>{room.type || "Not specified"}</p>
            </div>
          </div>
          <span style={{ fontSize: "1.25rem", fontWeight: "bold", color: "#f08a4b", marginLeft: "16px", whiteSpace: "nowrap" }}>
            THB {room.price || "N/A"}
          </span>
          <button
            className="absolute right-4 bottom-4 bg-gradient-to-r from-[#f08a4b] to-[#e05b3c] text-white font-bold py-2 px-4 rounded-full text-base shadow-lg transition-transform duration-200 cursor-pointer hover:scale-105 hover:shadow-[inset_0_0_8px_rgba(240,138,75,0.4),0_4px_15px_rgba(240,138,75,0.6),0_4px_15px_rgba(224,91,60,0.4)]"
            onClick={() => handleBookNow(room)}
          >
            BOOK NOW
          </button>
        </div>
      ))}

      {/* Modal for larger image carousel */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 modal-overlay">
          <div className="bg-white rounded-lg overflow-hidden max-w-4xl w-full p-4 relative">
            <button
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-2xl"
              onClick={closeModal}
            >
              &times;
            </button>
            <Carousel showThumbs={false} showStatus={false} infiniteLoop>
              {modalImages.map((image, index) => (
                <div key={index}>
                  <img
                    src={image.img}
                    alt={`Room image ${index + 1}`}
                    className="w-full h-[500px] object-cover rounded-lg"
                  />
                </div>
              ))}
            </Carousel>
          </div>
        </div>
      )}
    </div>
  );
}

export default HotelDetailRoom;
