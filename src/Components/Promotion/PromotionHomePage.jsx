import axios from "axios";
import React, { useEffect, useState } from "react";
import PromotionModal from "../ModalOther/PromotionModal";
const API = import.meta.env.VITE_API;

function PromotionHomePage() {
  const [promotions, setPromotions] = useState([]);
  const [promotionCard, setPromotionCard] = useState(null);

  const getPromotion = async () => {
    try {
      const result = await axios.get(
        `${API}/promotion?limit=4&isActive=true&sortBy=discountPercent&orderBy=desc`
      );
      const { promotion } = result.data;
      if (promotion) {
        setPromotions(result.data.promotion);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getPromotion();
  }, []);

  return (
    <>
      {promotionCard && (
        <PromotionModal
          promo={promotionCard}
          onClose={() => setPromotionCard(null)}
        />
      )}
      <div className="text-center py-10">
        <h2 className="text-2xl font-semibold mb-10 text-[#543310]">
          Promotions
        </h2>

        <div className="flex flex-wrap justify-center gap-8">
          {promotions.map((promotion, index) => (
            <div
              key={index}
              className="bg-[#fef6e4] rounded-lg shadow-lg overflow-hidden flex flex-col w-72 cursor-pointer"
            >
              <img
                src={promotion.img}
                alt={`Promotion ${index + 1}`}
                className="w-full h-56 object-cover"
              />
              <div className="p-5">
                <h3 className="text-xl font-semibold text-[#543310]">
                  Special Discounts {promotion.discountPercent}%
                </h3>
                <p className="text-sm text-[#543310] mt-2">{promotion.name}</p>
                <button
                  onClick={() => setPromotionCard(promotion)}
                  className="bg-gradient-to-t from-orange-400 to-orange-600 text-white py-2 px-4 rounded-lg mt-4 w-full"
                >
                  MORE
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default PromotionHomePage;
