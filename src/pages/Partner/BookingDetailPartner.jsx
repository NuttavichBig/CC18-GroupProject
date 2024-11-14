import axios from "axios";
import React, { useEffect, useState } from "react";
import useUserStore from "../../stores/user-store";

const API = import.meta.env.VITE_API;

export default function BookingDetailPartner() {
  const token = useUserStore(state => state.token);
  const [partnerList, setPartnerList] = useState([]);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const itemsPerPage = 10;

  useEffect(() => {
    getList();
  }, [page]);

  const getList = async () => {
    const result = await axios(`${API}/booking?page=${page}&limit=${itemsPerPage}&orderBy=desc&sortBy=createdAt`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    setPartnerList(result.data.data);
    setHasNextPage(result.data.data.length === itemsPerPage);
  }
  
  const handleNextPage = () => {
    if (hasNextPage) setPage(page + 1);
  };
  const handlePreviousPage = () => {
    if (page > 1) setPage(page - 1);
  };

  return (
    <div className="w-full text-[#543310] text-sm">
      <p className="bg-orange-400 text-3xl font-bold rounded-lg p-4 text-center text-white shadow-md">
        BOOKING
      </p>
      <div className="overflow-x-auto mt-6 shadow-lg rounded-lg border border-gray-200">
        <table className="min-w-full bg-white rounded-lg ">
          <thead>
            <tr className="bg-orange-400 text-white">
              {[ "UUID", "NAME", "EMAIL", "PHONE", "USERNAME", "CHECK-IN", "CHECK-OUT", "TOTAL PRICE", "STATUS"].map((heading, index) => (
                <th key={index} className="py-3 px-2 font-semibold uppercase tracking-wider text-sm border-b border-orange-300">
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {partnerList.map((item, index) => (
              <tr key={index} className="odd:bg-orange-200 even:bg-orange-100">
                <td className="py-3 px-1 text-center border-b border-orange-300 text-gray-800">{item?.UUID}</td>
                <td className="py-3 px-1 text-center border-b border-orange-300 text-gray-800">{`${item?.firstName} ${item?.lastName}`}</td>
                <td className="py-3 px-1 text-center border-b border-orange-300 text-gray-800">{item?.email}</td>
                <td className="py-3 px-1 text-center border-b border-orange-300 text-gray-800">{item?.phone}</td>
                <td className="py-3 px-1 text-center border-b border-orange-300 text-gray-800">{item?.users?.email || '-'}</td>
                <td className="py-3 px-1 text-center border-b border-orange-300 text-gray-800">{item?.checkinDate.slice(0, 10)}</td>
                <td className="py-3 px-1 text-center border-b border-orange-300 text-gray-800">{item?.checkoutDate.slice(0, 10)}</td>
                <td className="py-3 px-1 text-center border-b border-orange-300 text-gray-800">{item?.totalPrice}</td>
                <td className="py-3 px-1 text-center border-b border-orange-300 text-gray-800">{item?.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {(partnerList.length === itemsPerPage || page > 1) && (
        <div className="flex justify-center items-center my-4 space-x-4">
          <button
            onClick={handlePreviousPage}
            disabled={page === 1}
            className={`px-2 py-2 rounded-xl transition ${
              page === 1
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-orange-400 border-2 border-orange-400 text-white hover:bg-[#ffffff] hover:text-orange-400 hover:border-2 hover:border-orange-400"
            }`}
          >
            ◀ Previous
          </button>

          <span className="text-lg font-semibold">Page {page}</span>

          <button
            onClick={handleNextPage}
            disabled={!hasNextPage}
            className={`px-2 py-2 rounded-xl transition ${
              !hasNextPage
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-orange-400 border-2 border-orange-400 text-white hover:bg-[#ffffff] hover:text-orange-400 hover:border-2 hover:border-orange-400"
            }`}
          >
            Next ▶
          </button>
        </div>
      )}
    </div>
  );
}
