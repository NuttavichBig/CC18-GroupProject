import React, { useState } from "react";
import { DateRangePicker } from "react-date-range";
import useUserStore from "../../stores/user-store";
import axios from "axios";

export default function CreatePromotion({ onCreateSuccess, onClose }) {
  const [promotionData, setPromotionData] = useState({
    name: "",
    description: "",
    discountPercent: "",
    discountValue: "",
    minimumSpend: "",
    maxDiscount: "",
    usageLimit: "",
    userLimit: "",
    startDate: new Date(),
    endDate: new Date(),
    img: null,
  });
  const token = useUserStore((state) => state.token);
  const API = import.meta.env.VITE_API;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPromotionData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e) => {
    setPromotionData((prevData) => ({ ...prevData, img: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.keys(promotionData).forEach((key) => {
        if (key === "startDate" || key === "endDate") {
          formData.append(key, promotionData[key].toISOString());
        } else {
          formData.append(key, promotionData[key]);
        }
      });

      const response = await axios.post(`${API}/admin/promotion`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      alert(response.data.message);
      onCreateSuccess();
      onClose();
    } catch (error) {
      console.error("Error creating promotion:", error);
      alert("Error creating promotion. Please try again.");
    }
  };

  return (
    <div
      onClick={() => onClose()}
      className="flex items-center justify-center fixed inset-0 bg-[#F2F7A140] z-50"
    >
      <div
        className="bg-[#F8F4E1] rounded-xl shadow-xl p-8 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => onClose()}
          className="absolute top-4 right-4 text-3xl font-semibold text-[#543310] bg-transparent border-none cursor-pointer"
        >
          &times;
        </button>

        <div className="text-center mb-8">
          <p className="text-3xl font-bold text-[#543310]">Create Promotion</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* Text Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              placeholder="Promotion Campaign"
              onChange={handleChange}
              className="bg-[#F8F4E1] border-2 border-[#543310] rounded-lg p-3 w-64 focus:outline-none focus:ring-2 focus:ring-[#F8F4E1] text-center"
            />
            <input
              type="text"
              name="description"
              placeholder="Promotion Description"
              onChange={handleChange}
              className="bg-[#F8F4E1] border-2 border-[#543310] rounded-lg p-3 w-64 focus:outline-none focus:ring-2 focus:ring-[#F8F4E1] text-center"
            />
            <input
              type="number"
              name="discountPercent"
              placeholder="Discount Percentage"
              onChange={handleChange}
              className="bg-[#F8F4E1] border-2 border-[#543310] rounded-lg p-3 w-64 focus:outline-none focus:ring-2 focus:ring-[#F8F4E1] text-center"
            />
            <input
              type="number"
              name="discountValue"
              placeholder="Discount Value"
              onChange={handleChange}
              className="bg-[#F8F4E1] border-2 border-[#543310] rounded-lg p-3 w-64 focus:outline-none focus:ring-2 focus:ring-[#F8F4E1] text-center"
            />
            <input
              type="number"
              name="minimumSpend"
              placeholder="Minimum Spend"
              onChange={handleChange}
              className="bg-[#F8F4E1] border-2 border-[#543310] rounded-lg p-3 w-64 focus:outline-none focus:ring-2 focus:ring-[#F8F4E1] text-center"
            />
            <input
              type="number"
              name="maxDiscount"
              placeholder="Maximum Discount"
              onChange={handleChange}
              required
              className="bg-[#F8F4E1] border-2 border-[#543310] rounded-lg p-3 w-64 focus:outline-none focus:ring-2 focus:ring-[#F8F4E1] text-center"
            />
            <input
              type="number"
              name="usageLimit"
              placeholder="Usage Limit"
              onChange={handleChange}
              required
              className="bg-[#F8F4E1] border-2 border-[#543310] rounded-lg p-3 w-64 focus:outline-none focus:ring-2 focus:ring-[#F8F4E1] text-center"
            />
            <input
              type="number"
              name="userLimit"
              placeholder="User Limit"
              onChange={handleChange}
              required
              className="bg-[#F8F4E1] border-2 border-[#543310] rounded-lg p-3 w-64 focus:outline-none focus:ring-2 focus:ring-[#F8F4E1] text-center"
            />
          </div>
          <input
            type="file"
            name="img"
            accept="image/*"
            onChange={handleFileChange}
            className="mt-4"
          />
          <div className="flex justify-between my-4">
            <DateRangePicker
              onChange={(range) => {
                setPromotionData({
                  ...promotionData,
                  startDate: range.selection.startDate,
                  endDate: range.selection.endDate,
                });
              }}
              ranges={[
                {
                  startDate: promotionData.startDate,
                  endDate: promotionData.endDate,
                  key: "selection",
                },
              ]}
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            Create Promotion
          </button>
        </form>
      </div>
    </div>
  );
}
