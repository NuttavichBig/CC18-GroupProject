import React, { useState } from 'react';
import axios from 'axios';

function ReviewModal({ hotelName, hotelImage, onClose, onSubmit }) {
  const [reviewText, setReviewText] = useState('');
  const [selectedImages, setSelectedImages] = useState([]);
  const [rating, setRating] = useState(0);

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    const images = files.map(file => URL.createObjectURL(file));
    setSelectedImages(prevImages => [...prevImages, ...images]);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('reviewText', reviewText);
    formData.append('rating', rating);
    selectedImages.forEach((image, index) => {
      formData.append(`images[${index}]`, image);
    });

    try {
      await axios.post('/api/reviews', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      onSubmit();
      onClose();
    } catch (error) {
      console.error('Error submitting review:', error);
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
                className={`text-xl cursor-pointer ${index < rating ? 'text-yellow-400' : 'text-gray-300'}`}
                onClick={() => setRating(index + 1)}
              >
                ★
              </span>
            ))}
          </div>
        </div>

        <textarea
          className="w-full p-4 h-32 bg-[#fef0d6] rounded-md mb-4 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
          placeholder="Write your review here..."
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
        />

        <div className="flex flex-wrap gap-4 mb-4 max-w-full">
          {selectedImages.map((src, index) => (
            <img key={index} src={src} alt={`Upload ${index}`} className="w-20 h-20 rounded-md object-cover shadow-sm" />
          ))}
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
