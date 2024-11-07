import React, { useState } from "react";
import { DateRangePicker } from "react-date-range";

export default function EditPromotion({ setEditPromotion }) {
  const [journeyDate, setJourneyDate] = useState(new Date());
  const [returnDate, setReturnDate] = useState(new Date());
  const [showJourneyCalendar, setShowJourneyCalendar] = useState(false);
  const [showReturnCalendar, setShowReturnCalendar] = useState(false);

  return (
    <div
      onClick={() => setEditPromotion(false)}
      className="flex items-center justify-center fixed inset-0 bg-[#F2F7A140] z-50"
    >
      <div
        className="bg-[#F8F4E1] rounded-xl shadow-xl p-8 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setEditPromotion(false)}
          className="absolute top-4 right-4 text-3xl font-semibold text-[#543310] bg-transparent border-none cursor-pointer"
        >
          &times;
        </button>

        <div className="text-center mb-8">
          <p className="text-3xl font-bold text-[#543310]">Edit Promotion</p>
        </div>

        <form className="flex flex-col gap-6">
          {/* Text Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Promotion Campaign"
              className="bg-[#F8F4E1] border-2 border-[#543310] rounded-lg p-3 w-64 focus:outline-none focus:ring-2 focus:ring-[#F8F4E1] text-center"
            />
            <input
              type="text"
              placeholder="Promotion Description"
              className="bg-[#F8F4E1] border-2 border-[#543310] rounded-lg p-3 w-64 focus:outline-none focus:ring-2 focus:ring-[#F8F4E1] text-center"
            />
            <input
              type="text"
              placeholder="Discount Percentage"
              className="bg-[#F8F4E1] border-2 border-[#543310] rounded-lg p-3 w-64 focus:outline-none focus:ring-2 focus:ring-[#F8F4E1] text-center"
            />
            <input
              type="text"
              placeholder="Discount Value"
              className="bg-[#F8F4E1] border-2 border-[#543310] rounded-lg p-3 w-64 focus:outline-none focus:ring-2 focus:ring-[#F8F4E1] text-center"
            />
            <input
              type="text"
              placeholder="Minimum Spend"
              className="bg-[#F8F4E1] border-2 border-[#543310] rounded-lg p-3 w-64 focus:outline-none focus:ring-2 focus:ring-[#F8F4E1] text-center"
            />
            <input
              type="text"
              placeholder="Maximum Discount"
              className="bg-[#F8F4E1] border-2 border-[#543310] rounded-lg p-3 w-64 focus:outline-none focus:ring-2 focus:ring-[#F8F4E1] text-center"
            />
            <input
              type="text"
              placeholder="Usage Limit"
              className="bg-[#F8F4E1] border-2 border-[#543310] rounded-lg p-3 w-64 focus:outline-none focus:ring-2 focus:ring-[#F8F4E1] text-center"
            />
            <input
              type="text"
              placeholder="User Limit"
              className="bg-[#F8F4E1] border-2 border-[#543310] rounded-lg p-3 w-64 focus:outline-none focus:ring-2 focus:ring-[#F8F4E1] text-center"
            />
          </div>
          <div className="relative flex items-center gap-6">
            <div
              className="w-full p-4 rounded-lg border-2 border-[#543310] bg-[#F8F4E1] shadow-md cursor-pointer flex justify-between items-center transition-all duration-200 ease-in-out hover:shadow-lg hover:bg-[#FFDBB5]"
              onClick={() => {
                setShowJourneyCalendar(!showJourneyCalendar);
                setShowReturnCalendar(false);
              }}
            >
              <div className="flex flex-col items-center text-sm">
                <span className="font-semibold text-[#543310]">
                  Start Campaign
                </span>
                <span className="text-[#543310]">
                  {journeyDate.toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "2-digit",
                  })}
                </span>
              </div>
            </div>

            <div
              className="w-full p-4 rounded-lg border-2 border-[#543310] bg-[#F8F4E1] shadow-md cursor-pointer flex justify-between items-center transition-all duration-200 ease-in-out hover:shadow-lg hover:bg-[#FFDBB5]"
              onClick={() => {
                setShowReturnCalendar(!showReturnCalendar);
                setShowJourneyCalendar(false);
              }}
            >
              <div className="flex flex-col items-center text-sm">
                <span className="font-semibold text-[#543310]">
                  End Campaign
                </span>
                <span className="text-[#543310]">
                  {returnDate.toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "2-digit",
                  })}
                </span>
              </div>
            </div>
          </div>

          {showJourneyCalendar && (
            <div className="absolute z-10 mt-2 bg-white shadow-lg rounded-lg p-4 w-72 left-0">
              <DateRangePicker
                ranges={[
                  {
                    startDate: journeyDate,
                    endDate: journeyDate,
                    key: "selection",
                  },
                ]}
                onChange={(item) => {
                  setJourneyDate(item.selection.startDate);
                  setShowJourneyCalendar(false);
                }}
                showDateDisplay={false}
                staticRanges={[]}
                inputRanges={[]}
                months={1}
                direction="horizontal"
                className="rounded-lg"
              />
            </div>
          )}

          {showReturnCalendar && (
            <div className="absolute z-10 mt-2 bg-white shadow-lg rounded-lg p-4 w-72 right-0">
              <DateRangePicker
                ranges={[
                  {
                    startDate: returnDate,
                    endDate: returnDate,
                    key: "selection",
                  },
                ]}
                onChange={(item) => {
                  setReturnDate(item.selection.startDate);
                  setShowReturnCalendar(false);
                }}
                showDateDisplay={false}
                staticRanges={[]}
                inputRanges={[]}
                months={1}
                direction="horizontal"
                className="rounded-lg"
              />
            </div>
          )}
          <button className="mt-4 p-3 rounded-lg bg-[#543310] border-2 border-[#543310] text-white font-semibold shadow-lg hover:bg-[#FFDBB5] hover:text-[#543310] transition-all duration-300 ease-in-out">
            Edit Campaign
          </button>
        </form>
      </div>
    </div>
  );
}
