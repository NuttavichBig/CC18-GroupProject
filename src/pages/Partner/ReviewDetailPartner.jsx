import React from "react";

export default function ReviewDetailPartner() {
  return (
    <>
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
              <th className="border-collapse border p-2">HOTEL NAME</th>
              <th className="border-collapse border p-2">BOOKING NO.</th>
              <th className="border-collapse border p-2">RATING</th>
              <th className="border-collapse border p-2">MORE IMAGE</th>
              <th className="border-collapse border p-2">DELETE</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-[#F8F4E1]">
              <td className="border-collapse border p-2"></td>
              <td className="border-collapse border p-2"></td>
              <td className="border-collapse border p-2"></td>
              <td className="border-collapse border p-2"></td>
              <td className="border-collapse border p-2"></td>
              <td className="border-collapse border p-2"></td>
              <td className="border-collapse border p-2">
                <button
                  onClick={() => {
                    setReviewDetail(true);
                  }}
                  className="p-1 rounded-lg border-2 bg-[#F8F4E1] border-[#543310] text-[#543310] font-semibold shadow-lg hover:bg-[#543310] hover:text-white transition-all duration-100 ease-in-out"
                >
                  MORE IMAGE
                </button>
              </td>
              <td className="border-collapse border p-2">
                <div className="flex justify-center">
                  <button className=" rounded-lg p-1 border-2 border-[#CD1818] bg-[#F8F4E1] text-[#CD1818] font-semibold shadow-lg hover:bg-[#CD1818] hover:text-white transition-all duration-100 ease-in-out">
                    Remove
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
