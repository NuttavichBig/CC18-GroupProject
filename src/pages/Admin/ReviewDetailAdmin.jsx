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
  const token = useUserStore((state) => state.token);
  const API = import.meta.env.VITE_API;
 const [index ,setIndex] = useState(null)
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`${API}/review`, {
          params: { page: 1, limit: 10 },
          headers: { Authorization: `Bearer ${token}` },
        });
        setReviews(response.data.data);
      } catch (error) {
        console.log("Error fetching reviews:", error);
      }
    };
    fetchReviews();
  }, [API, token]);
  console.log(reviews)

  const handleDelete = async (reviewId) => {
    try {
      await axios.delete(`${API}/review/${reviewId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setReviews((prevReviews) => prevReviews.filter((review) => review.id !== reviewId));

      //alert success
      Swal.fire({
        html: `<div class="flex items-center gap-2">
           <img src="${FormSuccessAlert}" alt="Error Animation" class="w-10 h-10" />
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
          if (progressBar) {
            progressBar.style.backgroundColor = "green";
          }
          toast.addEventListener("click", Swal.close);
        },
      });
    } catch (error) {
      const errMsg = error.response?.data?.message || error.message;
      console.log("Error deleting review:", error);
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
                      onClick={() => handleDelete(review.id)}
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
    </>
  );
}
