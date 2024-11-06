// import React, { useEffect } from "react";
// import axios from "axios";


// export default function BookingDetailAdmin() {
//   const [booking, setBooking] = useState([]);
//   console.log(booking);
//   const [error, setError] = useState(null);

//   useEffect(()=>{
//     const fetchBooking = async()=>{
//       try {
//         const res = await axios.get('http://localhost:8000/booking');
//         setBooking(res.data.bookings);
//       } catch (error) {
//         console.log('error to fetch',error)
//         setError(error);
//       }
//     }
//     fetchBooking();
//   },[])

//   return (
//     <>
//       <div className="w-full text-[#ffffff] ">
//         <p className="bg-[#AF8F6F] text-3xl font-bold rounded-lg p-2 text-center shadow-lg">
//           BOOKING INFORMATION
//         </p>
//         <table className=" text-center w-full mt-4 border-collapse">
//           <thead>
//             <tr className="bg-[#AF8F6F]">
//               <th className="border-collapse border p-2">ID</th>
//               <th className="border-collapse border p-2">GUEST NAME</th>
//               <th className="border-collapse border p-2">HOTEL NAME</th>
//               <th className="border-collapse border p-2">CHECK-IN DATE</th>
//               <th className="border-collapse border p-2">CHECK-OUT DATE</th>
//               <th className="border-collapse border p-2">PROMOTION</th>
//               <th className="border-collapse border p-2">TOTAL PRICE</th>
//               <th className="border-collapse border p-2">PAYMENT STATUS</th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr className="bg-[#AF8F6F]">
//               <td className="border-collapse border p-2"></td>
//               <td className="border-collapse border p-2"></td>
//               <td className="border-collapse border p-2"></td>
//               <td className="border-collapse border p-2"></td>
//               <td className="border-collapse border p-2"></td>
//               <td className="border-collapse border p-2"></td>
//               <td className="border-collapse border p-2"></td>
//               <td className="border-collapse border p-2"></td>
//             </tr>
//           </tbody>
//         </table>
//       </div>
//     </>
//   );
// }






import React, { useEffect, useState } from "react";
import axios from "axios";
import useUserStore from "../../stores/user-store";

export default function BookingDetailAdmin() {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState(null);
  const token = useUserStore((state) => state.token);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get("http://localhost:8000/booking", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
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
                <td className="border p-2">{booking.user?.name || "N/A"}</td>
                <td className="border p-2">{booking.hotel?.name || "N/A"}</td>
                <td className="border p-2">
                  {new Date(booking.checkinDate).toLocaleDateString()}
                </td>
                <td className="border p-2">
                  {new Date(booking.checkoutDate).toLocaleDateString()}
                </td>
                <td className="border p-2">{booking.promotion || "None"}</td>
                <td className="border p-2">THB {booking.totalPrice || "0.00"}</td>
                <td className="border p-2">{booking.paymentStatus || "Pending"}</td>
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
