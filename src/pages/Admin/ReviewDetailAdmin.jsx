import React, { useState, useEffect } from "react";
import axios from "axios";
import useUserStore from "../../stores/user-store";
import ReviewImage from "../../Components/Admin/ReviewImage";

export default function ReviewDetailAdmin() {
  const [reviews, setReviews] = useState([]);
  console.log("reviews", reviews);
  const [reviewDetail, setReviewDetail] = useState(false);
  const token = useUserStore((state) => state.token);
  const API = import.meta.env.VITE_API;

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`${API}/review`, {
          params: { page: 1, limit: 10 },
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("reviews", response.data.data);
        setReviews(response.data.data);
      } catch (error) {
        console.log("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, [API, token]);

  const handleDelete = async (reviewId) => {
    try {
      await axios.delete(`${API}/review/${reviewId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setReviews((prevReviews) =>
        prevReviews.filter((review) => review.id !== reviewId)
      );
      alert("Review deleted successfully.");
    } catch (error) {
      console.log("Error deleting review:", error);
      alert("Failed to delete review. Please try again.");
    }
  };

  return (
    <>
      {reviewDetail && (
        <ReviewImage reviewsData={reviews} setReviewDetail={setReviewDetail} />
      )}
      <div className="w-full text-[#543310]">
        <p className="bg-[#AF8F6F] text-3xl font-bold rounded-lg p-2 text-center shadow-lg">
          REVIEWS
        </p>
        <table className="text-center w-full mt-4 border-collapse">
          <thead>
            <tr className="bg-[#AF8F6F]">
              <th className="border-collapse border p-2">ID</th>
              <th className="border-collapse border p-2">CONTENT</th>
              <th className="border-collapse border p-2">USERNAME</th>
              <th className="border-collapse border p-2">HOTEL NAME</th>
              <th className="border-collapse border p-2">BOOKING NO.</th>
              <th className="border-collapse border p-2">RATING</th>
              <th className="border-collapse border p-2">MORE IMAGE</th>
              <th className="border-collapse border p-2">DELETE</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((review) => (
              <tr key={review.id} className="bg-[#F8F4E1]">
                <td className="border-collapse border p-2">{review.id}</td>
                <td className="border-collapse border p-2">{review.content}</td>
                <td className="border-collapse border p-2">
                  {review.user?.firstName || "N/A"}
                </td>
                <td className="border-collapse border p-2">
                  {review.hotel?.name || "N/A"}
                </td>
                <td className="border-collapse border p-2">
                  {review.booking?.UUID || "N/A"}
                </td>
                <td className="border-collapse border p-2">{review.rating}</td>
                <td className="border-collapse border p-2">
                  <button
                    onClick={() => setReviewDetail(true)}
                    className="p-1 rounded border-2 bg-[#F8F4E1] border-[#543310] text-[#543310] shadow-lg hover:bg-[#543310] hover:text-white transition-all duration-100 ease-in-out"
                  >
                    IMAGE
                  </button>
                </td>
                <td className="border-collapse border p-2">
                  <div className="flex justify-center">
                    <button
                      onClick={() => handleDelete(review.id)}
                      className="rounded p-1 border-2 border-[#CD1818] bg-[#F8F4E1] text-[#CD1818] shadow-lg hover:bg-[#CD1818] hover:text-white transition-all duration-100 ease-in-out"
                    >
                      Remove
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
