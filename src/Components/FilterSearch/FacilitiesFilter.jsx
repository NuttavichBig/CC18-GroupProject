import React, { useState } from 'react';

function FacilitiesFilter() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="p-4 bg-[#fef6e4] rounded-lg shadow">
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-md font-semibold text-center flex-grow">Room Facilities</h3>
        <span className="text-lg">{isOpen ? '▲' : '▼'}</span>
      </div>
      {isOpen && (
        <div className="mt-4">
          <label className="flex items-center mb-2">
            <input type="checkbox" className="mr-2 accent-orange-500" />
            <span>Air Condition</span>
          </label>
          <label className="flex items-center mb-2">
            <input type="checkbox" className="mr-2 accent-orange-500" />
            <span>Car Parking</span>
          </label>
          <label className="flex items-center mb-2">
            <input type="checkbox" className="mr-2 accent-orange-500" />
            <span>Pet Friendly</span>
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="mr-2 accent-orange-500" />
            <span>Kitchenette</span>
          </label>
        </div>
      )}
    </div>
  );
}

export default FacilitiesFilter;
