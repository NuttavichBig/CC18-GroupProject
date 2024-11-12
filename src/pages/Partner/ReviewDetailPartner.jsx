import React, { useEffect, useState } from "react";
import axios from "axios";
import usePartnerStore from "../../stores/partner-store";

const API = import.meta.env.VITE_API;

export default function ReviewDetailPartner() {
  const [reviewsPartner, setReviewsPartner] = useState(false);
  const hotel = usePartnerStore((state) => state.hotel);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    getAllReview();
  }, []);

  const getAllReview = async () => {
    const result = await axios.get(`${API}/hotel/${hotel.id}`);
    setReviews(result.data.reviews);
  };

  return (
    <div className="w-full text-[#543310]">
      <p className="bg-orange-400 text-3xl font-bold rounded-lg p-4 text-center text-white shadow-md">
        REVIEWS
      </p>
      <table className="text-center w-full mt-6 border-collapse">
        <thead>
          <tr className="bg-orange-400 text-white">
            {["No", "BOOKING ID", "RATING", "IMAGE", "CONTENT", "CREATE"].map((heading, index) => (
              <th key={index} className="border border-orange-300 p-3 font-semibold uppercase tracking-wide text-sm">
                {heading}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {reviews.map((item, index) => (
            <tr key={index} className="odd:bg-orange-100 even:bg-orange-50">
              <td className="border border-orange-300 p-3">{index + 1}</td>
              <td className="border border-orange-300 p-3">{item.bookingId}</td>
              <td className="border border-orange-300 p-3">{item.rating}</td>
              <td className="border border-orange-300 p-3">
                <img src={item.img} alt={`Review ${item.id} image`} className="w-20 h-20 object-cover rounded-lg mx-auto" />
              </td>
              <td className="border border-orange-300 p-3">{item.content}</td>
              <td className="border border-orange-300 p-3">{item.createdAt.slice(0, 10)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
