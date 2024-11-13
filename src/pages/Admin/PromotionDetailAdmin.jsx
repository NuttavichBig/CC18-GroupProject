import React, { useEffect, useState } from "react";
import CreatePromotion from "../../Components/Admin/CreatePromotion";
import EditPromotion from "../../Components/Admin/EditPromotion ";
import axios from "axios";
import useUserStore from "../../stores/user-store";
import Swal from "sweetalert2";
import FormErrorAlert from '../../assets/ErrorToast1.gif'
import FormSuccessAlert from '../../assets/SuccessToast.gif'


export default function PromotionDetailAdmin() {
  const [promotions, setPromotions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [createPromotion, setCreatePromotion] = useState(false);
  const [editPromotion, setEditPromotion] = useState(false);
  const [selectedPromotion, setSelectedPromotion] = useState(null);
  const API = import.meta.env.VITE_API;
  const token = useUserStore((state) => state.token);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  useEffect(() => {
    const fetchPromotions = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${API}/promotion?limit=999`);
        setPromotions(response.data.promotion || []);
      } catch (error) {
        console.error("Error fetching promotions:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPromotions();
  }, [createPromotion, editPromotion]);

  const handleRemove = async (promotionId) => {
    try {
      await axios.delete(`${API}/admin/promotion/${promotionId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPromotions((prev) => prev.filter((promo) => promo.id !== promotionId));
      //alert success
      Swal.fire({
        html: `<div class="flex items-center gap-2">
           <img src="${FormSuccessAlert}" alt="Error Animation" class="w-10 h-10" />
           <span style="font-size: 16px; font-weight: bold; color: green;">Promotion deleted successfully</span>
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
      console.error("Error deleting promotion:", error);
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

  const handleEditClick = (promotion) => {
    setSelectedPromotion(promotion);
    setEditPromotion(true);
  };

  const handleUpdatePromotion = (updatedPromotion) => {
    setPromotions((prev) =>
      prev.map((promo) => (promo.id === updatedPromotion.id ? updatedPromotion : promo))
    );
    setEditPromotion(false);
  };

  const handleAddPromotion = (newPromotion) => {
    setCreatePromotion(false);
    setPromotions((prevPromotions) => [newPromotion, ...prevPromotions]);
  };



  return (
    <>
      {createPromotion && <CreatePromotion onCreateSuccess={handleAddPromotion} onClose={() => setCreatePromotion(false)} />}
      {editPromotion && (
        <EditPromotion
          promotion={selectedPromotion}
          onSave={handleUpdatePromotion}
          onCancel={() => setEditPromotion(false)}
        />
      )}
      <div className="w-full bg-gray-100 py-6 px-4">
        <p className="bg-gradient-to-r from-[#0088d1] to-[#1E4D8C] text-white text-3xl font-bold rounded-lg p-4 text-center shadow-xl">
          PROMOTIONS
        </p>
        <div className="flex justify-end my-4">
          <button
            onClick={() => setCreatePromotion(true)}
            className="px-6 py-2 bg-white text-[#0088d1] border-2 border-[#102149] rounded-lg font-semibold shadow-lg hover:bg-[#0088d1] hover:text-white hover:border-white transition-all duration-300 ease-in-out"
          >
            CREATE PROMOTION
          </button>
        </div>
        {loading ? (
          <p className="text-center text-lg">Loading promotions...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {promotions.map((promotion) => (
              <div key={promotion.id} className="bg-white rounded-lg p-6 flex flex-col shadow-xl">
                <img
                  src={promotion.img}
                  alt="Promotion Image"
                  className="w-full h-56 object-cover rounded-lg mb-4"
                />
                <div className="flex flex-col gap-2 mb-4">
                  <p className="text-2xl font-bold text-[#0088d1]">{promotion.name}</p>

                  <div className="space-y-1 border-b border-gray-200 pb-2">
                    <p className="text-sm text-gray-500 font-semibold">{promotion.description}</p>
                    <p className="text-sm text-gray-500 font-medium">
                      Duration: {formatDate(promotion.startDate)} - {formatDate(promotion.endDate)}
                    </p>
                    <p className="text-sm text-gray-500 font-medium">Usage Limit: {promotion.usageLimit}</p>
                  </div>
                  <p className="text-xl font-bold text-[#0088d1]">Promo Code: {promotion.code}</p>
                </div>

                <div className="flex justify-between mt-auto">
                  <button
                    onClick={() => handleEditClick(promotion)}
                    className="px-4 py-2 bg-white text-[#0088d1] border-2 border-[#0088d1] rounded-lg font-semibold shadow-lg hover:bg-[#0088d1] hover:border-black hover:text-white transition-all duration-200 ease-in-out"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleRemove(promotion.id)}
                    className="px-4 py-2 bg-[#FF6347] text-white border-2 border-[#FF6347] rounded-lg font-semibold shadow-lg hover:bg-[#CD1818] hover:border-[#CD1818] transition-all duration-200 ease-in-out"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}