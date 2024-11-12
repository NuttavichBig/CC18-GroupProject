import React from "react";
export default function ReviewImage({ reviewsData,setReviewDetail }) {
  console.log('set review img',reviewsData);
  return (
    <>
      <div
        onClick={() => setReviewDetail(false)}
        className="flex items-center justify-center fixed inset-0 bg-[#cad2d66d] z-50 text-[#0088d1]"
      >
        <div
          className="bg-white rounded-xl shadow-xl p-8 relative"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={() => setReviewDetail(false)}
            className="absolute top-4 right-4 text-3xl font-semibold bg-transparent border-none cursor-pointer"
          >
            &times;
          </button>
          <div className="bg-sky-50 rounded-lg p-4 flex shadow-lg">
            <img
              src={reviewsData?.img}
              alt="Hotel Room"
              className="w-[300px] h-[200px] rounded-lg"
            />
          </div>
        </div>
      </div>
    </>
  );
}
