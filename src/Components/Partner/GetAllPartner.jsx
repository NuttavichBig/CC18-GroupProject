import React, { useEffect, useState } from "react";
import axios from "axios";
import useUserStore from "../../stores/user-store"

export default function UserDetailAdmin() {
  const [partners, setPartners] = useState([]);
  console.log("partners", partners);
  const [loading, setLoading] = useState(true);
  const token = useUserStore((state) => state.token);
  const API = import.meta.env.VITE_API;

  // Fetch users when the component mounts
  useEffect(() => {
    async function fetchPartners() {
      try {
        const response = await axios.get(`${API}/admin/partner`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("Response Data:", response.data);
        setPartners(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchPartners();
  }, [API, token]);

  // Handle user role or status update
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
    <div className="w-full text-[#ffffff] ">
      <div>
      <p className="bg-[#AF8F6F] text-3xl font-bold rounded-lg p-2 text-center shadow-lg">
        PARTNER INFORMATION
      </p>
      <table className="text-center w-full mt-4 border-collapse">
        <thead>
          <tr className="bg-[#AF8F6F]">
            {/* Column Headers */}
            <th>ID</th>
            <th>COMPANY</th>
            <th>ADDRESS</th>
            <th>BANK ACCOUNT</th>
            <th>BANKNAME</th>
            <th>TAX NO.</th>
            <th>STATUS</th>
            <th>ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {partners.map((partner) => (
            <tr key={partner.id} className="bg-[#AF8F6F]">
              <td>{partner.id}</td>
              <td>{partner.companyName}</td>
              <td>{partner.address}</td>
              <td>{partner.bankAccount}</td>
              <td>{partner.bankName}</td>
              <td>{partner.taxNo}</td>
              <td>
                <select
                  value={partner.status}
                  onChange={(e) => handleUpdate(partner.id, { status: e.target.value })}
                  className="bg-[#AF8F6F]"
                >
                  <option value="PENDING">PENDING</option>
                  <option value="ACTIVE">ACTIVE</option>
                  <option value="INACTIVE">INACTIVE</option>
                  <option value="BANNED">BANNED</option>
                </select>
              </td>
              <td>
                <button onClick={() => handleDelete(user.id)} className="text-red-500">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>

    </div>
  );
}
