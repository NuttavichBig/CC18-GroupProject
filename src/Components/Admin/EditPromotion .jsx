import { form } from "framer-motion/client";
import React, { useState } from "react";
import { DateRangePicker } from "react-date-range";
import useUserStore from "../../stores/user-store";

export default function EditPromotion({ promotion, onSave, onCancel }) {
  const [journeyDate, setJourneyDate] = useState(new Date(promotion.startDate));
  const [returnDate, setReturnDate] = useState(new Date(promotion.endDate));
  const [showJourneyCalendar, setShowJourneyCalendar] = useState(false);
  const [showReturnCalendar, setShowReturnCalendar] = useState(false);

  const token = useUserStore((state) => state.token);

  const [formData, setFormData] = useState({
    name: promotion.name,
    description: promotion.description,
    discountPercentage: promotion.discountPercentage,
    discountValue: promotion.discountValue,
    minimumSpend: promotion.minimumSpend,
    maximumDiscount: promotion.maximumDiscount,
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

  console.log(promotion.id)
  const handleSubmit =  async(e) => {
    try {
      console.log(formData)
      const response = await axios.patch(`${API}/admin/promotion/${promotion.id}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div
      onClick={onCancel}
      className="flex items-center justify-center fixed inset-0 bg-[#F2F7A140] z-50"
    >
      <div
        className="bg-[#F8F4E1] rounded-xl shadow-xl p-8 relative w-full max-w-3xl h-[600px] overflow-hidden overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onCancel}
          className="absolute top-4 right-4 text-3xl font-semibold text-[#543310] bg-transparent border-none cursor-pointer"
        >
          &times;
        </button>

        <div className="text-center mb-8">
          <p className="text-3xl font-bold text-[#543310]">Edit Promotion</p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Text Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="name" className="text-lg font-semibold text-[#543310]">
                Promotion Campaign Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter promotion campaign name"
                className="bg-[#F8F4E1] border-2 border-[#543310] rounded-lg p-4 w-full focus:outline-none focus:ring-2 focus:ring-[#543310] text-[#543310] placeholder:text-[#B4A791] shadow-md transition-all duration-200 ease-in-out"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="description" className="text-lg font-semibold text-[#543310]">
                Description
              </label>
              <input
                type="text"
                name="description"
                id="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Enter promotion description"
                className="bg-[#F8F4E1] border-2 border-[#543310] rounded-lg p-4 w-full focus:outline-none focus:ring-2 focus:ring-[#543310] text-[#543310] placeholder:text-[#B4A791] shadow-md transition-all duration-200 ease-in-out"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="discountPercentage" className="text-lg font-semibold text-[#543310]">
                Discount Percentage (%)
              </label>
              <input
                type="text"
                name="discountPercentage"
                id="discountPercentage"
                value={formData.discountPercentage}
                onChange={handleInputChange}
                placeholder="Enter discount percentage"
                className="bg-[#F8F4E1] border-2 border-[#543310] rounded-lg p-4 w-full focus:outline-none focus:ring-2 focus:ring-[#543310] text-[#543310] placeholder:text-[#B4A791] shadow-md transition-all duration-200 ease-in-out"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="discountValue" className="text-lg font-semibold text-[#543310]">
                Discount Value (THB)
              </label>
              <input
                type="text"
                name="discountValue"
                id="discountValue"
                value={formData.discountValue}
                onChange={handleInputChange}
                placeholder="Enter discount value"
                className="bg-[#F8F4E1] border-2 border-[#543310] rounded-lg p-4 w-full focus:outline-none focus:ring-2 focus:ring-[#543310] text-[#543310] placeholder:text-[#B4A791] shadow-md transition-all duration-200 ease-in-out"
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
                className="bg-[#F8F4E1] border-2 border-[#543310] rounded-lg p-4 w-full focus:outline-none focus:ring-2 focus:ring-[#543310] text-[#543310] placeholder:text-[#B4A791] shadow-md transition-all duration-200 ease-in-out"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="maximumDiscount" className="text-lg font-semibold text-[#543310]">
                Maximum Discount (THB)
              </label>
              <input
                type="text"
                name="maximumDiscount"
                id="maximumDiscount"
                value={formData.maximumDiscount}
                onChange={handleInputChange}
                placeholder="Enter maximum discount"
                className="bg-[#F8F4E1] border-2 border-[#543310] rounded-lg p-4 w-full focus:outline-none focus:ring-2 focus:ring-[#543310] text-[#543310] placeholder:text-[#B4A791] shadow-md transition-all duration-200 ease-in-out"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="usageLimit" className="text-lg font-semibold text-[#543310]">
                Usage Limit
              </label>
              <input
                type="text"
                name="usageLimit"
                id="usageLimit"
                value={formData.usageLimit}
                onChange={handleInputChange}
                placeholder="Enter usage limit"
                className="bg-[#F8F4E1] border-2 border-[#543310] rounded-lg p-4 w-full focus:outline-none focus:ring-2 focus:ring-[#543310] text-[#543310] placeholder:text-[#B4A791] shadow-md transition-all duration-200 ease-in-out"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="userLimit" className="text-lg font-semibold text-[#543310]">
                User Limit
              </label>
              <input
                type="text"
                name="userLimit"
                id="userLimit"
                value={formData.userLimit}
                onChange={handleInputChange}
                placeholder="Enter user limit"
                className="bg-[#F8F4E1] border-2 border-[#543310] rounded-lg p-4 w-full focus:outline-none focus:ring-2 focus:ring-[#543310] text-[#543310] placeholder:text-[#B4A791] shadow-md transition-all duration-200 ease-in-out"
              />
            </div>
          </div>

          {/* Date Picker */}
          <div className="space-y-2">
            <label className="text-lg font-semibold text-[#543310]">Promotion Duration</label>
            <DateRangePicker
              ranges={[{ startDate: journeyDate, endDate: returnDate, key: "selection" }]}
              onChange={({ selection }) => {
                setJourneyDate(selection.startDate);
                setReturnDate(selection.endDate);
              }}
              showDateDisplay={false}
              className="bg-[#F8F4E1] p-4 border-2 border-[#543310] rounded-lg shadow-md w-full focus:outline-none focus:ring-2 focus:ring-[#543310] justify-center"
            />
          </div>

          <button
            type="submit"
            className="mt-6 p-4 rounded-lg w-full bg-[#543310] border-2 border-[#543310] text-white font-semibold shadow-lg hover:bg-[#FFDBB5] hover:text-[#543310] transition-all duration-300 ease-in-out"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}
