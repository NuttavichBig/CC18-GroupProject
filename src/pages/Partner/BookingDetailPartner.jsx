import React from "react";

export default function BookingDetailPartner() {
  return (
    <>
      <div className="w-full text-[#543310]">
        <p className="bg-[#AF8F6F] text-3xl font-bold rounded-lg p-2 text-center  shadow-lg">
          BOOKING
        </p>
        <table className=" text-center w-full mt-4 border-collapse">
          <thead>
            <tr className="bg-[#AF8F6F]">
              <th className="border-collapse border p-2">ID</th>
              <th className="border-collapse border p-2">USERNAME</th>
              <th className="border-collapse border p-2">GUESTS AMOUNT</th>
              <th className="border-collapse border p-2">CHECK-IN</th>
              <th className="border-collapse border p-2">CHECK-OUT</th>
              <th className="border-collapse border p-2">PROMOTION</th>
              <th className="border-collapse border p-2">TOTAL PRICE</th>
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
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
