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
    <div className="bg-cream-gradient rounded-2xl shadow-xl px-8 py-5 w-full mx-auto mt-10 mb-5 relative">
      <style>{`.rdrDefinedRangesWrapper { display: none; }`}</style>
      <div className="flex items-center gap-4">
        <div className="flex-1 flex items-center justify-center gap-2 bg-orange-light-gradient rounded-full px-4 h-12 shadow-lg border border-orange-light">
          <span className="font-bold text-[#543310] px-2">Destination :</span>
          <div className="flex-1">
            <SearchLocation onSelectLocation={handleSelectLocation} />
          </div>
        </div>
        <div className="flex-1 relative ">
          <div className="w-full h-12 px-4 rounded-full bg-orange-light-gradient flex items-center justify-between shadow-lg cursor-pointer border border-orange-light">
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
              <span className="block font-bold text-xs text-[#543310]">
                JOURNEY
              </span>
              <span className="text-sm text-[#543310] ">
                {new Date(input.journeyDate).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "2-digit",
                })}
              </span>
            </div>
            <div className="border-l border-orange-light self-stretch mx-2"></div>
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
              <span className="block font-bold text-xs text-[#543310]">
                RETURN DATE
              </span>
              <span className="text-sm text-[#543310] ">
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

        <div className="flex-1 flex items-center gap-2 bg-orange-light-gradient rounded-full px-4 h-12 shadow-lg border border-orange-light">
          <span className="font-bold text-[#543310] px-2">
            Guests & Rooms :{" "}
          </span>
          <div className="relative inline-block text-left flex-1">
            <button
              onClick={toggleDropdown}
              className="flex items-center py-1 px-3 border rounded-full text-[#543310] bg-white shadow w-full"
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
                      <button
                        onClick={() => decrement(setAdults, adults)}
                        className="p-1 bg-gray-200 rounded"
                      >
                        -
                      </button>
                      <span>{adults}</span>
                      <button
                        onClick={() => increment(setAdults, adults)}
                        className="p-1 bg-gray-200 rounded"
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
                        className="p-1 bg-gray-200 rounded"
                      >
                        -
                      </button>
                      <span>{rooms}</span>
                      <button
                        onClick={() => increment(setRooms, rooms)}
                        className="p-1 bg-gray-200 rounded"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                <div className="p-4 border-t flex justify-center">
                  <button
                    onClick={() => setIsOpen(false)}
                    className="bg-gradient-to-r from-[#f08a4b] to-[#e05b3c] text-white py-3 px-5 rounded-lg  shadow-lg transition-transform duration-200 cursor-pointer hover:scale-105 hover:shadow-[inset_0_0_8px_rgba(240,138,75,0.4),0_4px_15px_rgba(240,138,75,0.6),0_4px_15px_rgba(224,91,60,0.4)]"
                  >
                    SUBMIT
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <button
          className="bg-gradient-to-r from-[#f08a4b] to-[#e05b3c] text-white py-3 px-5 rounded-full font-bold shadow-lg transition-transform duration-200 cursor-pointer hover:scale-105 hover:shadow-[inset_0_0_8px_rgba(240,138,75,0.4),0_4px_15px_rgba(240,138,75,0.6),0_4px_15px_rgba(224,91,60,0.4)]"
          onClick={handleSearch}
        >
          SEARCH
        </button>
      </div>
    </div>
  );
};

export default SearchBoxMain;

// import React, { useEffect, useState } from 'react';
// import { DateRangePicker } from 'react-date-range';
// import 'react-date-range/dist/styles.css';
// import 'react-date-range/dist/theme/default.css';
// import SearchLocation from '../GoogleApi/SearchLocation';
// import useUserStore from '../../stores/user-store';
// import { useShallow } from 'zustand/shallow';

// const SearchBoxMain = (props) => {
//     const { handleSearch } = props
//     // const [journeyDate, setJourneyDate] = useState(new Date());
//     // const [returnDate, setReturnDate] = useState(new Date());
//     // const [showJourneyCalendar, setShowJourneyCalendar] = useState(false);
//     // const [showReturnCalendar, setShowReturnCalendar] = useState(false);
//     const [calenderControl, setCalenderControl] = useState({
//         showJourneyCalendar: false,
//         showReturnCalendar: false,
//         minimumReturnDate: new Date()
//     })
//     const { input, setInput, setSelectedLocation } = useUserStore(
//         useShallow((state) => ({
//             input: state.filter,
//             setInput: state.setFilter,
//             setSelectedLocation: state.setSelectedLocation
//         }))
//     );
//     useEffect(() => {
//         let date = new Date(input.journeyDate)
//         date.setDate(date.getDate() + 1)
//         setCalenderControl({ ...calenderControl, minimumReturnDate: date })
//     }, [calenderControl.showJourneyCalendar])

//     const handleSelectLocation = (selectedLocation) => {
//         setSelectedLocation(selectedLocation);
//     };

//     return (
//         <div className="bg-[#fef6e4] rounded-lg shadow-lg px-6 py-4 w-full mx-auto mt-10 mb-5 relative">
//             <style>
//                 {.rdrDefinedRangesWrapper {display: none; }}
//             </style>
//             <div className="flex items-center gap-4">

//                 <div className="flex-1 flex items-center gap-2 bg-[#fddbb7] rounded-full px-4 h-12 shadow-md border border-gray-300">
//                     <span className="text-xs text-gray-600">Destination</span>
//                     <SearchLocation onSelectLocation={handleSelectLocation} />
//                 </div>

//                 <div className="flex-1 relative">
//                     <div className="w-full h-12 px-4 rounded-full bg-[#fddbb7] flex items-center justify-between shadow-md cursor-pointer border border-gray-300">
//                         <div
//                             onClick={() => {
//                                 setCalenderControl({
//                                     ...calenderControl,
//                                     showJourneyCalendar: !calenderControl.showJourneyCalendar
//                                     , showReturnCalendar: false
//                                 })
//                             }}
//                             className="flex-1 text-center flex flex-col items-center"
//                         >
//                             <span className="block font-semibold text-xs">JOURNEY</span>
//                             <span className="text-sm">{(new Date(input.journeyDate)).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: '2-digit' })}</span>
//                         </div>
//                         <div className="border-l border-gray-400 self-stretch mx-2"></div>
//                         <div
//                             onClick={() => {
//                                 setCalenderControl({
//                                     ...calenderControl
//                                     , showReturnCalendar: !calenderControl.showReturnCalendar
//                                     , showJourneyCalendar: false
//                                 })
//                             }}
//                             className="flex-1 text-center flex flex-col items-center"
//                         >
//                             <span className="block font-semibold text-xs">RETURN DATE</span>
//                             <span className="text-sm">{(new Date(input.returnDate)).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: '2-digit' })}</span>
//                         </div>
//                     </div>

//                     {calenderControl.showJourneyCalendar && (
//                         <div className="absolute z-10 mt-2 bg-white shadow-lg rounded-lg p-4" style={{ left: 0 }}>
//                             <DateRangePicker
//                                 ranges={[{ startDate: input.journeyDate, endDate: input.journeyDate, key: 'selection' }]}
//                                 onChange={(item) => {
//                                     if (input.returnDate <= item.selection.startDate) {
//                                         let nextDate = new Date(item.selection.startDate)
//                                         nextDate.setDate(nextDate.getDate() + 1)
//                                         setInput({ ...input, journeyDate: item.selection.startDate, returnDate: nextDate });
//                                     } else {
//                                         setInput({ ...input, journeyDate: item.selection.startDate });
//                                     }
//                                     setCalenderControl({ ...calenderControl, showJourneyCalendar: false });
//                                 }}
//                                 minDate={new Date()}
//                                 showDateDisplay={false}
//                                 staticRanges={[]}
//                                 inputRanges={[]}
//                                 months={1}
//                                 direction="horizontal"
//                                 className="rounded-lg"
//                             />
//                         </div>
//                     )}

//                     {calenderControl.showReturnCalendar && (
//                         <div className="absolute z-10 mt-2 bg-white shadow-lg rounded-lg p-4" style={{ right: 0 }}>
//                             <DateRangePicker
//                                 ranges={[{ startDate: input.returnDate, endDate: input.returnDate, key: 'selection' }]}
//                                 onChange={(item) => {
//                                     setInput({ ...input, returnDate: item.selection.startDate });
//                                     setCalenderControl({ ...calenderControl, showReturnCalendar: false })
//                                 }}
//                                 minDate={calenderControl.minimumReturnDate}
//                                 showDateDisplay={false}
//                                 staticRanges={[]}
//                                 inputRanges={[]}
//                                 months={1}
//                                 direction="horizontal"
//                                 className="rounded-lg"
//                             />
//                         </div>
//                     )}
//                 </div>

//                 <div className="flex-1 flex items-center gap-2 bg-[#fddbb7] rounded-full px-4 h-12 shadow-md border border-gray-300">
//                     <span className="text-xs text-gray-600">Guests & Rooms</span>
//                     <select className="flex-1 text-sm bg-transparent focus:outline-none">
//                         <option>1 Guest, 1 Room</option>
//                         <option>2 Guests, 1 Room</option>
//                         <option>3 Guests, 1 Room</option>
//                     </select>
//                 </div>

//                 <button className="flex-shrink-0 h-12 w-28 bg-gradient-to-r from-orange-400 to-orange-500 text-white font-semibold rounded-full shadow-md transition-transform duration-200 hover:scale-105"
//                     onClick={handleSearch}>
//                     Search
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default SearchBoxMain
