import React from 'react';

function PromotionModal({ promo, onClose }) {
  const startDate = (new Date(promo.startDate)).toLocaleDateString()
  const endDate = (new Date(promo.endDate)).toLocaleDateString()
  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50"
      onClick={onClose}
      style={{ zIndex: 9999 }}
    >
      <div
        className="bg-[#FFF8EC] rounded-lg p-6 max-w-md mx-auto text-center shadow-lg relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          ✕
        </button>
        <img src={promo.img} alt="Promotion" className="w-full h-40 object-cover rounded-lg mb-4" />
        <h3 className="text-xl font-bold text-orange-600 mb-2">Special Discounts {promo.discountPercent > 0?`${promo.discountPercent}%`:`${promo.discountValue}฿`}</h3>
        <p className="text-gray-600">{promo.name}</p>
        <p className='text-gray-500 text-sm'>{`${startDate} to ${endDate}`}</p>
        <p className="text-gray-600 mt-4">
          {promo.description}
        </p>
        <p className="text-gray-600 mt-4 font-bold">{promo.code}</p>
      </div>
    </div>
  );
}

export default PromotionModal;


