import React, { useEffect, useState } from 'react';
import useBookingStore from '../../stores/booking-store';
import { FaRegCheckCircle } from "react-icons/fa";


function PaymentResult() {
    const resBookingData = useBookingStore(state=>state.resBookingData)
    const [date , setDate]= useState({
        checkInDate : '',
        checkOutDate : ''
    })

    useEffect(()=>{
        const checkInDate = new Date(resBookingData.booking.checkinDate)
        const checkOutDate = new Date(resBookingData.booking.checkoutDate)
        const checkInDateString = `${checkInDate.getFullYear()}-${checkInDate.getMonth().toString().padStart(2, '0')}-${checkInDate.getDate().toString().padStart(2, '0')}`
        const checkOutDateString = `${checkOutDate.getFullYear()}-${checkOutDate.getMonth().toString().padStart(2, '0')}-${checkOutDate.getDate().toString().padStart(2, '0')}`
        setDate(prv=>({...prv,checkInDate : checkInDateString , checkOutDate : checkOutDateString}))
    },[])
    
    return (
        <div className="max-w-4xl mx-auto p-8 text-[#543310] bg-cream-gradient rounded-lg shadow-md space-y-8">

            <div className="flex justify-between items-center text-[#543310]">
                <p className="text-lg font-medium">Book Number</p>
                <p className="text-lg font-medium">{resBookingData.booking.UUID}</p>
            </div>


            <div className="flex items-center justify-between">
                <div className="w-[250px] text-center p-4 border rounded-lg bg-white border-orange-400">
                    <p className="text-orange-500 font-medium ">Check-In</p>
                    <p>{date.checkInDate}</p>
                    <p>From 14:00</p>
                </div>

                <div className="text-orange-500 font-medium text-center flex flex-col items-center">
                    <p>6 nights</p>
                    <div className="flex items-center space-x-0">
                        <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                        <div className="w-64 h-0.5 bg-orange-500"></div>
                        <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    </div>
                </div>

                <div className="w-[250px] text-center p-4 border rounded-lg bg-white border-orange-400">
                    <p className="text-orange-500 font-medium">Check-Out</p>
                    <p>{date.checkOutDate }</p>
                    <p>Before 12:00</p>
                </div>
            </div>


            <div className="grid grid-cols-2 gap-8 mt-4">
                {resBookingData.booking.bookingRooms.map((room, index) => (
                    <div key={index} className="flex space-x-4 items-start">
                        <img src={room.rooms?.images[0]?.img} alt={room.rooms?.name} className="w-48 h-28 rounded-lg object-cover" />
                        <div className="text-left">
                            <p className="font-medium mt-2">{room.rooms?.name}</p>
                                <p>{room.rooms?.detail}</p>
    
                        </div>
                    </div>
                ))}
            </div>


            <div className="flex justify-between items-center mt-4 ">
                <p className="text-lg font-medium">Total Price</p>
                <p className="text-xl font-semibold text-orange-500">THB {resBookingData.booking?.totalPrice}</p>
            </div>


            <div className="flex justify-between items-center mt-6 ">
                <p className="font-medium">Contact Details : </p>
                <div className="text-left flex flex-col items-end">
                    <p>{resBookingData.booking?.firstName+' '+resBookingData.booking?.lastName}</p>
                    <p>Tel : {resBookingData.booking?.phone}</p>
                    <p>Email : {resBookingData.booking?.email}</p>
                </div>
            </div>


            <div className="flex flex-col items-center mt-8">
                <p className="text-green-500 text-2xl pb-5 font-semibold">SUCCESS</p>
                <FaRegCheckCircle size={60} color='#22c55e'/>

            </div>
        </div>
    );
}

export default PaymentResult;
