import React, { useState } from 'react';

function PromotionFilter() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="p-4 bg-[#fef6e4] rounded-lg shadow">
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setIsOpen(!isOpen)} // toggle dropdown
      >
        <h3 className="text-md font-semibold  text-center flex-grow">Promotion</h3>
        <span className="text-lg">{isOpen ? '▲' : '▼'}</span>
      </div>
      {isOpen && (
        <div className="mt-4">
          <label className="flex items-center  mb-2">
            <input type="radio" name="promotion" className="mr-2 accent-orange-500" />
            <span>Special Deals</span>
          </label>
          <label className="flex items-center ">
            <input type="radio" name="promotion" className="mr-2 accent-orange-500" />
            <span>Hot Deals</span>
          </label>
        </div>
      )}
    </div>
  );
}

export default PromotionFilter;
