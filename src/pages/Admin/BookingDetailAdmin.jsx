import React, { useEffect, useState } from "react";
import axios from "axios";
import useUserStore from "../../stores/user-store";

const API = import.meta.env.VITE_API;

export default function BookingDetailAdmin() {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState(null);
  const token = useUserStore((state) => state.token);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(`${API}/booking`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("Response Data:", response.data);
        setBookings(response.data.data);
      } catch (err) {
        console.error("Failed to fetch bookings:", err);
        setError("Failed to load booking data");
      }
    };
    
    fetchBookings();
  }, [token]);

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
      alert(response.data.message);
    } catch (err) {
      setError("Failed to update payment status");
    }
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
    </div>
  );
}
