import React, { useEffect, useState } from "react";
import useUserStore from "../../stores/user-store";
import axios from "axios";

export default function BookingDetailPartner() {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState(null);
  const token = useUserStore((state) => state.token);
  const API = import.meta.env.VITE_API;

  const formatDate = (dateStr) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateStr).toLocaleDateString(undefined, options);
  };

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

  return (
    <>
      <div className="w-full text-[#543310]">
        <p className="bg-[#AF8F6F] text-3xl font-bold rounded-lg p-2 text-center shadow-lg">
          BOOKING
        </p>
        <table className="text-center w-full mt-4 border-collapse">
          <thead>
            <tr className="bg-[#AF8F6F]">
              <th className="border-collapse border p-2">BOOKING NO.</th>
              <th className="border-collapse border p-2">USERNAME</th>
              <th className="border-collapse border p-2">ROOMS AMOUNT</th>
              <th className="border-collapse border p-2">RESERVATION DATE</th>
              <th className="border-collapse border p-2">CHECK-IN DATE</th>
              <th className="border-collapse border p-2">TOTAL PRICE</th>
              <th className="border-collapse border p-2">STATUS</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length > 0 ? (
              bookings.map((booking) => (
                <tr key={booking.id} className="bg-[#F8F4E1]">
                  <td className="border-collapse border p-2">{booking.UUID}</td>
                  <td className="border-collapse border p-2">{booking.users.email}</td>
                  <td className="border-collapse border p-2">
                    <p>{booking.bookingRooms[0]?.rooms?.name || "N/A"}</p>
                    <p>{booking.bookingRooms[0] ? booking.bookingRooms[0].amountRoom : "N/A"} rooms</p>
                  </td>
                  <td className="border-collapse border p-2">{formatDate(booking.createdAt)}</td>
                  <td className="border-collapse border p-2">
                  {formatDate(booking.checkinDate)} - {formatDate(booking.checkoutDate)}
                  </td>
                  <td className="border-collapse border p-2">{booking.totalPrice}</td>
                  <td className="border-collapse border p-2">{booking.status}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="border-collapse border p-2">
                  {error || "No bookings available"}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
