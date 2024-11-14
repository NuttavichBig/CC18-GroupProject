import React from 'react';

const ReviewsComponent = ({ reviews }) => {
  const averageRating = reviews.length
    ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)
    : 'No Ratings';

  // Function to censor first name
  const censorName = (name) => {
    if (name.length <= 2) return name; // No need to censor if name is too short
    return name[0] + '*'.repeat(name.length - 2) + name[name.length - 1];
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-md h-[550px] overflow-hidden overflow-y-auto">
      <div className="text-lg font-semibold mb-4 flex items-center justify-between ">
        <div>Reviews</div>
        <div className="bg-gradient-to-r from-[#f08a4b] to-[#e05b3c] p-2 rounded-lg text-white">
          {averageRating}
        </div>
      </div>
      <div className="space-y-6">
        {reviews.map((review, index) => (
          <div key={index} className="bg-[#fef6e4] p-4 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <div className="text-base text-gray-700 font-bold">
                {censorName(review.user.firstName)}
              </div>
              <div className="flex">
                <span className="text-yellow-500">{'★'.repeat(review.rating)}</span>
                <span className="text-gray-300">{'★'.repeat(5 - review.rating)}</span>
              </div>
            </div>
            <div className="text-gray-800 font-medium mb-2 ml-5 p-1 break-words">{review.content}</div>
            {review.img && (
              <img
                src={review.img}
                alt="Review"
                className="w-32 h-32 object-cover rounded-lg mt-2 text-left ml-5"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewsComponent;
