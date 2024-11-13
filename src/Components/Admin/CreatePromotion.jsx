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
      onCreateSuccess(response.data.promotion);
      onClose();
    } catch (error) {
      console.error("Error creating promotion:", error);
      alert("Error creating promotion. Please try again.");
    }
  };

  return (
    <div
      onClick={() => onClose()}
      className="flex items-center justify-center fixed inset-0 bg-[#83959f6d] z-50"
    >
      <div
        className="bg-white rounded-xl shadow-xl p-8 relative w-full max-w-3xl h-[600px] overflow-hidden overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => onClose()}
          className="absolute top-4 right-4 text-3xl font-semibold text-[#0088d1] bg-transparent border-none cursor-pointer"
        >
          &times;
        </button>

        <div className="text-center mb-8">
          <p className="text-3xl font-bold text-[#0088d1]">Create Promotion</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <input
              type="text"
              name="name"
              placeholder="Promotion Campaign"
              onChange={handleChange}
              className="bg-white border-2 border-[#163067] rounded-lg p-4 w-full focus:outline-none focus:ring-2 focus:ring-[#204189] text-[#0088d1] placeholder:text-[#6d8e9f] shadow-md transition-all duration-200 ease-in-out"
            />
            <input
              type="text"
              name="description"
              placeholder="Promotion Description"
              onChange={handleChange}
              className="bg-white border-2 border-[#163067] rounded-lg p-4 w-full focus:outline-none focus:ring-2 focus:ring-[#204189] text-[#0088d1] placeholder:text-[#6d8e9f] shadow-md transition-all duration-200 ease-in-out"
            />
            <input
              type="number"
              name="discountPercent"
              placeholder="Discount Percentage"
              onChange={handleChange}
              className="bg-white border-2 border-[#163067] rounded-lg p-4 w-full focus:outline-none focus:ring-2 focus:ring-[#204189] text-[#0088d1] placeholder:text-[#6d8e9f] shadow-md transition-all duration-200 ease-in-out"
            />
            <input
              type="number"
              name="discountValue"
              placeholder="Discount Value"
              onChange={handleChange}
              className="bg-white border-2 border-[#163067] rounded-lg p-4 w-full focus:outline-none focus:ring-2 focus:ring-[#204189] text-[#0088d1] placeholder:text-[#6d8e9f] shadow-md transition-all duration-200 ease-in-out"
            />
            <input
              type="number"
              name="minimumSpend"
              placeholder="Minimum Spend"
              onChange={handleChange}
              className="bg-white border-2 border-[#163067] rounded-lg p-4 w-full focus:outline-none focus:ring-2 focus:ring-[#204189] text-[#0088d1] placeholder:text-[#6d8e9f] shadow-md transition-all duration-200 ease-in-out"
            />
            <input
              type="number"
              name="maxDiscount"
              placeholder="Maximum Discount"
              onChange={handleChange}
              className="bg-white border-2 border-[#163067] rounded-lg p-4 w-full focus:outline-none focus:ring-2 focus:ring-[#204189] text-[#0088d1] placeholder:text-[#6d8e9f] shadow-md transition-all duration-200 ease-in-out"
            />
            <input
              type="number"
              name="usageLimit"
              placeholder="Usage Limit"
              onChange={handleChange}
              className="bg-white border-2 border-[#163067] rounded-lg p-4 w-full focus:outline-none focus:ring-2 focus:ring-[#204189] text-[#0088d1] placeholder:text-[#6d8e9f] shadow-md transition-all duration-200 ease-in-out"
            />
            <input
              type="number"
              name="userLimit"
              placeholder="User Limit"
              onChange={handleChange}
              className="bg-white border-2 border-[#163067] rounded-lg p-4 w-full focus:outline-none focus:ring-2 focus:ring-[#204189] text-[#0088d1] placeholder:text-[#6d8e9f] shadow-md transition-all duration-200 ease-in-out"
            />
          </div>

          <div className="space-y-2">
            <label className="text-lg font-semibold text-[#0088d1]">Upload Image</label>
            <input
              type="file"
              name="img"
              accept="image/*"
              onChange={handleFileChange}
              className="bg-white border-2 border-[#163067] rounded-lg p-4 w-full focus:outline-none focus:ring-2 focus:ring-[#204189] text-[#0088d1] placeholder:text-[#6d8e9f] shadow-md transition-all duration-200 ease-in-out"
            />
          </div>

          <div className="space-y-2">
            <label className="text-lg font-semibold text-[#0088d1]">Promotion Duration</label>
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
              className="z-50"
            />
          </div>

          <div className="flex justify-center space-x-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="bg-[#0088d1] text-white py-2 px-6 rounded-lg shadow-md hover:bg-[#76cfff] hover:font-medium hover:text-[#204189] transition-all duration-200 ease-in-out"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-white border-2 border-[#163067] text-[#0088d1] py-2 px-6 rounded-lg shadow-md hover:bg-[#0088d1] hover:text-white transition-all duration-200 ease-in-out"
            >
              Create Promotion
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
