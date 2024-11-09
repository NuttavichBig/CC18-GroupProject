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
        console.log("Error fetching users:", error);
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
        prev.map((partner) =>
          partner.id === partnerId ? { ...partner, ...updatedData } : partner
        )
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
        <p className="bg-[#AF8F6F] text-3xl font-bold rounded-lg p-2 text-center shadow-lg ">
          HOTEL INFORMATION
        </p>
        <table className="text-center w-full mt-4 border-collapse border-2 border-[#543310]">
          <thead>
            <tr className="bg-[#AF8F6F]">
              <th className="border-2 border-[#543310] p-2">ID</th>
              <th className="border-2 border-[#543310] p-2">PARTNER NAME</th>
              <th className="border-2 border-[#543310] p-2">BANK NAME</th>
              <th className="border-2 border-[#543310] p-2">BANK NO.</th>
              <th className="border-2 border-[#543310] p-2">TAX NO.</th>
              <th className="border-2 border-[#543310] p-2">ADDRESS</th>
              <th className="border-2 border-[#543310] p-2">STATUS</th>
              <th className="border-2 border-[#543310] p-2">MORE DETAIL</th>
            </tr>
          </thead>
          <tbody>
            {partners.map((partner) => (
              <tr key={partner.id} className="bg-[#F8F4E1] text-[#543310]">
                <td className="border-2 border-[#543310] p-2">{partner.id}</td>
                <td className="border-2 border-[#543310] p-2">
                  {partner.companyName}
                </td>
                <td className="border-2 border-[#543310] p-2">
                  {partner.bankName}
                </td>
                <td className="border-2 border-[#543310] p-2">
                  {partner.bankAccount}
                </td>
                <td className="border-2 border-[#543310] p-2">
                  {partner.taxNo}
                </td>
                <td className="border-2 border-[#543310] p-2">
                  {partner.address}
                </td>
                <td className="border-2 border-[#543310] p-2">
                  <select
                    value={partner.status}
                    onChange={(e) =>
                      handleUpdate(partner.id, { status: e.target.value })
                    }
                    className="p-1 rounded border border-[#543310] bg-[#F8F4E1] text-[#543310]"
                  >
                    <option value="PENDING">PENDING</option>
                    <option value="ACTIVE">ACTIVE</option>
                    <option value="INACTIVE">INACTIVE</option>
                    <option value="BANNED">BANNED</option>
                  </select>
                </td>
                <td className="border-2 border-[#543310] p-2">
                  <button
                    onClick={() => {
                      setHotelDetail(partner.hotels);
                    }}
                    className="p-1 rounded border-2 bg-[#F8F4E1] border-[#543310] text-[#543310] shadow-lg hover:bg-[#543310] hover:text-white transition-all duration-100 ease-in-out"
                  >
                    DETAIL
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
