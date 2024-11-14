import React, { useEffect, useState } from "react";
import axios from "axios";
import usePartnerStore from "../../stores/partner-store";

const API = import.meta.env.VITE_API;

export default function ReviewDetailPartner() {
  const [reviewsPartner, setReviewsPartner] = useState(false);
  const hotel = usePartnerStore((state) => state.hotel);
  const [reviews, setReviews] = useState([]);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const itemsPerPage = 10;

  useEffect(() => {
    getAllReview();
  }, [page]);

  const getAllReview = async () => {
    const result = await axios.get(`${API}/hotel/${hotel.id}?page=${page}`);
    setReviews(result.data.reviews);
    setHasNextPage(result.data.reviews.length === itemsPerPage);
  };

    const handleNextPage = () => {
    if (hasNextPage) setPage(page + 1);
  };
  const handlePreviousPage = () => {
    if (page > 1) setPage(page - 1);
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
      {(reviews.length === itemsPerPage || page > 1) && (
        <div className="flex justify-center items-center my-4 space-x-4">
          <button
            onClick={handlePreviousPage}
            disabled={page === 1}
            className={`px-2 py-2 rounded-xl transition ${
              page === 1
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-orange-400 border-2 border-orange-400 text-white hover:bg-[#ffffff] hover:text-orange-400 hover:border-2 hover:border-orange-400"
            }`}
          >
            ◀ Previous
          </button>

          <span className="text-lg font-semibold">Page {page}</span>

          <button
            onClick={handleNextPage}
            disabled={!hasNextPage}
            className={`px-2 py-2 rounded-xl transition ${
              !hasNextPage
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-orange-400 border-2 border-orange-400 text-white hover:bg-[#ffffff] hover:text-orange-400 hover:border-2 hover:border-orange-400"
            }`}
          >
            Next ▶
          </button>
        </div>
      )}
    </div>
  );
}
