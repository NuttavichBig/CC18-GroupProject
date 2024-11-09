import React, { useState } from 'react';

function StarFilter(props) {
  const {hdlStarCheck} = props
  const [isOpen, setIsOpen] = useState(true);
  const stars = [5, 4, 3, 2, 1];

  return (
    <div className="p-4 bg-[#fef6e4] rounded-lg shadow">
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setIsOpen(!isOpen)} // toggle dropdown
      >
        <h3 className="text-md font-semibold text-center flex-grow">Star</h3>
        <span className="text-lg">{isOpen ? '▲' : '▼'}</span>
      </div>
      {isOpen && (
        <div className="mt-4">
          {stars.map((star) => (
            <label key={star} className="flex items-center mb-2">
              <input type="radio" name="star" className="mr-2 accent-orange-500" value={star}
              onChange={hdlStarCheck}/>
              <span className="text-yellow-500">
                {'★'.repeat(star)}
              </span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}

export default StarFilter;
