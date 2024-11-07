import React, { useState } from "react";
import ReviewPartner from "../../Components/Partner/ReviewPartner";

export default function ReviewDetailPartner() {
  const [reviewsPartner, setReviewsPartner] = useState(false);
  return (
    <>
      {reviewsPartner && (
        <ReviewPartner setReviewsPartner={setReviewsPartner} />
      )}
      <div className="w-full text-[#543310]">
        <p className="bg-[#AF8F6F] text-3xl font-bold rounded-lg p-2 text-center  shadow-lg">
          REVIEWS
        </p>
        <table className=" text-center w-full mt-4 border-collapse">
          <thead>
            <tr className="bg-[#AF8F6F]">
              <th className="border-collapse border p-2">ID</th>
              <th className="border-collapse border p-2">CONTENT</th>
              <th className="border-collapse border p-2">USERNAME</th>
              <th className="border-collapse border p-2">BOOKING NO.</th>
              <th className="border-collapse border p-2">RATING</th>
              <th className="border-collapse border p-2">MORE IMAGE</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-[#F8F4E1]">
              <td className="border-collapse border p-2"></td>
              <td className="border-collapse border p-2"></td>
              <td className="border-collapse border p-2"></td>
              <td className="border-collapse border p-2"></td>
              <td className="border-collapse border p-2"></td>
              <td className="border-collapse border p-2">
                <button
                  onClick={() => {
                    setReviewsPartner(true);
                  }}
                  className="p-1 rounded-lg border-2 bg-[#F8F4E1] border-[#543310] text-[#543310] font-semibold shadow-lg hover:bg-[#543310] hover:text-white transition-all duration-100 ease-in-out"
                >
                  MORE IMAGE
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
