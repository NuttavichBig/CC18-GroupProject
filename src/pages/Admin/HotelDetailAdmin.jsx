import React, { useEffect, useState } from "react";
import axios from "axios";
import DetailHotel from "../../Components/Admin/DetailHotel";
import useUserStore from "../../stores/user-store";
import Swal from "sweetalert2";
import FormErrorAlert from '../../assets/ErrorToast1.gif'
import FormSuccessAlert from '../../assets/SuccessToast.gif'


export default function HotelDetailAdmin() {
  const [hotelDetail, setHotelDetail] = useState(null);
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const token = useUserStore((state) => state.token);
  const API = import.meta.env.VITE_API;

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const response = await axios.get(`${API}/admin/partner?page=${page}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPartners(response.data);
      } catch (error) {
        console.log("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPartners();
  }, [API, token, page]);

  const handleUpdate = async (partnerId, updatedData) => {
    try {
      await axios.patch(`${API}/admin/partner/${partnerId}`, updatedData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPartners((prev) =>
        prev.map((partner) => (partner.id === partnerId ? { ...partner, ...updatedData } : partner))
      );
      //alert success
      Swal.fire({
        html: `<div class="flex items-center gap-2">
           <img src="${FormSuccessAlert}" alt="Error Animation" class="w-10 h-10" />
           <span style="font-size: 16px; font-weight: bold; color: green;">Update Status Success</span>
         </div>`,
        position: "top-end",
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false,
        toast: true,
        background: "#ffffff",
        didOpen: (toast) => {
          const progressBar = toast.querySelector(".swal2-timer-progress-bar");
          if (progressBar) {
            progressBar.style.backgroundColor = "green";
          }
          toast.addEventListener("click", Swal.close);
        },
      });
    } catch (error) {
      const errMsg = error.response?.data?.message || error.message;
      console.error("Error updating user:", error);
      //alert error
      Swal.fire({
        html: `<div class="flex items-center gap-2">
           <img src="${FormErrorAlert}" alt="Error Animation" class="w-10 h-10" />
           <span style="font-size: 16px; font-weight: bold; color: red;">${errMsg}</span>
         </div>`,
        position: "top-end",
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false,
        toast: true,
        background: "#ffffff",
        didOpen: (toast) => {
          const progressBar = toast.querySelector(".swal2-timer-progress-bar");
          if (progressBar) {
            progressBar.style.backgroundColor = "#f44336";
          }
          toast.addEventListener("click", Swal.close);
        },
      });
    }
  };

  if (loading) return <p className="text-center text-xl">Loading...</p>;

  return (
    <>
      {hotelDetail && (
        <DetailHotel hotelData={hotelDetail} setHotelDetail={setHotelDetail} />
      )}
      <div className="w-full bg-gray-50 py-6 px-4">
        <p className="bg-gradient-to-r from-[#0088d1] to-[#1E4D8C] text-3xl font-bold rounded-lg p-3 text-center shadow-lg text-white">
          HOTEL INFORMATION
        </p>
        <div className="flex justify-end my-4">
        <button onClick={() => setPage(page - 1)}>◀</button>
        <button onClick={() => setPage(page + 1)}>▶</button>
        </div>
        <div className="overflow-x-auto mt-6 bg-white rounded-lg shadow-lg">
          <table className="min-w-full text-sm text-gray-600 border-collapse">
            <thead className="bg-[#0088d1] text-white">
              <tr>
                <th className="py-3 px-4 border-b">ID</th>
                <th className="py-3 px-4 border-b">PARTNER NAME</th>
                <th className="py-3 px-4 border-b">BANK NAME</th>
                <th className="py-3 px-4 border-b">BANK NO.</th>
                <th className="py-3 px-4 border-b">TAX NO.</th>
                <th className="py-3 px-4 border-b">ADDRESS</th>
                <th className="py-3 px-4 border-b">STATUS</th>
                <th className="py-3 px-4 border-b">MORE DETAIL</th>
              </tr>
            </thead>
            <tbody>
              {partners.map((partner) => (
                <tr key={partner.id} className="hover:bg-gray-50 transition duration-200 ease-in-out">
                  <td className="py-3 px-4 border-b">{partner.id}</td>
                  <td className="py-3 px-4 border-b">{partner.companyName}</td>
                  <td className="py-3 px-4 border-b">{partner.bankName}</td>
                  <td className="py-3 px-4 border-b">{partner.bankAccount}</td>
                  <td className="py-3 px-4 border-b">{partner.taxNo}</td>
                  <td className="py-3 px-4 border-b">{partner.address}</td>
                  <td className="py-3 px-4 border-b">
                    <select
                      value={partner.status}
                      onChange={(e) =>
                        handleUpdate(partner.id, { status: e.target.value })
                      }
                      className="w-full bg-gray-100 border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="PENDING">PENDING</option>
                      <option value="ACTIVE">ACTIVE</option>
                      <option value="INACTIVE">INACTIVE</option>
                      <option value="BANNED">BANNED</option>
                    </select>
                  </td>
                  <td className="py-3 px-4 border-b">
                    <button
                      onClick={() => {
                        setHotelDetail(partner.hotels);
                      }}
                      className="px-2 py-2 bg-[#8ed0ff] text-[#0c1b48] border-2 border-[#0c1b48] rounded-lg font-semibold shadow-md hover:bg-[#3882d7] hover:text-white transition duration-200 ease-in-out"
                    >
                      MORE DETAIL
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
