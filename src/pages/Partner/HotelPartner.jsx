import React, { useState, useEffect } from "react";
import axios from "axios";
import RoomModal from "../../Components/ModalOther/RoomModal"
import useUserStore from "../../stores/user-store";

export default function HotelPartner() {
  const [partner, setPartner] = useState(null);
  const [hotel, setHotel] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [isAddEditModalOpen, setIsAddEditModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const API = import.meta.env.VITE_API;
  const token = useUserStore((state) => state.token);

  useEffect(() => {
    fetchPartnerInfo();
  }, [API, token]);

  const fetchPartnerInfo = async () => {
    try {
      const response = await axios.get(`${API}/partner`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPartner(response.data.partner || {});
      setHotel(response.data.hotel || {});
      setRooms(response.data.hotel?.rooms || []);
    } catch (error) {
      console.error("Error fetching partner info:", error);
    }
  };

  const openAddEditModal = (room = null) => {
    setSelectedRoom(room);
    setIsEditMode(!!room);
    setIsAddEditModalOpen(true);
  };

  const closeAddEditModal = () => {
    setSelectedRoom(null);
    setIsEditMode(false);
    setIsAddEditModalOpen(false);
  };

  const handleDeleteRoom = async (roomId) => {
    const confirmed = window.confirm("Are you sure you want to delete this room?");
    if (!confirmed) return;

    try {
      await axios.delete(`${API}/room/${roomId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchPartnerInfo();
    } catch (error) {
      console.error("Error deleting room:", error);
    }
  };

  return (
    <div className="w-full text-[#543310]">
      <p className="bg-[#AF8F6F] text-3xl font-bold rounded-lg p-2 text-center shadow-lg">
        ROOMS
      </p>
      <button
        className="bg-green-500 text-white p-2 rounded-md mb-4"
        onClick={() => openAddEditModal()}
      >
        + Add Room
      </button>
      <table className="text-center w-full mt-4 border-collapse">
        <thead>
          <tr className="bg-[#AF8F6F]">
            <th className="border-collapse border p-2">ID</th>
            <th className="border-collapse border p-2">NAME</th>
            <th className="border-collapse border p-2">DETAIL</th>
            <th className="border-collapse border p-2">TYPE</th>
            <th className="border-collapse border p-2">PRICE</th>
            <th className="border-collapse border p-2">FACILITY & SIZE</th>
            <th className="border-collapse border p-2">AMOUNT</th>
            <th className="border-collapse border p-2">STATUS</th>
            <th className="border-collapse border p-2">ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {rooms.map((room) => (
            <tr key={room.id} className="bg-[#F8F4E1]">
              <td className="border-collapse border p-2">{room.id}</td>
              <td className="border-collapse border p-2">{room.name}</td>
              <td className="border-collapse border p-2">{room.detail}</td>
              <td className="border-collapse border p-2">{room.type}</td>
              <td className="border-collapse border p-2">{room.price}</td>
              <td className="border-collapse border p-2">{room.size}</td>
              <td className="border-collapse border p-2">{room.roomAmount}</td>
              <td className="border-collapse border p-2">{room.status}</td>
              <td className="border-collapse border p-2">
                <button onClick={() => openAddEditModal(room)}>Edit</button>
                <button onClick={() => handleDeleteRoom(room.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isAddEditModalOpen && (
        <RoomModal
          room={selectedRoom}
          isEditMode={isEditMode}
          onClose={closeAddEditModal}
          onSave={() => {
            fetchPartnerInfo();
            closeAddEditModal();
          }}
        />
      )}
    </div>
  );
}
