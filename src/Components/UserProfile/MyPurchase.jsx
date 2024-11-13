import React, { useEffect, useState } from "react";
import hotelsuccessicon from "../../assets/hotelsuccesspaymenticon.jpg";
import cancle from "../../assets/cancle.png";
import fail from "../../assets/fail.png";
import refund from "../../assets/refund.png";
import pending from "../../assets/pending.png";
import dropdownhistorymyPurchase from "../../assets/drop-down-arrow-icon_Mypurchase.gif";
import ReviewModal from "../ModalOther/ReviewModal";
import axios from "axios";
import useUserStore from "../../stores/user-store";
import Swal from "sweetalert2";
import FormErrorAlert from '../../assets/ErrorToast1.gif'
import FormSuccessAlert from '../../assets/SuccessToast.gif'


const statusDetails = {
  PENDING: {
    color: "text-[#ffae00]",
    icon: pending,
  },
  CONFIRMED: {
    color: "text-green-500",
    icon: hotelsuccessicon,
  },
  CANCELED: {
    color: "text-[#ff0000]",
    icon: cancle,
  },
  FAILED: {
    color: "text-[#ff4d00]",
    icon: fail,
  },
  REFUND: {
    color: "text-[#3596fd]",
    icon: refund,
  },
};

const API = import.meta.env.VITE_API;

function MyPurchase() {
  const token = useUserStore((state) => state.token);
  const [pageParams, setPageParams] = useState({
    selectedHotelIndexes: [],
    isReviewModalOpen: false,
    reviewHotel: null,
  });
  const [booking, setBooking] = useState([]);

  useEffect(() => {
    getAllBooking();
  }, []);
  const getAllBooking = async () => {
    try {
      const result = await axios.get(`${API}/booking`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("result", result.data.data);
      setBooking(result.data.data);

      //alert success
    } catch (err) {
      const errMsg = error.response?.data?.message || error.message;
      console.log(err);
      //alert error
      Swal.fire({
        html: `<div class="flex items-center gap-2">
           <img src="${FormErrorAlert}" alt="Error Animation" class="w-10 h-10" />
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

  const handleToggleDetails = (index) => {
    setPageParams((prv) => {
      console.log("handleToggle");
      if (prv.selectedHotelIndexes.includes(index)) {
        const newArr = prv.selectedHotelIndexes.filter((i) => i !== index);
        return { ...prv, selectedHotelIndexes: newArr };
      } else {
        return {
          ...prv,
          selectedHotelIndexes: [...prv.selectedHotelIndexes, index],
        };
      }
    });
  };

  const handleOpenReviewModal = (hotel) => {
    setPageParams((prv) => ({
      ...prv,
      reviewHotel: hotel,
      isReviewModalOpen: true,
    }));
  };

  return (
    <div className=" flex flex-col mt-20 w-4/5 rounded-lg space-y-4 ">
      {booking.map((book, index) => (
        <div key={index} className="p-4 bg-[#FFF8EC] rounded-lg shadow-lg mb-4">
          <div className="text-right font-semibold text-gray-600 text-opacity-70">
            <p>Booking ID: {book.UUID}</p>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <img
                src={book.hotels?.img}
                alt={book.hotels?.name}
                className="w-24 h-24 rounded-lg object-cover mr-4"
              />
              <div className="text-left">
                <p className="text-lg font-medium">{book.hotels?.name}</p>
              </div>
            </div>
            <button onClick={() => handleToggleDetails(index)}>
              <img
                src={dropdownhistorymyPurchase}
                alt="Toggle Details"
                className={`w-12 h-12 transform ${pageParams?.selectedHotelIndexes?.includes(index)
                  ? "rotate-180"
                  : ""
                  }`}
              />
            </button>
          </div>
          {pageParams.selectedHotelIndexes.includes(index) && (
            <div className="mt-4">
              <div className="text-left">
                <div className="flex justify-between">
                  <p className="font-medium text-xl mt-2">{book.hotels?.name}</p>
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold">Rating:</span>
                    <div className="flex">
                      <span className="text-yellow-500">
                        {"★".repeat(book.hotels?.star)}
                      </span>
                      <span className="text-gray-300">
                        {"★".repeat(5 - book.hotels?.star)}
                      </span>
                    </div>
                  </div>
                </div>
                <p>{book.hotels.address}</p>
                <p>{book.hotels.detail}</p>
              </div>

              <div className="flex justify-end items-center">
                {book.review !== null ? (
                  <button
                    disabled
                    className="bg-gray-500 text-white px-4 py-2 mt-5 rounded-md shadow-md  transition duration-200 ease-in-out"
                  >
                    Already Review
                  </button>
                ) : (
                  <button
                    onClick={() => handleOpenReviewModal(book)}
                    className="bg-orange-500 text-white px-4 py-2 mt-5 rounded-md shadow-md hover:bg-orange-600 transition duration-200 ease-in-out"
                  >
                    Review
                  </button>
                )}
              </div>

              <div className="grid grid-cols-2 gap-8 mt-4">
                {book.bookingRooms.map((room, i) => (
                  <div key={i} className="flex space-x-4 items-start">
                    <img
                      src={room?.rooms?.images[0]?.img}
                      alt={room.rooms?.name}
                      className="w-48 h-28 rounded-lg object-cover"
                    />
                    <div className="text-left">
                      <p className="font-medium text-xl mt-2">
                        {room?.rooms?.name}
                      </p>
                      <p>{room?.rooms?.detail}</p>
                    </div>
                  </div>
                ))}
                {book.bookingRooms.map((room, i) => (
                  <div
                    key={i}
                    className="flex flex-col items-end font-semibold text-sm mt-2 text-gray-500"
                  >
                    <div className="text-left">
                      <p>Amount : {room.amountRoom} rooms</p>
                      <p>
                        Checkin Date:{" "}
                        {new Date(book.checkinDate).toLocaleDateString()}
                      </p>
                      <p>
                        Checkout Date:{" "}
                        {new Date(book.checkoutDate).toLocaleDateString()}
                      </p>
                    </div >
                  </div >
                ))
                }
              </div >

              <div className="flex justify-between items-center mt-4 text-gray-700">
                <p className="text-lg font-medium">Total Price</p>
                <p className="text-2xl font-bold text-orange-500">
                  THB {book.totalPrice.toLocaleString("th-TH")}
                </p>
              </div>

              <div className="flex justify-between items-start mt-6 text-gray-700">
                <p className="font-medium">Contact Details</p>
                <div className="text-left">
                  <p>Name: {book.firstName + " " + book.lastName}</p>
                  <p>Tel: {book.phone}</p>
                  <p>Email: {book.email}</p>
                </div>
              </div>

              <div className="flex flex-col items-center mt-8">
                <p
                  className={`text-2xl font-semibold ${statusDetails[book.status]?.color
                    }`}
                >
                  {book.status}
                </p>
                {statusDetails[book.status]?.icon && (
                  <img
                    src={statusDetails[book.status].icon}
                    alt={`${book.status} Icon`}
                    className="w-20 h-20"
                  />
                )}
              </div>
            </div >
          )}
        </div >
      ))}
      {
        pageParams.isReviewModalOpen && pageParams.reviewHotel && (
          <ReviewModal
            getAllBooking={getAllBooking}
            bookingId={pageParams.reviewHotel.id}
            hotelName={pageParams.reviewHotel.hotels.name}
            hotelImage={pageParams.reviewHotel.hotels.img}
            onClose={() =>
              setPageParams((prv) => ({ ...prv, isReviewModalOpen: false }))
            }
            onSubmit={() => console.log("Review submitted!")}
          />
        )
      }
    </div >
  );
}

export default MyPurchase;
