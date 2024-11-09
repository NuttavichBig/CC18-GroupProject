import React, { useEffect, useState } from "react";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import useUserStore from "../../stores/user-store";
import { useShallow } from "zustand/shallow";
import SearchLocation from "../GoogleApi/SearchLocation";
import { useNavigate } from "react-router-dom";
import { motion, useAnimation } from "framer-motion";

const HomePageSearchBox = () => {
  const { input, setInput, setSelectedLocation } = useUserStore(
    useShallow((state) => ({
      input: state.filter,
      setInput: state.setFilter,
      setSelectedLocation: state.setSelectedLocation,
    }))
  );

  const [calenderControl, setCalenderControl] = useState({
    showJourneyCalendar: false,
    showReturnCalendar: false,
    minimumReturnDate: new Date(),
  });

  const navigate = useNavigate();
  const controls = useAnimation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 250) {
        controls.start({ backgroundColor: "rgba(255, 165, 0, 0.8)" });
      } else {
        controls.start({ backgroundColor: "rgba(0, 0, 0, 0.4)" });
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [controls]);

  useEffect(() => {
    let date = new Date(input.journeyDate);
    date.setDate(date.getDate() + 1);
    setCalenderControl({ ...calenderControl, minimumReturnDate: date });
  }, [calenderControl.showJourneyCalendar]);

  const handleSelectLocation = (selectedLocation) => {
    setSelectedLocation(selectedLocation);
  };

  const handleSearch = () => {
    navigate("/bookinghotel");
  };

  const [adults, setAdults] = useState(1);
  const [rooms, setRooms] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => setIsOpen(!isOpen);
  const increment = (setter, value) => setter(value + 1);
  const decrement = (setter, value) => setter(value > 1 ? value - 1 : 1);

  return (
    <motion.div
      className="bg-black bg-opacity-40 rounded-lg shadow-lg p-6 w-full max-w-[80%] mx-auto relative justify-end"
      animate={controls}
      initial={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }}
    >
      <style>{`.rdrDefinedRangesWrapper { display: none; }`}</style>
      <div className="grid grid-cols-5 gap-4 items-center w-full ml-7">
        <div className="col-span-1">
          <p className="block text-white mb-1 ">Destination</p>
          <SearchLocation onSelectLocation={handleSelectLocation} />
        </div>
        <div className="col-span-2 relative flex items-center ">
          <div className="flex-1">
            <span className="block  text-white text-center mb-1">JOURNEY</span>
            <div className="w-full p-3 rounded-l-lg border-r border-h border-white bg-gradient-to-t from-orange-400 to-orange-600 flex justify-between items-center shadow-md cursor-pointer h-10">
              <div
                onClick={() => {
                  setCalenderControl({
                    ...calenderControl,
                    showJourneyCalendar: !calenderControl.showJourneyCalendar,
                    showReturnCalendar: false,
                  });
                }}
                className="text-center flex-1 py-2 text-[#543310]"
              >
                <span className="text-white text-xl">
                  {new Date(input.journeyDate).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "2-digit",
                  })}
                </span>
              </div>
            </div>
          </div>
          <div className="flex-1">
            <span className="block text-white text-center mb-1">
              RETURN DATE
            </span>
            <div className="w-full p-3 rounded-r-lg bg-gradient-to-t from-orange-400 to-orange-600 flex justify-between items-center shadow-md cursor-pointer h-10">
              <div
                onClick={() => {
                  setCalenderControl({
                    ...calenderControl,
                    showReturnCalendar: !calenderControl.showReturnCalendar,
                    showJourneyCalendar: false,
                  });
                }}
                className="text-center flex-1 py-2 text-[#543310]"
              >
                <span className="text-white text-xl">
                  {new Date(input.returnDate).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "2-digit",
                  })}
                </span>
              </div>
            </div>
          </div>

          {calenderControl.showJourneyCalendar && (
            <div
              className="absolute z-10 mt-2 bg-white shadow-lg rounded-lg p-4"
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
                minDate={new Date()}
                onChange={(item) => {
                  if (input.returnDate <= item.selection.startDate) {
                    let nextDate = new Date(item.selection.startDate);
                    nextDate.setDate(nextDate.getDate() + 1);
                    setInput({
                      ...input,
                      journeyDate: item.selection.startDate,
                      returnDate: nextDate,
                    });
                  } else {
                    setInput({
                      ...input,
                      journeyDate: item.selection.startDate,
                    });
                  }
                  setCalenderControl({
                    ...calenderControl,
                    showJourneyCalendar: false,
                  });
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

          {calenderControl.showReturnCalendar && (
            <div
              className="absolute z-10 mt-2 bg-white shadow-lg rounded-lg p-4"
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
                minDate={calenderControl.minimumReturnDate}
                onChange={(item) => {
                  setInput({ ...input, returnDate: item.selection.startDate });
                  setCalenderControl({
                    ...calenderControl,
                    showReturnCalendar: false,
                  });
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
        </div>
        <div className="col-span-1 ml-5">
          <p className="block  text-white mb-1 ">Guest and Room</p>
          <div className="relative inline-block text-left">
            <button
              onClick={toggleDropdown}
              className="flex items-center bg-[#fef6e4] p-2 border rounded-md text-[#543310]  shadow w-full"
            >
              <span className="mr-2">
                {adults} GUEST, {rooms} ROOM
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            {isOpen && (
              <div className="absolute z-10 mt-2 w-56 bg-[#fef6e4] rounded-lg shadow-lg">
                <div className="p-4 space-y-4">
                  <div className="flex justify-between items-center text-[#543310] ">
                    <span>GUEST</span>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => decrement(setAdults, adults)}
                        className="p-1 bg-orange-200 rounded"
                      >
                        -
                      </button>
                      <span>{adults}</span>
                      <button
                        onClick={() => increment(setAdults, adults)}
                        className="p-1 bg-orange-300 rounded"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="flex justify-between items-center text-black">
                    <span>ROOM</span>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => decrement(setRooms, rooms)}
                        className="p-1 bg-orange-200 rounded"
                      >
                        -
                      </button>
                      <span>{rooms}</span>
                      <button
                        onClick={() => increment(setRooms, rooms)}
                        className="p-1 bg-orange-300 rounded"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                <div className="p-4 border-t flex justify-center">
                  <button
                    onClick={() => setIsOpen(false)}
                    className="bg-gradient-to-t from-orange-400 to-orange-600 text-white p-3 rounded-lg"
                  >
                    SUBMIT
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="col-span-1 flex justify-center mt-6">
          <button
            onClick={handleSearch}
            className=" shadow-lg bg-gradient-to-t from-orange-400 to-orange-600 text-white p-2 outline-none border-none transition-transform duration-150 rounded-full overflow-hidden hover:scale-110 w-28 h-10"
          >
            SEARCH
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default HomePageSearchBox;
