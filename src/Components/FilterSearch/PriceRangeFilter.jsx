import React, { useState } from 'react';

function PriceRangeFilter() {
  const [isOpen, setIsOpen] = useState(false); //  dropdown
  const [price, setPrice] = useState(5000);

  const handlePriceChange = (e) => {
    setPrice(parseInt(e.target.value));
  };

  return (
    <div className="p-4 bg-[#fef6e4] rounded-lg shadow">
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-md font-semibold text-center flex-grow">Price Range</h3>
        <span className="text-lg">{isOpen ? '▲' : '▼'}</span>
      </div>
      {isOpen && (
        <div className="mt-4 flex flex-col items-center">
          <input
            type="range"
            min="0"
            max="5000"
            value={price}
            onChange={handlePriceChange}
            className="w-full accent-orange-500"
            style={{
              appearance: 'none',
              height: '4px',
              background: `linear-gradient(to right, orange 0%, orange ${price / 50}%, #ddd ${price / 50}%, #ddd 100%)`,
              borderRadius: '2px',
              outline: 'none',
            }}
          />
          <div className="flex justify-between w-full mt-2 text-xs">
            <span>THB 0</span>
            <span>THB {price}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default PriceRangeFilter;
