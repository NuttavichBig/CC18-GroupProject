import axios from "axios";
import React, { useEffect, useState } from "react";
const API = import.meta.env.VITE_API;

function PromotionHomePage() {
  const [promotions, setPromotions] = useState([]);

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
    <div className="text-center py-6">
      <h2 className="text-3xl font-semibold mb-8 text-[#543310]">Promotion</h2>

      <div className="flex flex-wrap justify-center gap-8">
        <div className="flex flex-col gap-6">
          {promotions.length >= 2 && (
            <div className="bg-[#fef6e4] rounded-lg shadow-lg overflow-hidden w-52">
              <img
                src={promotions[1].img}
                alt="Promotion 2"
                className="w-full h-32 object-cover"
              />
              <div className="p-4 text-sm text-[#543310] font-medium text-center">
                {promotions[1].name}
              </div>
            </div>
          )}
          {promotions.length >= 3 && (
            <div className="bg-[#fef6e4] rounded-lg shadow-lg overflow-hidden w-52">
              <img
                src={promotions[2].img}
                alt="Promotion 3"
                className="w-full h-32 object-cover"
              />
              <div className="p-4 text-sm text-[#543310] font-medium text-center">
                {promotions[2].name}
              </div>
            </div>
          )}
        </div>
        {promotions.length >= 1 && (
          <div className="bg-[#fef6e4] rounded-lg shadow-lg overflow-hidden flex flex-col w-72">
            <img
              src={promotions[0].img}
              alt="Promotion 1"
              className="w-full h-56 object-cover"
            />
            <div className="p-5">
              <h3 className="text-xl font-semibold text-[#543310]">
                Special Discounts {promotions[0].discountPercent}%
              </h3>
              <p className="text-sm text-[#543310] mt-2">
                {promotions[0].name}
              </p>
              <button className="bg-gradient-to-t from-orange-400 to-orange-600 text-white py-2 px-4 rounded-lg mt-4 w-full">
                MORE
              </button>
            </div>
          </div>
        )}

        <div className="flex flex-col gap-6">
          {promotions.length >= 2 && (
            <div className="bg-[#fef6e4] rounded-lg shadow-lg overflow-hidden w-52">
              <img
                src={promotions[1].img}
                alt="Promotion 2"
                className="w-full h-32 object-cover"
              />
              <div className="p-4 text-sm text-[#543310] font-medium text-center">
                {promotions[1].name}
              </div>
            </div>
          )}
          {promotions.length >= 3 && (
            <div className="bg-[#fef6e4] rounded-lg shadow-lg overflow-hidden w-52">
              <img
                src={promotions[2].img}
                alt="Promotion 3"
                className="w-full h-32 object-cover"
              />
              <div className="p-4 text-sm text-[#543310] font-medium text-center">
                {promotions[2].name}
              </div>
            </div>
          )}
        </div>

        {promotions.length >= 4 && (
          <div className="bg-[#fef6e4] rounded-lg shadow-lg overflow-hidden flex flex-col w-72">
            <img
              src={promotions[3].img}
              alt="Promotion 4"
              className="w-full h-56 object-cover"
            />
            <div className="p-5">
              <h3 className="text-xl font-semibold text-[#543310]">
                Special Discounts {promotions[3].discountPercent}%
              </h3>
              <p className="text-sm text-[#543310] mt-2">
                {promotions[3].name}
              </p>
              <button className="bg-gradient-to-t from-orange-400 to-orange-600 text-white py-2 px-4 rounded-lg mt-4 w-full">
                MORE
              </button>
            </div>
          </div>
        )}
        <div className="flex flex-col gap-6">
          {promotions.length >= 2 && (
            <div className="bg-[#fef6e4] rounded-lg shadow-lg overflow-hidden w-52">
              <img
                src={promotions[1].img}
                alt="Promotion 2"
                className="w-full h-32 object-cover"
              />
              <div className="p-4 text-sm text-[#543310] font-medium text-center">
                {promotions[1].name}
              </div>
            </div>
          )}
          {promotions.length >= 3 && (
            <div className="bg-[#fef6e4] rounded-lg shadow-lg overflow-hidden w-52">
              <img
                src={promotions[2].img}
                alt="Promotion 3"
                className="w-full h-32 object-cover"
              />
              <div className="p-4 text-sm text-[#543310] font-medium text-center">
                {promotions[2].name}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PromotionHomePage;
