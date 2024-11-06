import React from "react";

export default function BookingDetailAdmin() {
  return (
    <>
      <div className="w-full text-[#543310] ">
        <p className="bg-[#AF8F6F] text-3xl font-bold rounded-lg p-2 text-center shadow-lg">
          BOOKING INFORMATION
        </p>
        <table className=" text-center w-full mt-4 border-collapse">
          <thead>
            <tr className="bg-[#AF8F6F]">
              <th className="border-collapse border p-2">ID</th>
              <th className="border-collapse border p-2">GUEST NAME</th>
              <th className="border-collapse border p-2">HOTEL NAME</th>
              <th className="border-collapse border p-2">CHECK-IN DATE</th>
              <th className="border-collapse border p-2">CHECK-OUT DATE</th>
              <th className="border-collapse border p-2">PROMOTION</th>
              <th className="border-collapse border p-2">TOTAL PRICE</th>
              <th className="border-collapse border p-2">PAYMENT STATUS</th>
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
              <td className="border-collapse border p-2"></td>
              <td className="border-collapse border p-2"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
