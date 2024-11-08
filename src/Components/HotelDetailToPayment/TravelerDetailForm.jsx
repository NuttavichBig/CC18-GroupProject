import React from "react";
import { useNavigate } from "react-router-dom";
import useHotelStore from "../../stores/hotel-store";
import useUserStore from "../../stores/user-store";
import axios from "axios";

const TravelerDetailForm = () => {
  const navigate = useNavigate();
  const user = useUserStore(state=>state.user)
  const summary = useHotelStore((state) => state.summary);
  const currentHotel = useHotelStore(state=>state.currentHotel)
  const filter =  useUserStore(state=>state.filter)
  // totalPrice, checkInDate, checkOutDate, hotelId

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const checkInDate = formatDate(filter.journeyDate);
  const checkOutDate = formatDate(filter.returnDate);

  console.log(checkInDate,checkOutDate)

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      // console.log(journeyDate,returnDate)
      await axios.post("http://localhost:8000/booking",{
        userId: user.id,
        totalPrice: summary,
        checkinDate: checkInDate,
        checkoutDate: checkOutDate,
        hotelId: currentHotel.id
      })
      navigate("/bookinghotel-detail-payment-method");
    } catch (error) {
      console.error(error)
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#fef6e4] p-6 rounded-lg shadow-md"
    >
      <h3 className="text-lg font-semibold mb-4">Traveler Details :</h3>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-gray-700">Name :</label>
          <input type="text" className="w-full p-2 mt-1 rounded bg-[#fef0d6]" />
        </div>
        <div>
          <label className="block text-gray-700">Last Name :</label>
          <input type="text" className="w-full p-2 mt-1 rounded bg-[#fef0d6]" />
        </div>
        <div>
          <label className="block text-gray-700">Email :</label>
          <input
            type="email"
            className="w-full p-2 mt-1 rounded bg-[#fef0d6]"
          />
        </div>
        <div>
          <label className="block text-gray-700">Phone :</label>
          <input type="text" className="w-full p-2 mt-1 rounded bg-[#fef0d6]" />
        </div>
        <div>
          <label className="block text-gray-700">Promotion Code :</label>
          <input type="text" className="w-full p-2 mt-1 rounded bg-[#fef0d6]" />
        </div>
        <div className="flex items-end">
          <button className="bg-orange-500 w-1/5 p-1 rounded-md text-white h-3/4">
            ใช้คูปอง
          </button>
        </div>
      </div>
      <div className="flex justify-between items-center mt-4">
        <p className="text-lg font-bold">Total Price</p>
        <div className="text-right">
          <p className="text-xl font-bold text-orange-500">
            {summary.toFixed(2)}
          </p>
          <p className="text-sm text-gray-500 line-through">THB 5,186.67</p>
        </div>
      </div>
      <button
        type="submit"
        className="flex justify-center items-center m-auto w-[150px] mt-6 bg-orange-500 text-white py-2 rounded"
      >
        Continue to Pay
      </button>
    </form>
  );
};

export default TravelerDetailForm;
