import React, { useState } from 'react';
import axios from 'axios';
import useUserStore from '../../stores/user-store'
import Swal from "sweetalert2";
import FormErrorAlert from '../../assets/ErrorToast1.gif'
import FormSuccessAlert from '../../assets/SuccessToast.gif'

const API = import.meta.env.VITE_API

function ReviewModal({ hotelName, hotelImage, onClose, onSubmit, bookingId, getAllBooking }) {
  const token = useUserStore(state => state.token)
  const [input, setInput] = useState({
    reviewText: '',
    rating: 0,
    file: null
  })

  const handleImageUpload = (event) => {
    setInput(prv => ({ ...prv, file: event.target.files[0] }))
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('content', input.reviewText);
    formData.append('rating', input.rating);
    formData.append('bookingId', bookingId)
    if (input.file) {
      formData.append(`img`, input.file);
    }

    try {
      await axios.post(`${API}/review`, formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      onSubmit();
      getAllBooking();
      onClose();
      //alert success
      Swal.fire({
        html: `<div class="flex items-center gap-2">
           <img src="${FormSuccessAlert}" alt="Error Animation" class="w-10 h-10" />
           <span style="font-size: 16px; font-weight: bold; color: green;">Review Success</span>
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
      console.error('Error submitting review:', error);
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
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="bg-[#fef6e4] p-6 rounded-lg shadow-lg max-w-md w-full relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl">×</button>

        <div className="flex items-center space-x-4 mb-4">
          <img src={hotelImage} alt={hotelName} className="w-24 h-24 rounded-lg object-cover" />
          <h2 className="text-2xl font-semibold text-gray-800">{hotelName}</h2>
        </div>

        <div className="flex justify-between items-center mb-4">
          <p className="text-lg font-medium text-gray-700">Review</p>
          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, index) => (
              <span
                key={index}
                className={`text-xl cursor-pointer ${index < input.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                onClick={() => setInput(prv => ({ ...prv, rating: index + 1 }))}
              >
                ★
              </span>
            ))}
          </div>
        </div>

        <textarea
          className="w-full p-4 h-32 bg-[#fef0d6] rounded-md mb-4 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
          placeholder="Write your review here..."
          value={input.reviewText}
          onChange={(e) => setInput(prv => ({ ...prv, reviewText: e.target.value }))}
        />

        <div className="flex flex-wrap gap-4 mb-4 max-w-full">
          {input.file &&
            <img src={URL.createObjectURL(input.file)} alt={`Upload`} className="w-20 h-20 rounded-md object-cover shadow-sm" />

          }

        </div>

        <div className="flex justify-between mt-6">
          <label className="inline-flex items-center px-4 py-2 bg-[#fef0d6] rounded-md shadow-sm text-orange-500 cursor-pointer hover:bg-[#fcd2a8] transition duration-150">
            Add image
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              className="hidden"
            />
          </label>
          <button
            onClick={handleSubmit}
            className="bg-orange-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-orange-600 transition duration-150"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}

export default ReviewModal;
