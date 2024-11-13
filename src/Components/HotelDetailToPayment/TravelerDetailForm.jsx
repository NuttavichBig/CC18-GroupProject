import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useHotelStore from "../../stores/hotel-store";
import useUserStore from "../../stores/user-store";
import axios from "axios";
import useBookingStore from "../../stores/booking-store";
import { useShallow } from "zustand/shallow";
import Swal from "sweetalert2";
import FormErrorIcon from '../../assets/ErrorToast1.gif'
import FormSuccessIcon from '../../assets/SuccessToast.gif'
import CouponUseSuccessIconAlert from '../../assets/couponsuccessAlert.gif'
import { toast } from "react-toastify";


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
  const { actionSetId, actionSetBookingDetail } = useBookingStore(useShallow(state => ({
    actionSetId: state.actionSetId,
    actionSetBookingDetail: state.actionSetBookingDetail
  })))
  const [bookingData, setBookingData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    phone: user?.phone || "",
  });

  const [coupon, setCoupon] = useState({
    promotion: "",
  });

  useEffect(() => {// discount control
    if (pageParams.coupon) {
      console.log('have coupon')
      console.log(pageParams)
      if (+pageParams.totalPrice < +pageParams.coupon?.minimumSpend) {
        toast.error(`This coupon requires a minimum spend of ${pageParams.coupon?.minimumSpend}`)
        setPageParams(prv => ({ ...prv, coupon: null, discount: 0 }))
      } else {

        let discountedPrice = parseFloat(((+pageParams.totalPrice * +pageParams.coupon?.discountPercent) / 100) + +pageParams.coupon?.discountValue)
        if (discountedPrice > pageParams.coupon?.maxDiscount) {
          discountedPrice = parseFloat(pageParams.coupon.maxDiscount)
        }
        console.log(discountedPrice)
        setPageParams(prv => ({ ...prv, discount: discountedPrice }))
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
    try {
      console.log(selectedRoom)
      const bookingPayload = {
        totalPrice: +pageParams.summaryPrice,
        checkinDate: checkInDate,
        checkoutDate: checkOutDate,
        hotelId: +currentHotel.id,
        roomId: +selectedRoom.id,
        amount: +pageParams.room,
        firstName: bookingData.firstName,
        lastName: bookingData.lastName,
        phone: bookingData.phone,
        email: bookingData.email
      };

      if (user?.id) {
        bookingPayload.userId = +user.id;
      }

      if (pageParams.coupon) {
        bookingPayload.promotionId = +pageParams.coupon.id;
      }
      console.log(bookingPayload)
      actionSetBookingDetail({ ...bookingPayload, nights: pageParams.nights })

      const res = await axios.post(
        "http://localhost:8000/booking",
        bookingPayload
      );
      actionSetId(res.data.booking.id);
      navigate("/bookinghotel-detail-payment-method");
    } catch (error) {
      console.error("Error:", error);
      const errMsg = error?.response?.data?.message || error.message;
      //alert error
      Swal.fire({
        html: `<div class="flex items-center gap-2">
           <img src="${FormErrorIcon}" alt="Error Animation" class="w-10 h-10" />
           <span style="font-size: 16px; font-weight: bold; color: red;">${errMsg}</span>
         </div>`,
        position: "top-end",
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false,
        toast: true,
        background: "#ffffff",
        didOpen: (toast) => {
          const progressBar = toast.querySelector(".swal2-timer-progress-bar");
          if (progressBar) {
            progressBar.style.backgroundColor = "#f44336";
          }
          toast.addEventListener("click", Swal.close);
        },
      });

    }
  };

  const handleUseCoupon = async () => {
    // Check if the user is logged in (i.e., has a user ID)
    if (!user?.id) {
      toast.error("You must be logged in to use a promotion.")
      return;
    }
    if (!coupon.promotion.trim()) {
      toast.info("Please fill your code")
      return;
    }
    try {
      const res = await axios.get(`http://localhost:8000/promotion/${coupon.promotion}`);
      const couponData = res.data;
      if (!couponData) {
        return toast.error("You coupon invalid")
      }
      console.log(couponData)
      setPageParams({ ...pageParams, coupon: couponData })
      if (+pageParams.totalPrice > +pageParams.coupon?.minimumSpend) {
        //alert success
        Swal.fire({
          html: `<div class="flex items-center gap-2">
           <img src="${CouponUseSuccessIconAlert}" alt="Error Animation" class="w-14 h-14" />
           <span style="font-size: 16px; font-weight: bold; color: green;">Coupon Use Success</span>
         </div>`,
          position: "top-end",
          timer: 3000,
          timerProgressBar: true,
          showConfirmButton: false,
          toast: true,
          background: "#ffffff",
          didOpen: (toast) => {
            const progressBar = toast.querySelector(".swal2-timer-progress-bar");
            if (progressBar) {
              progressBar.style.backgroundColor = "green";
            }
            toast.addEventListener("click", Swal.close);
          },
        });
      }
    } catch (error) {
      console.log("Error applying coupon:", error);
      const errMsg = error?.response?.data?.message || error.message;
      //alert error
      Swal.fire({
        html: `<div class="flex items-center gap-2">
           <img src="${FormErrorIcon}" alt="Error Animation" class="w-10 h-10" />
           <span style="font-size: 16px; font-weight: bold; color: red;">${errMsg}</span>
         </div>`,
        position: "top-end",
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false,
        toast: true,
        background: "#ffffff",
        didOpen: (toast) => {
          const progressBar = toast.querySelector(".swal2-timer-progress-bar");
          if (progressBar) {
            progressBar.style.backgroundColor = "#f44336";
          }
          toast.addEventListener("click", Swal.close);
        },
      });

    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-cream-gradient p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4 ">Traveler Details :</h3>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block ">Name :</label>
          <input
            type="text"
            className="w-full p-2 mt-1 rounded  border border-orange-light "
            name="firstName"
            value={bookingData.firstName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block ">Last Name :</label>
          <input
            type="text"
            className="w-full p-2 mt-1 rounded  border border-orange-light "
            name="lastName"
            value={bookingData.lastName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block ">Email :</label>
          <input
            type="email"
            className="w-full p-2 mt-1 rounded  border border-orange-light "
            name="email"
            value={bookingData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block">Phone :</label>
          <input
            type="text"
            className="w-full p-2 mt-1 rounded  border border-orange-light "
            name="phone"
            value={bookingData.phone}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block ">Promotion Code :</label>
          <div className="flex items-center w-full">
            <input
              type="text"
              className="p-1.5 mt-1 rounded-l w-3/4 border border-orange-light"
              name="promotion"
              value={coupon.promotion}
              onChange={handleCouponChange}
              disabled={!user?.id} // Disable input if user is a guest
            />
            <button
              type="button"
              className="bg-gradient-to-r mt-1  px-2 from-[#f08a4b] to-[#e05b3c] text-white py-2 rounded-r-lg font-bold shadow-lg transition-transform duration-200 cursor-pointer hover:scale-105 hover:shadow-[inset_0_0_8px_rgba(240,138,75,0.4),0_4px_15px_rgba(240,138,75,0.6),0_4px_15px_rgba(224,91,60,0.4)]"
              onClick={handleUseCoupon}
              disabled={!user?.id} // Disable button if user is a guest
            >
              Use Coupon
            </button>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center mt-4">
        <p className="text-lg font-bold ">Total Price</p>
        <div className="text-right flex-col-reverse flex">
          <p className="text-xl font-bold text-orange-500">
            {pageParams.summaryPrice.toFixed(2)}
          </p>
          <p className="text-sm text-gray-500">- {pageParams.discount?.toFixed(2) || '0.00'}</p>
        </div>
      </div>
      <button type="submit"
        className="flex justify-center items-center m-auto w-[170px] mt-6 bg-gradient-to-r from-[#f08a4b] to-[#e05b3c] text-white py-2 px-3 rounded-full font-bold text-lg shadow-lg transition-transform duration-200 cursor-pointer hover:scale-105 hover:shadow-[inset_0_0_8px_rgba(240,138,75,0.2),0_4px_15px_rgba(240,138,75,0.6),0_4px_15px_rgba(224,91,60,0.4)]"

      >
        Continue to Pay
      </button>
    </form >
  );
};

export default TravelerDetailForm;
