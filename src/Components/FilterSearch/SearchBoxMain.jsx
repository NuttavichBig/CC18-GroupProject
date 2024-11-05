import React, { useState } from 'react';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import searchbuttonanimation from "../../assets/GifMainButtonOrangeSearch1.gif";
import SearchLocation from '../GoogleApi/SearchLocation';
import useUserStore from '../../stores/user-store';
import { useShallow } from 'zustand/shallow';

const SearchBoxMain = () => {
    const [journeyDate, setJourneyDate] = useState(new Date());
    const [returnDate, setReturnDate] = useState(new Date());
    const [showJourneyCalendar, setShowJourneyCalendar] = useState(false);
    const [showReturnCalendar, setShowReturnCalendar] = useState(false);
    const { input, setInput, setSelectedLocation } = useUserStore(
        useShallow((state) => ({
            input: state.filter,
            setInput: state.setFilter,
            setSelectedLocation: state.setSelectedLocation
        }))
    );

    const handleSelectLocation = (selectedLocation) => {
        setSelectedLocation(selectedLocation);
    };


    return (
        <div className="bg-[#fef6e4] rounded-lg shadow-lg px-6 py-4 w-full mx-auto mt-10 mb-5 relative">
            <style>
                {`.rdrDefinedRangesWrapper { display: none; }`}
            </style>
            <div className="flex items-center gap-4">

                <div className="flex-1 flex items-center gap-2 bg-[#fddbb7] rounded-full px-4 h-12 shadow-md border border-gray-300">
                    <span className="text-xs text-gray-600">Destination</span>
                    <SearchLocation onSelectLocation={handleSelectLocation}/>
                </div>

                <div className="flex-1 relative">
                    <div className="w-full h-12 px-4 rounded-full bg-[#fddbb7] flex items-center justify-between shadow-md cursor-pointer border border-gray-300">
                        <div
                            onClick={() => {
                                setShowJourneyCalendar(!showJourneyCalendar);
                                setShowReturnCalendar(false);
                            }}
                            className="flex-1 text-center flex flex-col items-center"
                        >
                            <span className="block font-semibold text-xs">JOURNEY</span>
                            <span className="text-sm">{journeyDate.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: '2-digit' })}</span>
                        </div>
                        <div className="border-l border-gray-400 self-stretch mx-2"></div>
                        <div
                            onClick={() => {
                                setShowReturnCalendar(!showReturnCalendar);
                                setShowJourneyCalendar(false);
                            }}
                            className="flex-1 text-center flex flex-col items-center"
                        >
                            <span className="block font-semibold text-xs">RETURN DATE</span>
                            <span className="text-sm">{returnDate.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: '2-digit' })}</span>
                        </div>
                    </div>


                    {showJourneyCalendar && (
                        <div className="absolute z-10 mt-2 bg-white shadow-lg rounded-lg p-4" style={{ left: 0 }}>
                            <DateRangePicker
                                ranges={[{ startDate: journeyDate, endDate: journeyDate, key: 'selection' }]}
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
                        <div className="absolute z-10 mt-2 bg-white shadow-lg rounded-lg p-4" style={{ right: 0 }}>
                            <DateRangePicker
                                ranges={[{ startDate: returnDate, endDate: returnDate, key: 'selection' }]}
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
                </div>

                <div className="flex-1 flex items-center gap-2 bg-[#fddbb7] rounded-full px-4 h-12 shadow-md border border-gray-300">
                    <span className="text-xs text-gray-600">Guests & Rooms</span>
                    <select className="flex-1 text-sm bg-transparent focus:outline-none">
                        <option>1 Guest, 1 Room</option>
                        <option>2 Guests, 1 Room</option>
                        <option>3 Guests, 1 Room</option>
                    </select>
                </div>


                <button className="flex-shrink-0 h-12 w-28 bg-gradient-to-r from-orange-400 to-orange-500 text-white font-semibold rounded-full shadow-md transition-transform duration-200 hover:scale-105">
                    Search
                </button>
            </div>
        </div>
    );
};

export default SearchBoxMain;
