import React, { useEffect, useState } from "react";
import useBookingStore from "../../stores/booking-store";
import { FaRegCheckCircle } from "react-icons/fa";
import useHotelStore from "../../stores/hotel-store";
import { useNavigate } from "react-router-dom";

function PaymentResult() {
  const resBookingData = useBookingStore((state) => state.resBookingData);
  const [date, setDate] = useState({
    checkInDate: "",
    checkOutDate: "",
  });
  const currentHotel = useHotelStore((state) => state.currentHotel);
  const navigate = useNavigate()

  const handleClick = () => {
    navigate("/")
  }

  useEffect(() => {
    const checkInDate = new Date(resBookingData.booking.checkinDate);
    const checkOutDate = new Date(resBookingData.booking.checkoutDate);
    const checkInDateString = `${checkInDate.getFullYear()}-${(checkInDate.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${checkInDate.getDate().toString().padStart(2, "0")}`;
    const checkOutDateString = `${checkOutDate.getFullYear()}-${(checkOutDate.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${checkOutDate.getDate().toString().padStart(2, "0")}`;
    setDate({
      checkInDate: checkInDateString,
      checkOutDate: checkOutDateString,
    });
  }, [resBookingData]);

  return (
    <div className="max-w-3xl mx-auto p-10 text-gray-800 bg-orange-50 rounded-2xl shadow-lg space-y-10 w-full">
      {/* Success Icon and Heading */}
      <div className="flex flex-col items-center space-y-4">
        <FaRegCheckCircle size={80} className="text-green-500" />
        <h1 className="text-3xl font-extrabold text-green-600">Payment Successful</h1>
      </div>

      {/* Booking Number and Total Price */}
      <div className="bg-orange-100 rounded-lg p-6 text-lg ">
        <div className="flex items-center justify-between">
          <p className="font-semibold">Booking Number:</p>
          <span className="text-orange-600 font-semibold">{resBookingData.booking.UUID}</span>
        </div>
        <div className="flex items-center justify-between mt-3">
          <p className="font-semibold">Total Price:</p>
          <span className="text-orange-600 font-semibold">
            {resBookingData.booking?.totalPrice} THB
          </span>
        </div>
      </div>

      <div className="flex gap-8">
        {/* Booking Details */}
        <div className="bg-orange-100 rounded-lg p-6 space-y-4 flex-1">
          <p className="text-lg font-semibold border-b pb-2">Booking Details</p>
          <div className="grid grid-cols-2 gap-y-2 text-sm break-words">
            <p className="font-medium">Hotel Name:</p>
            <p>{currentHotel?.name}</p>
            <p className="font-medium">Room:</p>
            <p>{resBookingData.booking?.bookingRooms[0]?.rooms?.name} x {resBookingData.booking?.bookingRooms[0]?.amountRoom}</p>
            <p className="font-medium">Check-in :</p>
            <p>{date.checkInDate}</p>
            <p className="font-medium">Check-out :</p>
            <p>{date.checkOutDate}</p>
          </div>
        </div>

        {/* Contact Details */}
        <div className="bg-orange-100 rounded-lg p-6 space-y-4 flex-1">
          <p className="text-lg font-semibold border-b pb-2">Contact Details</p>
          <div className="grid grid-cols-2 gap-y-2 text-sm break-words">
            <p className="font-medium">Name:</p>
            <p>{resBookingData.booking?.firstName} {resBookingData.booking?.lastName}</p>
            <p className="font-medium">Tel:</p>
            <p>{resBookingData.booking?.phone}</p>
            <p className="font-medium">Email:</p>
            <p>{resBookingData.booking?.email}</p>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <button className="bg-orange-500 text-white font-bold p-2 rounded-md" onClick={handleClick}>Go Home</button>
      </div>
    </div>
  );
}

export default PaymentResult;
