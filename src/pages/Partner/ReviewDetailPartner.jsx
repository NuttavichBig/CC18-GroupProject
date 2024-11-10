import React, { useEffect, useState } from "react";
import axios from "axios";
import usePartnerStore from "../../stores/partner-store";
const API = import.meta.env.VITE_API

export default function ReviewDetailPartner() {
  const [reviewsPartner, setReviewsPartner] = useState(false);
  const hotel = usePartnerStore(state=>state.hotel)

  const [reviews , setReviews] = useState([])

  useEffect(()=>{
    getAllReview()
  },[])


  const getAllReview = async()=>{
    const result = await axios.get(`${API}/hotel/${hotel.id}`)
    console.log(result.data)
      setReviews(result.data.reviews)
    
  }
  
  return (
    <>
      <div className="w-full text-[#543310]">
        <p className="bg-[#AF8F6F] text-3xl font-bold rounded-lg p-2 text-center  shadow-lg">
          REVIEWS
        </p>
        <table className=" text-center w-full mt-4 border-collapse">
          <thead>
            <tr className="bg-[#AF8F6F]">
              <th className="border-collapse border p-2">No</th>
              <th className="border-collapse border p-2">BOOKING ID</th>
              <th className="border-collapse border p-2">RATING</th>
              <th className="border-collapse border p-2">IMAGE</th>
              <th className="border-collapse border p-2">CONTENT</th>
              <th className="border-collapse border p-2">CREATE</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((item,index)=>
            <tr key={index} className="bg-[#F8F4E1]">
              <td className="border-collapse border p-2">{index+1}</td>
              <td className="border-collapse border p-2">{item.bookingId}</td>
              <td className="border-collapse border p-2">{item.rating}</td>
              <td className="border-collapse border p-2"><img src={item.img} alt={`review ${item.id} image`}/></td>
              <td className="border-collapse border p-2">{item.content}</td>
              <td className="border-collapse border p-2">{item.createdAt.split('',10)}</td>
            </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
