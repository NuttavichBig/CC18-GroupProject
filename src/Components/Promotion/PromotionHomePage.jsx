import axios from 'axios';
import React, { useEffect, useState } from 'react';
const API = import.meta.env.VITE_API

function PromotionHomePage() {
    const [promotions, setPromotions] = useState([])
    
    const getPromotion = async () => {
        const result = await axios.get(`${API}/promotion?limit=4&isActive=true&sortBy=discountPercent&orderBy=desc`)
        console.log(result)
        setPromotions(result.data.promotion)
    }

    useEffect(()=>{
        getPromotion()
    },[])
    console.log(promotions)
    return (
        <div className="text-center py-8">
            <h2 className="text-2xl font-semibold mb-6 text-gray-500">Promotion</h2>
            <div className="flex justify-center gap-6">
                {
                    promotions[0] &&
                    <div className="bg-[#fef6e4] rounded-lg shadow-lg overflow-hidden flex flex-col w-64">
                        <img src={promotions[0].img} alt="Promotion 1" className="w-full h-72 object-cover" />
                        <div className="p-4">
                            <h3 className="text-xl font-semibold text-gray-800">Special Discounts {promotions[0].discountPercent}%</h3>
                            <p className="text-sm text-gray-600 mt-2">{promotions[0].name}</p>
                            <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded mt-4">MORE</button>
                        </div>
                    </div>
                }


                <div className="flex flex-col gap-4">
                    {
                        promotions.length >= 2 &&
                        <div className="bg-[#fef6e4] rounded-lg shadow-lg overflow-hidden w-44">
                            <img src={promotions[1].img} alt="Promotion 2" className="w-full h-32 object-cover" />
                            <div className="p-4 text-sm text-gray-700">{promotions[1].name}</div>
                        </div>
                    }
                    {
                        promotions.length >= 3 &&
                        <div className="bg-[#fef6e4] rounded-lg shadow-lg overflow-hidden w-44">
                            <img src={promotions[2].img} alt="Promotion 3" className="w-full h-32 object-cover" />
                            <div className="p-4 text-sm text-gray-700">{promotions[2].name}</div>
                        </div>
                    }
                </div>

                {
                    promotions.length >= 4 &&
                    <div className="bg-[#fef6e4] rounded-lg shadow-lg overflow-hidden flex flex-col w-64">
                        <img src={promotions[3].img} alt="Promotion 4" className="w-full h-72 object-cover" />
                        <div className="p-4">
                            <h3 className="text-xl font-semibold text-gray-800">Special Discounts {promotions[3].discountPercent}%</h3>
                            <p className="text-sm text-gray-600 mt-2">{promotions[3].name}</p>
                            <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded mt-4">MORE</button>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
}

export default PromotionHomePage;
