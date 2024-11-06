import React, { useState } from "react";
import DetailHotel from "../../Components/Admin/DetailHotel";

export default function HotelDetailAdmin() {
  const [hotelDetail, setHotelDetail] = useState(false);

  return (
    <>
      {hotelDetail && <DetailHotel setHotelDetail={setHotelDetail} />}
      <div className="w-full text-[#543310]">
        <p className="bg-[#AF8F6F] text-3xl font-bold rounded-lg p-2 text-center shadow-lg">
          HOTEL INFORMATION
        </p>
        <table className=" text-center w-full mt-4 border-collapse">
          <thead>
            <tr className="bg-[#AF8F6F]">
              <th className="border-collapse border p-2">ID</th>
              <th className="border-collapse border p-2">PARTNER NAME</th>
              <th className="border-collapse border p-2">BANK NAME</th>
              <th className="border-collapse border p-2">BANK NO.</th>
              <th className="border-collapse border p-2">TAX NO.</th>
              <th className="border-collapse border p-2">ADDRESS</th>
              <th className="border-collapse border p-2">STATUS</th>
              <th className="border-collapse border p-2">MORE DETAIL</th>
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
                <select name="" id="" className="bg-[#F8F4E1]">
                  <option value="">ACTIVE</option>
                  <option value="">INACTIVE</option>
                </select>
              </td>
              <td className="border-collapse border p-2">
                <button
                  onClick={() => {
                    setHotelDetail(true);
                  }}
                  className="p-1 rounded-lg border-2 bg-[#F8F4E1] border-[#543310] text-[#543310] font-semibold shadow-lg hover:bg-[#543310] hover:text-white transition-all duration-100 ease-in-out"
                >
                  MORE DETAIL
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
