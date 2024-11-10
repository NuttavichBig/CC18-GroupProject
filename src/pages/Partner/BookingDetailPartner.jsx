import axios from "axios";
import React, { useEffect, useState } from "react";
import useUserStore from "../../stores/user-store";
const API = import.meta.env.VITE_API


export default function BookingDetailPartner() {
  const token = useUserStore(state => state.token)
  const [partnerList, setPartnerList] = useState([])


  useEffect(() => {
    getList()
  }, [])


  const getList = async () => {
    const result = await axios(`${API}/booking?limit=20&orderBy=desc&sortBy=createdAt`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    setPartnerList(result.data.data)
  }
  console.log(partnerList)
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
              <th className="border-collapse border p-2">UUID</th>
              <th className="border-collapse border p-2">NAME</th>
              <th className="border-collapse border p-2">EMAIL</th>
              <th className="border-collapse border p-2">PHONE</th>
              <th className="border-collapse border p-2">USERNAME</th>
              <th className="border-collapse border p-2">HOTEL</th>
              <th className="border-collapse border p-2">CHECK-IN</th>
              <th className="border-collapse border p-2">CHECK-OUT</th>
              <th className="border-collapse border p-2">TOTAL PRICE</th>
              <th className="border-collapse border p-2">STATUS</th>
            </tr>
          </thead>
            <tbody>
          {partnerList.map((item,index)=>
            <tr className="bg-[#F8F4E1]"  key={index}>
              <td className="border-collapse border p-2">{item?.id}</td>
              <td className="border-collapse border p-2">{item?.UUID}</td>
              <td className="border-collapse border p-2">{item?.firstName+' '+item?.lastName}</td>
              <td className="border-collapse border p-2">{item?.email}</td>
              <td className="border-collapse border p-2">{item?.phone}</td>
              <td className="border-collapse border p-2">{item?.users?.email || '-'}</td>
              <td className="border-collapse border p-2">{item?.hotels?.name}</td>
              <td className="border-collapse border p-2">{(item?.checkinDate.split('',10))}</td>
              <td className="border-collapse border p-2">{(item?.checkoutDate.split('',10))}</td>
              <td className="border-collapse border p-2">{item?.totalPrice}</td>
              <td className="border-collapse border p-2">{item?.status}</td>
            </tr>
          )}
          </tbody>
        </table>
      </div>
    </>
  );
}
