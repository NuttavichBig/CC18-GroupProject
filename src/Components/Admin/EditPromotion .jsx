import React, { useState } from "react";
import { DateRangePicker } from "react-date-range";
import useUserStore from "../../stores/user-store";
import axios from "axios";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

export default function EditPromotion({ promotion, onSave, onCancel }) {
  const [journeyDate, setJourneyDate] = useState(new Date(promotion.startDate));
  const [returnDate, setReturnDate] = useState(new Date(promotion.endDate));
  const [dateRange, setDateRange] = useState({
    startDate: new Date(promotion.startDate),
    endDate: new Date(promotion.endDate),
    key: 'selection'
  });
  const [selectedFile, setSelectedFile] = useState(null);

  const token = useUserStore((state) => state.token);
  const API = import.meta.env.VITE_API;

  const [formData, setFormData] = useState({
    name: promotion.name,
    description: promotion.description,
    discountPercent: promotion.discountPercent,
    discountValue: promotion.discountValue,
    minimumSpend: promotion.minimumSpend,
    maxDiscount: promotion.maxDiscount,
    usageLimit: promotion.usageLimit,
    userLimit: promotion.userLimit,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    })); 
  };

  const handleDateRangeChange = (ranges) => {
    setDateRange(ranges.selection);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formPayload = createFormPayload(); 
  
    try {
      const response = await axios.patch(
        `${API}/admin/promotion/${promotion.id}`, 
        formPayload, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
  
      if (response.status >= 200 && response.status < 300) {
        onSave({ ...promotion, ...formData });
        alert("Promotion updated successfully.");
      } else {
        alert("Failed to update promotion.");
      }
    } catch (error) {
      console.error("Error updating promotion:", error.response ? error.response.data : error.message);
      alert("An error occurred while updating the promotion.");
    }
  };

  const createFormPayload = () => {
    const formPayload = new FormData();
    
    const fields = {
      name: formData.name,
      description: formData.description,
      discountPercent: parseFloat(formData.discountPercent) || 0,
      discountValue: parseFloat(formData.discountValue) || 0,
      minimumSpend: parseFloat(formData.minimumSpend) || 0,
      maxDiscount: parseFloat(formData.maxDiscount) || 0,
      usageLimit: parseInt(formData.usageLimit, 10) || 0,
      userLimit: parseInt(formData.userLimit, 10) || 0,
      startDate: journeyDate.toISOString().split("T")[0],
      endDate: returnDate.toISOString().split("T")[0],
    };
 
    Object.entries(fields).forEach(([key, value]) => formPayload.append(key, value));
    
    if (selectedFile) {
      formPayload.append("img", selectedFile);
    }
  
    return formPayload;
  };

  return (
    <div
      onClick={onCancel}
      className="flex items-center justify-center fixed inset-0 bg-[#83959f6d] z-50"
    >
      <div
        className="bg-white rounded-xl shadow-xl p-8 relative w-full max-w-3xl h-[600px] overflow-hidden overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onCancel}
          className="absolute top-4 right-4 text-3xl font-semibold text-[#0088d1] bg-transparent border-none cursor-pointer"
        >
          &times;
        </button>

        <div className="text-center mb-8">
          <p className="text-3xl font-bold text-[#0088d1]">Edit Promotion</p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Text Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="name" className="text-lg font-semibold text-[#0088d1]">
                Promotion Campaign Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter promotion campaign name"
                className="bg-white border-2 border-[#163067] rounded-lg p-4 w-full focus:outline-none focus:ring-2 focus:ring-[#204189] text-[#0088d1] placeholder:text-[#6d8e9f] shadow-md transition-all duration-200 ease-in-out"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="description" className="text-lg font-semibold text-[#0088d1]">
                Description
              </label>
              <input
                type="text"
                name="description"
                id="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Enter promotion description"
                className="bg-white border-2 border-[#163067] rounded-lg p-4 w-full focus:outline-none focus:ring-2 focus:ring-[#204189] text-[#0088d1] placeholder:text-[#6d8e9f] shadow-md transition-all duration-200 ease-in-out"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="discountPercent" className="text-lg font-semibold text-[#0088d1]">
                Discount Percentage (%)
              </label>
              <input
                type="text"
                name="discountPercent"
                id="discountPercent"
                value={formData.discountPercent}
                onChange={handleInputChange}
                placeholder="Enter discount percentage"
                className="bg-white border-2 border-[#163067] rounded-lg p-4 w-full focus:outline-none focus:ring-2 focus:ring-[#204189] text-[#0088d1] placeholder:text-[#6d8e9f] shadow-md transition-all duration-200 ease-in-out"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="discountValue" className="text-lg font-semibold text-[#0088d1]">
                Discount Value (THB)
              </label>
              <input
                type="text"
                name="discountValue"
                id="discountValue"
                value={formData.discountValue}
                onChange={handleInputChange}
                placeholder="Enter discount value"
                className="bg-white border-2 border-[#163067] rounded-lg p-4 w-full focus:outline-none focus:ring-2 focus:ring-[#204189] text-[#0088d1] placeholder:text-[#6d8e9f] shadow-md transition-all duration-200 ease-in-out"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="minimumSpend" className="text-lg font-semibold text-[#543310]">
                Minimum Spend (THB)
              </label>
              <input
                type="text"
                name="minimumSpend"
                id="minimumSpend"
                value={formData.minimumSpend}
                onChange={handleInputChange}
                placeholder="Enter minimum spend"
                className="bg-white border-2 border-[#163067] rounded-lg p-4 w-full focus:outline-none focus:ring-2 focus:ring-[#204189] text-[#0088d1] placeholder:text-[#6d8e9f] shadow-md transition-all duration-200 ease-in-out"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="maxDiscount" className="text-lg font-semibold text-[#0088d1]">
                Maximum Discount (THB)
              </label>
              <input
                type="text"
                name="maxDiscount"
                id="maxDiscount"
                value={formData.maxDiscount}
                onChange={handleInputChange}
                placeholder="Enter maximum discount"
                className="bg-white border-2 border-[#163067] rounded-lg p-4 w-full focus:outline-none focus:ring-2 focus:ring-[#204189] text-[#0088d1] placeholder:text-[#6d8e9f] shadow-md transition-all duration-200 ease-in-out"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="usageLimit" className="text-lg font-semibold text-[#0088d1]">
                Usage Limit
              </label>
              <input
                type="text"
                name="usageLimit"
                id="usageLimit"
                value={formData.usageLimit}
                onChange={handleInputChange}
                placeholder="Enter usage limit"
                className="bg-white border-2 border-[#163067] rounded-lg p-4 w-full focus:outline-none focus:ring-2 focus:ring-[#204189] text-[#0088d1] placeholder:text-[#6d8e9f] shadow-md transition-all duration-200 ease-in-out"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="userLimit" className="text-lg font-semibold text-[#0088d1]">
                User Limit
              </label>
              <input
                type="text"
                name="userLimit"
                id="userLimit"
                value={formData.userLimit}
                onChange={handleInputChange}
                placeholder="Enter user limit"
                className="bg-white border-2 border-[#163067] rounded-lg p-4 w-full focus:outline-none focus:ring-2 focus:ring-[#204189] text-[#0088d1] placeholder:text-[#6d8e9f] shadow-md transition-all duration-200 ease-in-out"
              />
            </div>
          </div>

          {/* Date Range Picker */}
          <div className="space-y-2">
            <label className="text-lg font-semibold text-[#0088d1]">Promotion Duration</label>
            <DateRangePicker
              ranges={[dateRange]}
              onChange={handleDateRangeChange}
              moveRangeOnFirstSelection={false}
              editableDateInputs={true}
              months={1}
              direction="horizontal"
              className="z-50"
            />
          </div>

          {/* File Upload */}
          <div className="space-y-2">
            <label className="text-lg font-semibold text-[#0088d1]">Upload Image</label>
            <input
              type="file"
              onChange={(e) => setSelectedFile(e.target.files[0])}
              className="bg-white border-2 border-[#163067] rounded-lg p-4 w-full focus:outline-none focus:ring-2 focus:ring-[#204189] text-[#0088d1] placeholder:text-[#6d8e9f] shadow-md transition-all duration-200 ease-in-out"
            />
          </div>

          <div className="flex justify-center space-x-4 mt-6">
            <button
              type="button"
              onClick={onCancel}
              className="bg-[#0088d1] text-white py-2 px-6 rounded-lg shadow-md hover:bg-[#76cfff] hover:font-medium hover:text-[#204189] transition-all duration-200 ease-in-out"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-white border-2 border-[#0088d1] text-[#0088d1] py-2 px-6 rounded-lg shadow-md hover:bg-[#0088d1] hover:text-white transition-all duration-200 ease-in-out"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
