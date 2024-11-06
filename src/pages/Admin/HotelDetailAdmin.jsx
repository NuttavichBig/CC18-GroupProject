// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import DetailHotel from "../../Components/Admin/DetailHotel";
// import useUserStore from "../../stores/user-store";

// export default function HotelDetailAdmin() {
//   const [hotelDetail, setHotelDetail] = useState(false);
//   const [partners, setPartners] = useState([]);
//   console.log("partners", partners);
//   const [loading, setLoading] = useState(true);
//   const token = useUserStore((state) => state.token);
//   const API = import.meta.env.VITE_API;

//   useEffect(()=>{
//     const fetchPartners = async () => {
//       try {
//         const response = await axios.get(`${API}/admin/partner`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         console.log("Response Data:", response.data);
//         setPartners(response.data);
//       } catch (error) {
//         console.error("Error fetching users:", error);
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetchPartners();
//   }, [API, token]);


//   const handleUpdate = async (partnerId, updatedData) => {
//     try {
//       await axios.patch(`${API}/admin/partner/${partnerId}`, updatedData, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setPartners((prev) =>
//         prev.map((partner) => (partner.id === partnerId ? { ...partner, ...updatedData } : partner))
//       );
//     } catch (error) {
//       console.error("Error updating user:", error);
//     }
//   }; 

//   if (loading) return <p>Loading...</p>;

//   return (
//     <>
//       {hotelDetail && <DetailHotel setHotelDetail={setHotelDetail} />}
//       <div className="w-full text-[#543310]">
//         <p className="bg-[#AF8F6F] text-3xl font-bold rounded-lg p-2 text-center shadow-lg">
//           HOTEL INFORMATION
//         </p>
//         <table className=" text-center w-full mt-4 border-collapse">
//           <thead>
//             <tr className="bg-[#AF8F6F]">
//               <th className="border-collapse border p-2">ID</th>
//               <th className="border-collapse border p-2">PARTNER NAME</th>
//               <th className="border-collapse border p-2">BANK NAME</th>
//               <th className="border-collapse border p-2">BANK NO.</th>
//               <th className="border-collapse border p-2">TAX NO.</th>
//               <th className="border-collapse border p-2">ADDRESS</th>
//               <th className="border-collapse border p-2">STATUS</th>
//               <th className="border-collapse border p-2">MORE DETAIL</th>
//             </tr>
//           </thead>
//           <tbody>
//           {partners.map((partner) => (
//             <tr key={partner.id} className="bg-[#AF8F6F]">
//               <td>{partner.id}</td>
//               <td>{partner.companyName}</td>
//               <td>{partner.address}</td>
//               <td>{partner.bankAccount}</td>
//               <td>{partner.bankName}</td>
//               <td>{partner.taxNo}</td>
//               <td>
//                 <select
//                   value={partner.status}
//                   onChange={(e) => handleUpdate(partner.id, { status: e.target.value })}
//                   className="bg-[#AF8F6F]"
//                 >
//                   <option value="PENDING">PENDING</option>
//                   <option value="ACTIVE">ACTIVE</option>
//                   <option value="INACTIVE">INACTIVE</option>
//                   <option value="BANNED">BANNED</option>
//                 </select>
//               </td>
//               <td className="border-collapse border p-2">
//                 <button
//                   onClick={() => {
//                     setHotelDetail(partner.hotel);
//                   }}
//                   className="p-1 rounded-lg border-2 bg-[#F8F4E1] border-[#543310] text-[#543310] font-semibold shadow-lg hover:bg-[#543310] hover:text-white transition-all duration-100 ease-in-out"
//                 >
//                   MORE DETAIL
//                 </button>
//               </td>
//             </tr>
//           ))}

//           </tbody>
//         </table>
//       </div>
//     </>
//   );
// }



import React, { useEffect, useState } from "react";
import axios from "axios";
import DetailHotel from "../../Components/Admin/DetailHotel";
import useUserStore from "../../stores/user-store";

export default function HotelDetailAdmin() {
  const [hotelDetail, setHotelDetail] = useState(null);
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = useUserStore((state) => state.token);
  const API = import.meta.env.VITE_API;

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const response = await axios.get(`${API}/admin/partner`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPartners(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPartners();
  }, [API, token]);

  const handleUpdate = async (partnerId, updatedData) => {
    try {
      await axios.patch(`${API}/admin/partner/${partnerId}`, updatedData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPartners((prev) =>
        prev.map((partner) => (partner.id === partnerId ? { ...partner, ...updatedData } : partner))
      );
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <>
      {hotelDetail && (
        <DetailHotel hotelData={hotelDetail} setHotelDetail={setHotelDetail} />
      )}
      <div className="w-full text-[#543310]">
        <p className="bg-[#AF8F6F] text-3xl font-bold rounded-lg p-2 text-center shadow-lg">
          HOTEL INFORMATION
        </p>
        <table className="text-center w-full mt-4 border-collapse">
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
            {partners.map((partner) => (
              <tr key={partner.id} className="bg-[#AF8F6F]">
                <td>{partner.id}</td>
                <td>{partner.companyName}</td>
                <td>{partner.bankName}</td>
                <td>{partner.bankAccount}</td>
                <td>{partner.taxNo}</td>
                <td>{partner.address}</td>
                <td>
                  <select
                    value={partner.status}
                    onChange={(e) =>
                      handleUpdate(partner.id, { status: e.target.value })
                    }
                    className="bg-[#AF8F6F]"
                  >
                    <option value="PENDING">PENDING</option>
                    <option value="ACTIVE">ACTIVE</option>
                    <option value="INACTIVE">INACTIVE</option>
                    <option value="BANNED">BANNED</option>
                  </select>
                </td>
                <td className="border-collapse border p-2">
                  <button
                    onClick={() => {
                      setHotelDetail(partner.hotel)
                    }}
                    className="p-1 rounded-lg border-2 bg-[#F8F4E1] border-[#543310] text-[#543310] font-semibold shadow-lg hover:bg-[#543310] hover:text-white transition-all duration-100 ease-in-out"
                  >
                    MORE DETAIL
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
