import React, { useEffect, useState } from "react";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import SearchLocation from "../GoogleApi/SearchLocation";
import useUserStore from "../../stores/user-store";
import { useShallow } from "zustand/shallow";

const SearchBoxMain = (props) => {
  const { handleSearch } = props;
  // const [journeyDate, setJourneyDate] = useState(new Date());
  // const [returnDate, setReturnDate] = useState(new Date());
  // const [showJourneyCalendar, setShowJourneyCalendar] = useState(false);
  // const [showReturnCalendar, setShowReturnCalendar] = useState(false);
  const [calenderControl, setCalenderControl] = useState({
    showJourneyCalendar: false,
    showReturnCalendar: false,
    minimumReturnDate: new Date(),
  });
  const { input, setInput, setSelectedLocation } = useUserStore(
    useShallow((state) => ({
      input: state.filter,
      setInput: state.setFilter,
      setSelectedLocation: state.setSelectedLocation,
    }))
  );
  useEffect(() => {
    let date = new Date(input.journeyDate);
    date.setDate(date.getDate() + 1);
    setCalenderControl({ ...calenderControl, minimumReturnDate: date });
  }, [calenderControl.showJourneyCalendar]);

  const handleSelectLocation = (selectedLocation) => {
    setSelectedLocation(selectedLocation);
  };

  const [adults, setAdults] = useState(1);
  const [rooms, setRooms] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => setIsOpen(!isOpen);
  const increment = (setter, value) => setter(value + 1);
  const decrement = (setter, value) => setter(value > 1 ? value - 1 : 1);

  return (
    <div className="bg-[#fef6e4] rounded-lg shadow-lg px-6 py-4 w-full mx-auto mt-10 mb-5 relative">
      <style>{`.rdrDefinedRangesWrapper { display: none; }`}</style>
      <div className="flex items-center gap-4">
        <div className="flex-1 flex items-center gap-2 bg-[#fddbb7] rounded-full px-4 h-12 shadow-md ">
          <span className="">Destination</span>
          <SearchLocation onSelectLocation={handleSelectLocation} />
        </div>

        <div className="flex-1 relative">
          <div className="w-full h-12 px-4 rounded-full bg-[#fddbb7] flex items-center justify-between shadow-md cursor-pointer ">
            <div
              onClick={() => {
                setCalenderControl({
                  ...calenderControl,
                  showJourneyCalendar: !calenderControl.showJourneyCalendar,
                  showReturnCalendar: false,
                });
              }}
              className="flex-1 text-center flex flex-col items-center"
            >
              <span className="block font-semibold text-xs">JOURNEY</span>
              <span className="text-sm">
                {new Date(input.journeyDate).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "2-digit",
                })}
              </span>
            </div>
            <div className="border-l border-orange-300 self-stretch mx-2"></div>
            <div
              onClick={() => {
                setCalenderControl({
                  ...calenderControl,
                  showReturnCalendar: !calenderControl.showReturnCalendar,
                  showJourneyCalendar: false,
                });
              }}
              className="flex-1 text-center flex flex-col items-center"
            >
              <span className="block font-semibold text-xs">RETURN DATE</span>
              <span className="text-sm">
                {new Date(input.returnDate).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "2-digit",
                })}
              </span>
            </div>
          </div>

          {calenderControl.showJourneyCalendar && (
            <div
              className="absolute z-10 mt-2 bg-[#fef6e4] shadow-lg rounded-lg p-4"
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
                minDate={new Date()}
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
              className="absolute z-10 mt-2 bg-[#fef6e4] shadow-lg rounded-lg p-4"
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
                  setCalenderControl({
                    ...calenderControl,
                    showReturnCalendar: false,
                  });
                }}
                minDate={calenderControl.minimumReturnDate}
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

        <div className="flex-1 flex items-center gap-2 bg-[#fddbb7] rounded-full px-4 h-12 shadow-md">
          <span className="">Guests & Rooms</span>
          <div className="col-span-1 ml-5">
            <div className="relative inline-block text-left">
              <button
                onClick={toggleDropdown}
                className="flex items-center p-2 rounded-md text-[#543310] bg-[#fddbb7] w-full"
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
                          className="p-1 bg-orange-100 rounded"
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

                    <div className="flex justify-between items-center text-[#543310]">
                      <span>ROOM</span>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => decrement(setRooms, rooms)}
                          className="p-1 bg-orange-100 rounded"
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
        </div>

        <button
          className="shadow-lg bg-gradient-to-t from-orange-400 to-orange-600 text-white p-2 outline-none border-none transition-transform duration-150 rounded-full overflow-hidden hover:scale-110 w-28 h-10"
          onClick={handleSearch}
        >
          SEARCH
        </button>
      </div>
    </div>
  );
};

export default SearchBoxMain;
