import React, { useState, useEffect } from "react";  
import axios from "axios"; 
import useUserStore from "../../stores/user-store";

export default function RoomModal({ room, isEditMode, onClose, onSave }) {
  const [name, setName] = useState(room?.name || "");
  const [detail, setDetail] = useState(room?.detail || "");
  const [type, setType] = useState(room?.type || ""); 
  const [recommendPeople, setRecommendPeople] = useState(room?.recommendPeople || "");
  const [status, setStatus] = useState(room?.status || "");
  const [price, setPrice] = useState(room?.price || "");
  const [size, setSize] = useState(room?.size || "");

  const [roomAmount, setRoomAmount] = useState(room?.roomAmount || "");
  const [images, setImages] = useState([]); 
  const [errorMessages, setErrorMessages] = useState({}); 

  const API = import.meta.env.VITE_API;
  const token = useUserStore((state) => state.token);

  const maxPeopleByType = {
    SINGLE: 2,
    DOUBLE: 4,
    MASTER: 6,
  };

  const handleTypeChange = (e) => {
    const selectedType = e.target.value;
    setType(selectedType);
    setRecommendPeople(""); 
    setErrorMessages((prev) => ({ ...prev, type: "" })); 
    switch (selectedType) {
      case "SINGLE":
        setRecommendPeople("1");
        break;
      case "DOUBLE":
        setRecommendPeople("2");
        break;
      case "MASTER":
        setRecommendPeople("4");
        break;
      default:
        setRecommendPeople("");
    }
  };

  const handleRecommendPeopleChange = (e) => {
    const value = e.target.value;
    const maxPeople = maxPeopleByType[type] || 0;

    if (value > maxPeople) {
      setErrorMessages((prev) => ({
        ...prev,
        recommendPeople: `Max recommended people for ${type} room is ${maxPeople}`,
      }));
    } else {
      setErrorMessages((prev) => ({ ...prev, recommendPeople: "" }));
    }

    setRecommendPeople(value);
  };

  const handleImageChange = (e) => {
    setImages(Array.from(e.target.files)); 
  };

  const handleSave = async () => {
    const errors = {};

    if (!name) errors.name = "Room Name is required";
    if (!type) errors.type = "Room Type is required";
    if (price <= 0) errors.price = "Room Price must be greater than 0";
    if (roomAmount <= 0) errors.roomAmount = "Room Amount must be greater than 0";

    if (Object.keys(errors).length > 0) {
      setErrorMessages(errors);
      return;
    }

    const roomData = new FormData();
    roomData.append("name", name);
    roomData.append("detail", detail);
    roomData.append("type", type); 
    roomData.append("recommendPeople", recommendPeople);
    roomData.append("price", price);
    roomData.append("size", size);
    roomData.append("roomAmount", roomAmount);

    images.forEach((image) => {
      roomData.append("images[]", image);
    });

    try {
      let response;
      if (isEditMode) {
        response = await axios.patch(`${API}/room/${room.id}`, roomData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
      } else {
        response = await axios.post(`${API}/room`, roomData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
      }
      console.log("Room saved successfully:", response.data);
      onSave(); 
    } catch (error) {
      console.error("Error saving room:", error.response?.data || error.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-700 bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
        >
          &times;
        </button>
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          {isEditMode ? "Edit Room" : "Add Room"}
        </h2>
        <div className="space-y-4">
          <input
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Room Name"
          />
          {errorMessages.name && <p className="text-red-500 text-sm">{errorMessages.name}</p>}

          <textarea
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={detail}
            onChange={(e) => setDetail(e.target.value)}
            placeholder="Room Detail"
          />
          
          <select
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={type}
            onChange={handleTypeChange}
          >
            <option value="SINGLE">SINGLE</option>
            <option value="DOUBLE">DOUBLE</option>
            <option value="MASTER">MASTER</option>
          </select>
          {errorMessages.type && <p className="text-red-500 text-sm">{errorMessages.type}</p>}

          <input
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={recommendPeople}
            onChange={handleRecommendPeopleChange}
            placeholder="Recommend People"
          />
          {errorMessages.recommendPeople && <p className="text-red-500 text-sm">{errorMessages.recommendPeople}</p>}

          <input
            type="number"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Room Price"
          />
          {errorMessages.price && <p className="text-red-500 text-sm">{errorMessages.price}</p>}

          <input
            type="number"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={size}
            onChange={(e) => setSize(e.target.value)}
            placeholder="Room Size (m²)"
          />

          <input
            type="number"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={roomAmount}
            onChange={(e) => setRoomAmount(e.target.value)}
            placeholder="Room Amount"
          />
          {errorMessages.roomAmount && <p className="text-red-500 text-sm">{errorMessages.roomAmount}</p>}

          <input
            type="file"
            multiple
            onChange={handleImageChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Choose Images"
          />
        </div>
        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="mr-4 px-4 py-2 rounded-md border border-gray-400 text-gray-600 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
