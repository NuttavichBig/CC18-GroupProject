import React from "react";

export default function ReviewPartner({ setReviewsPartner }) {
  return (
    <>
      <div
        onClick={() => setReviewsPartner(false)}
        className="flex items-center justify-center fixed inset-0 bg-[#F2F7A140] z-50 text-[#543310]"
      >
        <div
          className="bg-[#FFF0D1] rounded-xl shadow-xl p-8 relative"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={() => setReviewsPartner(false)}
            className="absolute top-4 right-4 text-3xl font-semibold bg-transparent border-none cursor-pointer"
          >
            &times;
          </button>
          <div>IMAGE</div>
        </div>
      </div>
    </>
  );
}
