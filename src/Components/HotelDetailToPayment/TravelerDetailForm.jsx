import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useHotelStore from "../../stores/hotel-store";
import useUserStore from "../../stores/user-store";
import axios from "axios";
import useBookingStore from "../../stores/booking-store";
import { useShallow } from "zustand/shallow";

const TravelerDetailForm = (props) => {
  const { pageParams, setPageParams } = props
  const navigate = useNavigate();
  const { user, filter } = useUserStore(useShallow(state => ({
    user: state.user,
    filter: state.filter
  })))
  const { currentHotel, selectedRoom } = useHotelStore(useShallow(state => ({
    currentHotel: state.currentHotel,
    selectedRoom: state.selectedRoom
  })))
  const { actionSetBooking, actionSetId, actionSetBookingDetail } = useBookingStore(useShallow(state => ({
    actionSetBooking: state.actionSetBooking,
    actionSetId: state.actionSetId,
    actionSetBookingDetail: state.actionSetBookingDetail
  })))
  const [bookingData, setBookingData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const [coupon, setCoupon] = useState({
    promotion: "",
  });

  useEffect(() => {// discount control
    if (pageParams.coupon) {
      console.log('have coupon')
      console.log(pageParams)
      if (+pageParams.totalPrice < +pageParams.coupon?.minimumSpend) {
        alert(`This coupon requires a minimum spend of ${pageParams.coupon?.minimumSpend}`)
        setPageParams(prv=>({ ...prv, coupon: null, discount: 0 }))
      } else {

        let discountedPrice = parseFloat(((+pageParams.totalPrice * +pageParams.coupon?.discountPercent) / 100) + +pageParams.coupon?.discountValue)
        if (discountedPrice > pageParams.coupon?.maxDiscount) {
          discountedPrice = parseFloat(pageParams.coupon.maxDiscount)
        }
        console.log(discountedPrice)
        setPageParams(prv=>({ ...prv, discount: discountedPrice }))
      }
    }
  }, [pageParams.coupon, pageParams.totalPrice])
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const checkInDate = formatDate(filter.journeyDate);
  const checkOutDate = formatDate(filter.returnDate);

  const handleCouponChange = (e) => {
    setCoupon((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleChange = (e) => {
    setBookingData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    actionSetBooking(bookingData);

    try {
      console.log(selectedRoom)
      const bookingPayload = {
        totalPrice: +pageParams.summaryPrice,
        checkinDate: checkInDate,
        checkoutDate: checkOutDate,
        hotelId: +currentHotel.id,
        roomId: +selectedRoom.id,
        amount: +pageParams.room
      };

      if (user?.id) {
        bookingPayload.userId = +user.id;
      }

      if (pageParams.coupon) {
        bookingPayload.promotionId = +pageParams.coupon.id;
      }
      console.log(bookingPayload)
      actionSetBookingDetail(bookingPayload)

      const res = await axios.post(
        "http://localhost:8000/booking",
        bookingPayload
      );
      actionSetId(res.data.booking.id);

      navigate("/bookinghotel-detail-payment-method");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleUseCoupon = async () => {
    // Check if the user is logged in (i.e., has a user ID)
    if (!user?.id) {
      alert("You must be logged in to use a promotion.");
      return;
    }
    try {
      const res = await axios.get(`http://localhost:8000/promotion/${coupon.promotion}`);
      const couponData = res.data;
      if (!couponData) {
        return alert("You coupon invalid")
      }
      console.log(couponData)
      setPageParams({ ...pageParams, coupon: couponData })
      // if (summary >= parseFloat(couponData.minimumSpend)) {
      //   const discountFromPercent = (summary * couponData.discountPercent) / 100;
      //   const appliedDiscount = Math.min(discountFromPercent, parseFloat(couponData.maxDiscount));

      //   setDiscount(appliedDiscount);
      //   setDiscountedPrice(summary - appliedDiscount);
      //   setPromotionId(couponData.id); // Save the promotionId to send with the booking
      alert("Coupon applied successfully!");
      // } 
      // else {
      //   alert(`This coupon requires a minimum spend of ${couponData.minimumSpend}`);
      // }
    } catch (error) {
      console.log("Error applying coupon:", error);
      alert("An error occurred while applying the coupon.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-[#fef6e4] p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">Traveler Details :</h3>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-gray-700">Name :</label>
          <input
            type="text"
            className="w-full p-2 mt-1 rounded bg-[#fef0d6]"
            name="firstName"
            value={bookingData.firstName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block text-gray-700">Last Name :</label>
          <input
            type="text"
            className="w-full p-2 mt-1 rounded bg-[#fef0d6]"
            name="lastName"
            value={bookingData.lastName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block text-gray-700">Email :</label>
          <input
            type="email"
            className="w-full p-2 mt-1 rounded bg-[#fef0d6]"
            name="email"
            value={bookingData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block text-gray-700">Phone :</label>
          <input
            type="text"
            className="w-full p-2 mt-1 rounded bg-[#fef0d6]"
            name="phone"
            value={bookingData.phone}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block text-gray-700">Promotion Code :</label>
          <input
            type="text"
            className="w-full p-2 mt-1 rounded bg-[#fef0d6]"
            name="promotion"
            value={coupon.promotion}
            onChange={handleCouponChange}
            disabled={!user?.id} // Disable input if user is a guest
          />
        </div>
        <div className="flex items-end">
          <button
            type="button"
            className="bg-orange-500 w-1/5 p-1 rounded-md text-white h-3/4"
            onClick={handleUseCoupon}
            disabled={!user?.id} // Disable button if user is a guest
          >
            ใช้คูปอง
          </button>
        </div>
      </div>
      <div className="flex justify-between items-center mt-4">
        <p className="text-lg font-bold">Total Price</p>
        <div className="text-right flex-col-reverse flex">
          <p className="text-xl font-bold text-orange-500">
            {pageParams.summaryPrice.toFixed(2)}
          </p>
          <p className="text-sm text-gray-500">- {pageParams.discount?.toFixed(2) || '0.00'}</p>
        </div>
      </div>
      <button type="submit" className="flex justify-center items-center m-auto w-[150px] mt-6 bg-orange-500 text-white py-2 rounded">
        Continue to Pay
      </button>
    </form>
  );
};

export default TravelerDetailForm;
