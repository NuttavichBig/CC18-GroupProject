import React, { useState } from 'react';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import searchbuttonanimation from "../../assets/GifMainButtonOrangeSearch1.gif"

const HomePageSearchBox = () => {
    const [journeyDate, setJourneyDate] = useState(new Date());
    const [returnDate, setReturnDate] = useState(new Date());
    const [showJourneyCalendar, setShowJourneyCalendar] = useState(false);
    const [showReturnCalendar, setShowReturnCalendar] = useState(false);

    return (
        <div className="bg-[#fef6e4] rounded-lg shadow-lg p-6 w-full max-w-4xl mx-auto mt-10 relative">
            <style>
                {`.rdrDefinedRangesWrapper { display: none; }`}
            </style>
            <div className="grid grid-cols-4 gap-4 items-center">
                <div className="col-span-1">
                    <label className="block text-sm text-gray-600 mb-1">Destination</label>
                    <input
                        type="text"
                        placeholder="Phuket BooPhu Mueang Thailand"
                        className="w-full p-3 rounded-lg border border-gray-300"
                    />
                </div>
                <div className="col-span-2 relative">
                    <div className="w-full p-3 rounded-lg bg-[#fddbb7] flex justify-between items-center shadow-md cursor-pointer">
                        <div
                            onClick={() => {
                                setShowJourneyCalendar(!showJourneyCalendar);
                                setShowReturnCalendar(false);
                            }}
                            className="text-center flex-1 py-2"
                        >
                            <span className="block font-semibold text-sm">JOURNEY</span>
                            <span>{journeyDate.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: '2-digit' })}</span>
                        </div>
                        <div className="border-l border-gray-400 self-stretch mx-2"></div>
                        <div
                            onClick={() => {
                                setShowReturnCalendar(!showReturnCalendar);
                                setShowJourneyCalendar(false);
                            }}
                            className="text-center flex-1 py-2"
                        >
                            <span className="block font-semibold text-sm">RETURN DATE</span>
                            <span>{returnDate.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: '2-digit' })}</span>
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
                <div className="col-span-1">
                    <label className="block text-sm text-gray-600 mb-1">Guests & Rooms</label>
                    <select className="w-full p-3 rounded-lg border border-gray-300">
                        <option>1 Guest, 1 Room</option>
                        <option>2 Guests, 1 Room</option>
                        <option>3 Guests, 1 Room</option>
                    </select>
                </div>
            </div>

            <div className="relative mt-8">
                <button className="absolute top-0 left-1/2 transform -translate-x-1/2 bg-transparent outline-none border-none transition-transform duration-200 rounded-full overflow-hidden hover:scale-105 w-32">
                    <img
                        src={searchbuttonanimation}
                        alt="Search Button Animation"
                        className="w-full h-full object-cover outline-none border-none"
                    />
                </button>
            </div>
        </div>
    );
};

export default HomePageSearchBox;
