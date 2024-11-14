import React from 'react';

const ReviewsComponent = ({ reviews }) => {
  const averageRating = reviews.length
    ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)
    : 'No Ratings';

  return (
    <div className="bg-white rounded-lg p-6 shadow-md h-full">
      <div className="text-lg font-semibold mb-4 flex items-center justify-between ">
        <div>
          Reviews
        </div>
        <div className='bg-gradient-to-r from-[#f08a4b] to-[#e05b3c] p-2 rounded-lg text-white'>{averageRating}</div>
      </div>
      <div className="space-y-6">
        {reviews.map((review, index) => (
          <div key={index} className="bg-[#fef6e4] p-4 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-gray-700 font-bold">
                {review.user.firstName} {review.user.lastName}
              </div>
              <div className="flex">
                <span className="text-yellow-500">{'★'.repeat(review.rating)}</span>
                <span className="text-gray-300">{'★'.repeat(5 - review.rating)}</span>
              </div>
            </div>
            <div className="text-gray-800 font-medium mb-2">{review.content}</div>
            {review.img && (
              <img src={review.img} alt="Review" className="w-full h-40 object-cover rounded-lg mt-2" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewsComponent;
