import React, { useState } from "react";

export default function HotelPartner() {
  return (
    <>
      <div className="w-full text-[#543310]">
        <p className="bg-[#AF8F6F] text-3xl font-bold rounded-lg p-2 text-center  shadow-lg">
          ROOM
        </p>
        <table className=" text-center w-full mt-4 border-collapse">
          <thead>
            <tr className="bg-[#AF8F6F]">
              <th className="border-collapse border p-2">ID</th>
              <th className="border-collapse border p-2">NAME</th>
              <th className="border-collapse border p-2">DETAIL</th>
              <th className="border-collapse border p-2">TYPE</th>
              <th className="border-collapse border p-2">PRICE</th>
              <th className="border-collapse border p-2">FACILITY & SIZE</th>
              <th className="border-collapse border p-2">AMOUNT</th>
              <th className="border-collapse border p-2">STATUS</th>
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
              <td className="border-collapse border p-2">
                <select name="" id="" className="bg-[#F8F4E1]">
                  <option value="">AVAILABLE</option>
                  <option value="">UNAVAILABLE</option>
                </select>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
