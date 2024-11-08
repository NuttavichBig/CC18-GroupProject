import React, { useEffect, useState } from "react"; 
import CreatePromotion from "../../Components/Admin/CreatePromotion";
import EditPromotion from "../../Components/Admin/EditPromotion ";
import axios from "axios";
import useUserStore from "../../stores/user-store";

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
    fetchPromotions();
  }, []);

  const fetchPromotions = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API}/promotion`);
      setPromotions(response.data.promotion || []);
    } catch (error) {
      console.error("Error fetching promotions:", error);
    } finally {
      setLoading(false);
    }
  };


  const handleRemove = async (promotionId) => {
    try {
      await axios.delete(`${API}/admin/promotion/${promotionId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPromotions((prev) => prev.filter((promo) => promo.id !== promotionId));
      alert("Promotion deleted successfully!");
    } catch (error) {
      console.error("Error deleting promotion:", error);
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

  return (
    <>
       {createPromotion && <CreatePromotion onCreateSuccess={fetchPromotions} onClose={() => setCreatePromotion(false)} />}
      {editPromotion && (
        <EditPromotion
          promotion={selectedPromotion}
          onSave={handleUpdatePromotion}
          onCancel={() => setEditPromotion(false)}
        />
      )}
      <div className="w-full text-[#543310]">
        <p className="bg-[#AF8F6F] text-3xl font-bold rounded-lg p-2 text-center shadow-lg">
          PROMOTION
        </p>
        <div className="flex justify-end my-2">
          <button
            onClick={() => setCreatePromotion(true)}
            className="p-2 rounded-lg border-2 bg-[#F8F4E1] border-[#543310] text-[#543310] font-semibold shadow-lg hover:bg-[#543310] hover:text-white transition-all duration-100 ease-in-out"
          >
            CREATE PROMOTION
          </button>
        </div>
        {loading ? (
          <p>Loading promotions...</p>
        ) : (
          <div className="space-y-4">
            {promotions.map((promotion) => (
              <div key={promotion.id} className="bg-[#F8F4E1] rounded-lg p-4 flex shadow-lg">
                <img
                  src={promotion.img}
                  alt="Hotel Room"
                  className="w-[300px] h-[200px] rounded-lg"
                />
                <div className="flex flex-col gap-4 px-4">
                  <p className="mb-4 text-3xl">{promotion.name}</p>
                  <p>Promotion Detail: {promotion.description}</p>
                  <p>
                    Duration: {formatDate(promotion.startDate)} -{" "}
                    {formatDate(promotion.endDate)}
                  </p>
                  <p>Usage limit: {promotion.usageLimit}</p>
                  <p className="text-3xl">Promotion Code: {promotion.code}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleEditClick(promotion)}
                    className="rounded-lg p-1 border-2 border-[#CD1818] bg-[#F8F4E1] text-[#CD1818] font-semibold shadow-lg hover:bg-[#CD1818] hover:text-white transition-all duration-100 ease-in-out"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleRemove(promotion.id)}
                    className="rounded-lg p-1 border-2 border-[#CD1818] bg-[#F8F4E1] text-[#CD1818] font-semibold shadow-lg hover:bg-[#CD1818] hover:text-white transition-all duration-100 ease-in-out"
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
