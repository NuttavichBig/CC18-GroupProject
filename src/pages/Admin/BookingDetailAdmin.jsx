import React, { useEffect, useState } from "react";
import axios from "axios";
import useUserStore from "../../stores/user-store";
import Swal from "sweetalert2";
import FormErrorAlert from '../../assets/ErrorToast1.gif'
import FormSuccessAlert from '../../assets/SuccessToast.gif'


const API = import.meta.env.VITE_API;

export default function BookingDetailAdmin() {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const itemsPerPage = 10;

  const token = useUserStore((state) => state.token);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(`${API}/booking?page=${page}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBookings(response.data.data);
        setHasNextPage(response.data.data.length === itemsPerPage);
      } catch (err) {
        console.error("Failed to fetch bookings:", err);
        setError("Failed to load booking data");
      }
    };

    fetchBookings();
  }, [token, page]);

  const handlePaymentStatusChange = async (bookingId, newStatus) => {
    console.log('bookingId:', bookingId, 'newStatus:', newStatus);
    try {
      const response = await axios.patch(
        `${API}/admin/booking/${bookingId}`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setBookings((prevBookings) =>
        prevBookings.map((booking) =>
          booking.id === bookingId ? { ...booking, status: newStatus } : booking
        )
      );
      //alert success
      Swal.fire({
        html: `<div class="flex items-center gap-2">
           <img src="${FormSuccessAlert}" alt="Error Animation" class="w-10 h-10" />
           <span style="font-size: 16px; font-weight: bold; color: green;">Update Status Success</span>
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
    } catch (err) {
      const errMsg = err.response?.data?.message || err.message;
      setError("Failed to update payment status");
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

  const handleNextPage = () => {
    if (hasNextPage) setPage(page + 1);
  };
  const handlePreviousPage = () => {
    if (page > 1) setPage(page - 1);
  };

  if (error) return <div>{error}</div>;


  return (
    <div className="w-full bg-gray-100 py-6 px-4">
      {/* Title Section */}
      <p className="bg-gradient-to-r from-[#0088d1] to-[#1E4D8C] text-3xl font-bold text-white rounded-lg py-2 text-center shadow-lg">
        BOOKING INFORMATION
      </p>
      {/* Table Section */}
      <div className="overflow-x-auto mt-6 bg-white rounded-lg shadow-md">
        <table className="min-w-full text-sm text-center text-gray-600">
          <thead className="bg-[#0088d1] text-white">
            <tr>
              <th className="p-4 border-b">ID</th>
              <th className="p-4 border-b">GUEST NAME</th>
              <th className="p-4 border-b">HOTEL NAME</th>
              <th className="p-4 border-b">CHECK-IN DATE</th>
              <th className="p-4 border-b">CHECK-OUT DATE</th>
              <th className="p-4 border-b">PROMOTION</th>
              <th className="p-4 border-b">TOTAL PRICE</th>
              <th className="p-4 border-b">PAYMENT STATUS</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length > 0 ? (
              bookings.map((booking) => (
                <tr
                  key={booking.id}
                  className="hover:bg-gray-50 transition duration-200"
                >
                  <td className="p-4 border-b">{booking.id}</td>
                  <td className="p-4 border-b">{booking.users?.email || "N/A"}</td>
                  <td className="p-4 border-b">{booking.hotels?.name || "N/A"}</td>
                  <td className="p-4 border-b">
                    {new Date(booking.checkinDate).toLocaleDateString()}
                  </td>
                  <td className="p-4 border-b">
                    {new Date(booking.checkoutDate).toLocaleDateString()}
                  </td>
                  <td className="p-4 border-b">{booking.userHavePromotionId || "None"}</td>
                  <td className="p-4 border-b">THB {booking.totalPrice || "0.00"}</td>
                  <td className="p-4 border-b">
                    <select
                      value={booking.status || "Pending"}
                      onChange={(e) =>
                        handlePaymentStatusChange(booking.id, e.target.value)
                      }
                      className="p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="PENDING">PENDING</option>
                      <option value="CONFIRMED">CONFIRMED</option>
                      <option value="CANCELED">CANCELED</option>
                      <option value="FAILED">FAILED</option>
                      <option value="REFUND">REFUND</option>
                    </select>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="p-4 border-b text-center text-gray-500">
                  No bookings found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center items-center my-4 space-x-4">
        <button
          onClick={handlePreviousPage}
          disabled={page === 1}
          className={`px-2 py-2 rounded-xl transition ${page === 1
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-[#27a6ea] border-2 border-[#27a6ea] text-white hover:bg-[#ffffff] hover:text-[#27a6ea] hover:border-2 hover:border-[#27a6ea]"
            }`}
        >
          ◀ Previous
        </button>

        <span className="text-lg font-semibold">Page {page}</span>

        <button
          onClick={handleNextPage}
          disabled={!hasNextPage}
          className={`px-2 py-2 rounded-xl transition ${!hasNextPage
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-[#27a6ea] border-2 border-[#27a6ea] text-white hover:bg-[#ffffff] hover:text-[#27a6ea] hover:border-2 hover:border-[#27a6ea]"
            }`}
        >
          Next ▶
        </button>
      </div>
    </div>
  );
}
