import React, { useEffect, useReducer, useState } from "react";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import SearchLocation from "../GoogleApi/SearchLocation";
import useUserStore from "../../stores/user-store";
import { useShallow } from "zustand/shallow";

// Reducer to handle calendar control state
const calendarReducer = (state, action) => {
  switch (action.type) {
    case "TOGGLE_JOURNEY":
      return {
        ...state,
        showJourneyCalendar: !state.showJourneyCalendar,
        showReturnCalendar: false,
      };
    case "TOGGLE_RETURN":
      return {
        ...state,
        showReturnCalendar: !state.showReturnCalendar,
        showJourneyCalendar: false,
      };
    case "SET_MIN_RETURN_DATE":
      return { ...state, minimumReturnDate: action.payload };
    default:
      return state;
  }
};

const SearchBoxMain = ({ handleSearch }) => {
  const { input, setInput, setSelectedLocation } = useUserStore(
    useShallow((state) => ({
      input: state.filter,
      setInput: state.setFilter,
      setSelectedLocation: state.setSelectedLocation,
    }))
  );

  const [calendarState, dispatch] = useReducer(calendarReducer, {
    showJourneyCalendar: false,
    showReturnCalendar: false,
    minimumReturnDate: new Date(),
  });

  useEffect(() => {
    const date = new Date(input.journeyDate);
    date.setDate(date.getDate() + 1);
    dispatch({ type: "SET_MIN_RETURN_DATE", payload: date });
  }, [input.journeyDate]);

  const handleSelectLocation = (selectedLocation) => {
    setSelectedLocation(selectedLocation);
  };

  return (
    <div className="bg-[#fef6e4] rounded-lg shadow-lg px-6 py-4 w-full mx-auto mt-10 mb-5 relative">
      <style>{`.rdrDefinedRangesWrapper { display: none; }`}</style>
      <div className="flex items-center gap-4">
        {/* Destination Search */}
        <div className="flex-1 flex items-center gap-2 bg-[#fddbb7] rounded-full px-4 h-12 shadow-md">
          <span className="text-xs font-semibold text-warm-brown">
            Destination
          </span>
          <SearchLocation onSelectLocation={handleSelectLocation} />
        </div>

        {/* Date Selection */}
        <div className="flex-1 relative">
          <div className="w-full h-12 px-4 rounded-full bg-orange-light-gradient flex items-center justify-between shadow-lg cursor-pointer">
            {/* Journey Date */}
            <div
              onClick={() => dispatch({ type: "TOGGLE_JOURNEY" })}
              className="flex-1 text-center"
            >
              <span className="text-xs font-bold">JOURNEY</span>
              <span className="text-sm font-semibold">
                {new Date(input.journeyDate).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "2-digit",
                })}
              </span>
            </div>

            <div className="border-l mx-2"></div>

            {/* Return Date */}
            <div
              onClick={() => dispatch({ type: "TOGGLE_RETURN" })}
              className="flex-1 text-center"
            >
              <span className="text-xs font-bold">RETURN DATE</span>
              <span className="text-sm font-semibold">
                {new Date(input.returnDate).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "2-digit",
                })}
              </span>
            </div>
          </div>

          {calendarState.showJourneyCalendar && (
            <div
              className="absolute z-10 mt-2 bg-white shadow-lg rounded-lg p-4 transition-all"
              style={{ left: 0 }}
            >
              <DateRangePicker
                ranges={[
                  {
                    startDate: input.journeyDate,
                    endDate: input.journeyDate,
                    key: "selection",
                  },
                ]}
                onChange={(item) => {
                  const startDate = item.selection.startDate;
                  const nextDate = new Date(startDate);
                  nextDate.setDate(nextDate.getDate() + 1);
                  setInput({
                    ...input,
                    journeyDate: startDate,
                    returnDate:
                      input.returnDate <= startDate
                        ? nextDate
                        : input.returnDate,
                  });
                  dispatch({ type: "TOGGLE_JOURNEY" });
                }}
                minDate={new Date()}
                months={1}
                direction="horizontal"
              />
            </div>
          )}

          {calendarState.showReturnCalendar && (
            <div
              className="absolute z-10 mt-2 bg-white shadow-lg rounded-lg p-4 transition-all"
              style={{ right: 0 }}
            >
              <DateRangePicker
                ranges={[
                  {
                    startDate: input.returnDate,
                    endDate: input.returnDate,
                    key: "selection",
                  },
                ]}
                onChange={(item) => {
                  setInput({ ...input, returnDate: item.selection.startDate });
                  dispatch({ type: "TOGGLE_RETURN" });
                }}
                minDate={calendarState.minimumReturnDate}
                months={1}
                direction="horizontal"
              />
            </div>
          )}
        </div>

        {/* Guests & Rooms Selection */}
        <div className="flex-1 flex items-center gap-2 bg-orange-light-gradient rounded-full px-4 h-12 shadow-lg">
          <span className="text-xs font-bold">Guests & Rooms</span>
          <select className="flex-1 border-2 rounded-lg bg-transparent text-sm font-semibold">
            <option>1 Guest, 1 Room</option>
            <option>2 Guests, 1 Room</option>
            <option>3 Guests, 1 Room</option>
          </select>
        </div>

        {/* Search Button */}
        <button
          className="bg-gradient-to-r from-[#f08a4b] to-[#e05b3c] text-white py-3 px-5 rounded-full font-bold shadow-lg transition-transform duration-200 cursor-pointer hover:scale-105"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBoxMain;
