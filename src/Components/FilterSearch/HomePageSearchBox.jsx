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
        controls.start({ backgroundColor: "rgba(255, 174, 0,25)" });
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
    console.log(adults)
    setInput({...input,guest : adults})
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
      className="bg-black bg-opacity-40 rounded-lg shadow-lg p-6 max-w-[83%] mx-auto top-12 relative "
      animate={controls}
      initial={{ backgroundColor: "rgba(0, 0, 0, 0.6)"}}
    >
      <style>{`.rdrDefinedRangesWrapper { display: none; }`}</style>
      <div className="gap-4 justify-around flex w-full px-8">
        <div className="w-1/5">
          <p className="block  text-white mb-1 font-bold">Destination</p>
          <SearchLocation onSelectLocation={handleSelectLocation} />
        </div>
        <div className="relative flex items-center w-2/5">
          <div className="flex-1">
            <span className="block font-bold text-sm text-white text-center mb-1">
              JOURNEY
            </span>
            <div className="w-full p-3 rounded-l-full border-r border-h border-white bg-gradient-to-t from-orange-400 to-orange-500 flex items-center shadow-md cursor-pointer h-10">
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
            <span className="block font-bold text-sm text-white text-center mb-1">
              RETURN DATE
            </span>
            <div className="w-full p-3 rounded-r-full bg-gradient-to-t from-orange-400 to-orange-500 flex justify-between items-center shadow-md cursor-pointer h-10">
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
              className="absolute z-10 mt-2 bg-white shadow-full rounded-lg p-4"
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
              className="absolute z-10 mt-2 bg-white shadow-full rounded-lg p-4"
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
        <div className="w-1/5 flex flex-col">
          <p className="block  text-white mb-1 font-bold">Guest and Room</p>
          <div className="relative inline-block text-left">
            <button
              onClick={toggleDropdown}
              className="flex items-center p-2 border rounded-full text-[#543310] px-4 bg-white shadow w-full"
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
              <div className="absolute z-10 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg">
                
                <div className="p-4 space-y-4">
                  <div className="flex justify-between items-center text-[#543310] ">
                    <span>GUEST</span>
                    <div className="flex items-center space-x-2">
                      <div className="h-6 text-xl font-bold rounded-full w-6 flex justify-center items-center bg-gray-200">
                      <button
                        onClick={() => decrement(setAdults, adults)}
                        className="relative -top-1"
                      >
                        -
                      </button>
                      </div>
                      <span>{adults}</span>
                      <div className="h-6 text-xl font-bold rounded-full w-6 flex justify-center items-center bg-gray-200">
                      <button
                        onClick={() => increment(setAdults, adults)}
                        className="relative -top-1"
                      >
                        +
                      </button>
                      </div>  
                    </div>
                  </div>

                  <div className="flex justify-between items-center text-black">
                    <span>ROOM</span>
                    <div className="flex items-center space-x-2">
                    <div className="h-6 text-xl font-bold rounded-full w-6 flex justify-center items-center bg-gray-200">
                      <button
                        onClick={() => decrement(setRooms, rooms)}
                        className="relative -top-1"
                      >
                        -
                      </button>
                      </div>
                      <span>{rooms}</span>
                      <div className="h-6 text-xl font-bold rounded-full w-6 flex justify-center items-center bg-gray-200">
                      <button
                        onClick={() => increment(setRooms, rooms)}
                        className="relative -top-1"
                      >
                        +
                      </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 border-t flex justify-center">
                  <button
                    onClick={() => setIsOpen(false)}
                    className="bg-gradient-to-t from-orange-400 to-orange-500 text-white px-4 py-1 rounded-lg"
                  >
                    SUBMIT
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className=" flex w-1/5 justify-center mt-6">
          <button
            onClick={handleSearch}
            className="font-bold w-full shadow-lg bg-gradient-to-t from-orange-400 to-orange-500 text-white p-2 outline-none border-none transition-transform duration-200 rounded-full overflow-hidden hover:scale-105 h-12"
          >
            SEARCH
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default HomePageSearchBox;
