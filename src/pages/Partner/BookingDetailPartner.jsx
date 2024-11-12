import axios from "axios";
import React, { useEffect, useState } from "react";
import useUserStore from "../../stores/user-store";

const API = import.meta.env.VITE_API;

export default function BookingDetailPartner() {
  const token = useUserStore(state => state.token);
  const [partnerList, setPartnerList] = useState([]);

  useEffect(() => {
    getList();
  }, []);

  const getList = async () => {
    const result = await axios(`${API}/booking?limit=20&orderBy=desc&sortBy=createdAt`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    setPartnerList(result.data.data);
  }

  return (
    <div className="w-full text-[#543310]">
      <p className="bg-orange-400 text-3xl font-bold rounded-lg p-4 text-center text-white shadow-md">
        BOOKING
      </p>
      <div className="overflow-x-auto mt-6 shadow-lg rounded-lg border border-gray-200">
        <table className="min-w-full bg-white rounded-lg">
          <thead>
            <tr className="bg-orange-400 text-white">
              {["ID", "UUID", "NAME", "EMAIL", "PHONE", "USERNAME", "HOTEL", "CHECK-IN", "CHECK-OUT", "TOTAL PRICE", "STATUS"].map((heading, index) => (
                <th key={index} className="py-3 px-6 font-semibold uppercase tracking-wider text-sm border-b border-orange-300">
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {partnerList.map((item, index) => (
              <tr key={index} className="odd:bg-orange-200 even:bg-orange-100">
                <td className="py-3 px-6 border-b border-orange-300 text-gray-800">{item?.id}</td>
                <td className="py-3 px-6 border-b border-orange-300 text-gray-800">{item?.UUID}</td>
                <td className="py-3 px-6 border-b border-orange-300 text-gray-800">{`${item?.firstName} ${item?.lastName}`}</td>
                <td className="py-3 px-6 border-b border-orange-300 text-gray-800">{item?.email}</td>
                <td className="py-3 px-6 border-b border-orange-300 text-gray-800">{item?.phone}</td>
                <td className="py-3 px-6 border-b border-orange-300 text-gray-800">{item?.users?.email || '-'}</td>
                <td className="py-3 px-6 border-b border-orange-300 text-gray-800">{item?.hotels?.name}</td>
                <td className="py-3 px-6 border-b border-orange-300 text-gray-800">{item?.checkinDate.slice(0, 10)}</td>
                <td className="py-3 px-6 border-b border-orange-300 text-gray-800">{item?.checkoutDate.slice(0, 10)}</td>
                <td className="py-3 px-6 border-b border-orange-300 text-gray-800">{item?.totalPrice}</td>
                <td className="py-3 px-6 border-b border-orange-300 text-gray-800">{item?.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
