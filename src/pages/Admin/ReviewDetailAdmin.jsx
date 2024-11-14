import React, { useState, useEffect } from "react";
import axios from "axios";
import useUserStore from "../../stores/user-store";
import ReviewImage from "../../Components/Admin/ReviewImage";
import Swal from "sweetalert2";
import FormErrorAlert from '../../assets/ErrorToast1.gif'
import FormSuccessAlert from '../../assets/SuccessToast.gif'

export default function ReviewDetailAdmin() {
  const [reviews, setReviews] = useState([]);
  const [reviewDetail, setReviewDetail] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedReviewId, setSelectedReviewId] = useState(null);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const itemsPerPage = 10;
  const token = useUserStore((state) => state.token);
  const API = import.meta.env.VITE_API;
 const [index ,setIndex] = useState(null)
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`${API}/review?page=${page}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setReviews(response.data.data);
        setHasNextPage(response.data.length === itemsPerPage);
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
      setReviews((prevReviews) => prevReviews.filter((review) => review.id !== reviewId));

      // Success alert
      Swal.fire({
        html: `<div class="flex items-center gap-2">
          <img src="${FormSuccessAlert}" alt="Success Animation" class="w-10 h-10" />
          <span style="font-size: 16px; font-weight: bold; color: green;">Review deleted successfully</span>
        </div>`,
        position: "top-end",
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false,
        toast: true,
        background: "#ffffff",
        didOpen: (toast) => {
          const progressBar = toast.querySelector(".swal2-timer-progress-bar");
          if (progressBar) progressBar.style.backgroundColor = "green";
          toast.addEventListener("click", Swal.close);
        },
      });
    } catch (error) {
      const errMsg = error.response?.data?.message || error.message;
      console.log("Error deleting review:", error);

      // Error alert
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
          if (progressBar) progressBar.style.backgroundColor = "#f44336";
          toast.addEventListener("click", Swal.close);
        },
      });
    }
  };

  // Open modal to confirm deletion
  const openDeleteModal = (reviewId) => {
    setSelectedReviewId(reviewId);
    setIsModalOpen(true);
  };

  // Confirm deletion
  const confirmDelete = () => {
    handleDelete(selectedReviewId);
    setIsModalOpen(false);
  };

  const handleNextPage = () => {
    if (hasNextPage) setPage(page + 1);
  };
  const handlePreviousPage = () => {
    if (page > 1) setPage(page - 1);
  };

  return (
    <>
      {reviewDetail && <ReviewImage reviewsData={reviews[index]} setReviewDetail={setReviewDetail} />}
      <div className="w-full bg-gray-100 py-6 px-4">
        <p className="bg-gradient-to-r from-[#0088d1] to-[#1E4D8C] text-3xl font-bold rounded-lg p-3 text-center shadow-lg text-white">
          REVIEWS
        </p>
        <div className="overflow-x-auto mt-6 bg-white rounded-lg shadow-lg">
          <table className="min-w-full text-sm text-gray-600 border-collapse">
            <thead className="bg-[#0088d1] text-white">
              <tr>
                <th className="py-3 px-4 border-b">ID</th>
                <th className="py-3 px-4 border-b">CONTENT</th>
                <th className="py-3 px-4 border-b">USERNAME</th>
                <th className="py-3 px-4 border-b">HOTEL NAME</th>
                <th className="py-3 px-4 border-b">BOOKING NO.</th>
                <th className="py-3 px-4 border-b">RATING</th>
                <th className="py-3 px-4 border-b">MORE IMAGE</th>
                <th className="py-3 px-4 border-b">DELETE</th>
              </tr>
            </thead>
            <tbody>
              {reviews.map((review,index) => (
                <tr key={review.id} className="bg-white hover:bg-sky-100 transition duration-300 ease-in-out">
                  <td className="py-3 px-4 border-b">{review.id}</td>
                  <td className="py-3 px-4 border-b">{review.content}</td>
                  <td className="py-3 px-4 border-b">{review.user?.firstName || "N/A"}</td>
                  <td className="py-3 px-4 border-b">{review.hotel?.name || "N/A"}</td>
                  <td className="py-3 px-4 border-b">{review.booking?.UUID || "N/A"}</td>
                  <td className="py-3 px-4 border-b">{review.rating}</td>
                  <td className="py-3 px-4 border-b">
                    <button
                      onClick={() => {
                        setIndex(index)
                        setReviewDetail(true)
                      }}
                      className="px-4 py-2 bg-[#8ed0ff] text-[#0c1b48] border-2 border-[#0c1b48] rounded-lg font-semibold shadow-md hover:bg-[#3882d7] hover:text-white transition-all duration-200 ease-in-out"
                    >
                      MORE IMAGE
                    </button>
                  </td>
                  <td className="py-3 px-4 border-b">
                    <button
                      onClick={() => openDeleteModal(review.id)}
                      className="px-4 py-2 bg-[#FF6347] text-white border-2 border-[#FF6347] rounded-lg font-semibold shadow-md hover:bg-[#CD1818] hover:border-[#CD1818] transition-all duration-200 ease-in-out"
                    >
                      REMOVE
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Inline Confirmation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-md">
            <h2 className="text-lg font-semibold mb-4">Confirm Action</h2>
            <p className="text-gray-700 mb-6">Are you sure you want to delete this review?</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
            <div className="flex justify-center items-center my-4 space-x-4">
        <button
          onClick={handlePreviousPage}
          disabled={page === 1}
          className={`px-2 py-2 rounded-xl transition ${
            page === 1
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
          className={`px-2 py-2 rounded-xl transition ${
            !hasNextPage
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-[#27a6ea] border-2 border-[#27a6ea] text-white hover:bg-[#ffffff] hover:text-[#27a6ea] hover:border-2 hover:border-[#27a6ea]"
          }`}
        >
          Next ▶
        </button>
      </div>
    </>
  );
}
