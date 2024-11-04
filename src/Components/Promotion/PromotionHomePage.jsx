import React from 'react';

function PromotionHomePage() {
    return (
        <div className="text-center py-8">
            <h2 className="text-2xl font-semibold mb-6 text-gray-500">Promotion</h2>
            <div className="flex justify-center gap-6">

                <div className="bg-[#fef6e4] rounded-lg shadow-lg overflow-hidden flex flex-col w-64">
                    <img src="/1.jpg" alt="Promotion 1" className="w-full h-72 object-cover" />
                    <div className="p-4">
                        <h3 className="text-xl font-semibold text-gray-800">Special Discounts 50%</h3>
                        <p className="text-sm text-gray-600 mt-2">Lotte Hotels & Resorts Korea</p>
                        <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded mt-4">BOOK NOW</button>
                    </div>
                </div>


                <div className="flex flex-col gap-4">
                    <div className="bg-[#fef6e4] rounded-lg shadow-lg overflow-hidden w-44">
                        <img src="/2.jpg" alt="Promotion 2" className="w-full h-32 object-cover" />
                        <div className="p-4 text-sm text-gray-700">Lotte Hotels & Resorts Korea</div>
                    </div>
                    <div className="bg-[#fef6e4] rounded-lg shadow-lg overflow-hidden w-44">
                        <img src="/3.jpg" alt="Promotion 3" className="w-full h-32 object-cover" />
                        <div className="p-4 text-sm text-gray-700">Lotte Hotels & Resorts Korea</div>
                    </div>
                </div>


                <div className="bg-[#fef6e4] rounded-lg shadow-lg overflow-hidden flex flex-col w-64">
                    <img src="/4.jpg" alt="Promotion 4" className="w-full h-72 object-cover" />
                    <div className="p-4">
                        <h3 className="text-xl font-semibold text-gray-800">Special Discounts 40%</h3>
                        <p className="text-sm text-gray-600 mt-2">Lotte Hotels & Resorts Korea</p>
                        <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded mt-4">BOOK NOW</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PromotionHomePage;
