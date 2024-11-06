import React, { useEffect, useState } from "react";
import axios from "axios";
import useUserStore from "../../stores/user-store";

const API = import.meta.env.VITE_API;

export default function BookingDetailAdmin() {
  const [bookings, setBookings] = useState([]);
  console.log('booking',bookings);
  const [error, setError] = useState(null);
  const token = useUserStore((state) => state.token);
  console.log('token:',token);

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

  if (error) return <div>{error}</div>;

  return (
    <div className="w-full text-[#ffffff]">
      <p className="bg-[#AF8F6F] text-3xl font-bold rounded-lg p-2 text-center shadow-lg">
        BOOKING INFORMATION
      </p>
      <table className="text-center w-full mt-4 border-collapse">
        <thead>
          <tr className="bg-[#AF8F6F]">
            <th className="border p-2">ID</th>
            <th className="border p-2">GUEST NAME</th>
            <th className="border p-2">HOTEL NAME</th>
            <th className="border p-2">CHECK-IN DATE</th>
            <th className="border p-2">CHECK-OUT DATE</th>
            <th className="border p-2">PROMOTION</th>
            <th className="border p-2">TOTAL PRICE</th>
            <th className="border p-2">PAYMENT STATUS</th>
          </tr>
        </thead>
        <tbody>
  {bookings.length > 0 ? (
    bookings.map((booking) => (
      <tr key={booking.id} className="bg-white text-black">
        <td className="border p-2">{booking.id}</td>
        <td className="border p-2">{booking.users?.email || "N/A"}</td>
        <td className="border p-2">{booking.hotels?.name || "N/A"}</td>
        <td className="border p-2">
          {new Date(booking.checkinDate).toLocaleDateString()}
        </td>
        <td className="border p-2">
          {new Date(booking.checkoutDate).toLocaleDateString()}
        </td>
        <td className="border p-2">{booking.userHavePromotionId || "None"}</td>
        <td className="border p-2">THB {booking.totalPrice || "0.00"}</td>
        <td className="border p-2">{booking.status || "Pending"}</td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="8" className="border p-2">
        No bookings found.
      </td>
    </tr>
  )}
</tbody>

      </table>
    </div>
  );
}
