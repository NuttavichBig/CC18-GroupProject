import React, { useEffect, useState } from 'react';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import searchbuttonanimation from "../../assets/GifMainButtonOrangeSearch1.gif"
import useUserStore from '../../stores/user-store';
import { useShallow } from 'zustand/shallow';
import SearchLocation from '../GoogleApi/SearchLocation';
import { useNavigate } from 'react-router-dom';


const HomePageSearchBox = () => {
    const {input,setInput,setSelectedLocation} = useUserStore(useShallow(state=>({
        input : state.filter,
        setInput : state.setFilter,
        setSelectedLocation : state.setSelectedLocation
    })))
    const [calenderControl, setCalenderControl] = useState({
        showJourneyCalendar: false,
        showReturnCalendar: false,
        minimumReturnDate: new Date()
    })

    const navigate = useNavigate()

    useEffect(() => {
        let date = new Date(input.journeyDate)
        date.setDate(date.getDate() + 1)
        setCalenderControl({ ...calenderControl, minimumReturnDate: date })
    }, [calenderControl.showJourneyCalendar])

    const handleSelectLocation = (selectedLocation) =>{
        setSelectedLocation(selectedLocation);
    }

    const handleSearch = () => {
        navigate('/bookinghotel')
    }


    return (
        <div className="bg-[#fef6e4] rounded-lg shadow-lg p-6 w-full max-w-4xl mx-auto mt-10 relative">
            <style>
                {`.rdrDefinedRangesWrapper { display: none; }`}
            </style>
            <div className="grid grid-cols-4 gap-4 items-center">
                <div className="col-span-1">
                    <label className="block text-sm text-gray-600 mb-1">Destination</label>
                    <SearchLocation onSelectLocation={handleSelectLocation}/>
                </div>
                <div className="col-span-2 relative">
                    <div className="w-full p-3 rounded-lg bg-[#fddbb7] flex justify-between items-center shadow-md cursor-pointer">
                        <div
                            onClick={() => {
                                setCalenderControl({
                                    ...calenderControl,
                                    showJourneyCalendar: !calenderControl.showJourneyCalendar
                                    , showReturnCalendar: false
                                })
                            }}
                            className="text-center flex-1 py-2"
                        >
                            <span className="block font-semibold text-sm">JOURNEY</span>
                            <span>{input.journeyDate?.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: '2-digit' })}</span>
                        </div>
                        <div className="border-l border-gray-400 self-stretch mx-2"></div>
                        <div
                            onClick={() => {
                                setCalenderControl({
                                    ...calenderControl
                                    , showReturnCalendar: !calenderControl.showReturnCalendar
                                    , showJourneyCalendar: false
                                })
                            }}
                            className="text-center flex-1 py-2"
                        >
                            <span className="block font-semibold text-sm">RETURN DATE</span>
                            <span>{input.returnDate?.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: '2-digit' })}</span>
                        </div>
                    </div>

                    {calenderControl.showJourneyCalendar && (
                        <div className="absolute z-10 mt-2 bg-white shadow-lg rounded-lg p-4" style={{ left: 0 }}>
                            <DateRangePicker
                                ranges={[{ startDate: input.journeyDate, endDate: input.journeyDate, key: 'selection' }]}
                                minDate={new Date()}
                                onChange={(item) => {
                                    if(input.returnDate <= item.selection.startDate){
                                        let nextDate = new Date(item.selection.startDate)
                                        nextDate.setDate(nextDate.getDate()+1)
                                        setInput({ ...input, journeyDate: item.selection.startDate,returnDate : nextDate });
                                    }else{
                                        setInput({ ...input, journeyDate: item.selection.startDate});
                                    }
                                    setCalenderControl({ ...calenderControl, showJourneyCalendar: false });
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
                        <div className="absolute z-10 mt-2 bg-white shadow-lg rounded-lg p-4" style={{ right: 0 }}>
                            <DateRangePicker
                                ranges={[{ startDate: input.returnDate, endDate: input.returnDate, key: 'selection' }]}
                                minDate={calenderControl.minimumReturnDate}
                                onChange={(item) => {
                                    setInput({ ...input, returnDate: item.selection.startDate });
                                    setCalenderControl({ ...calenderControl, showReturnCalendar: false })
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
                    <select className="w-full p-3 rounded-lg border border-gray-300" name='guest'>
                        <option value={1}>1 Guest, 1 Room</option>
                        <option value={2}>2 Guests, 1 Room</option>
                        <option value={3}>3 Guests, 1 Room</option>
                    </select>
                </div>
            </div>

            <div className="relative mt-8">
                <button 
                onClick={handleSearch}
                className="absolute top-0 left-1/2 transform -translate-x-1/2 bg-transparent outline-none border-none transition-transform duration-200 rounded-full overflow-hidden hover:scale-105 w-32">
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
