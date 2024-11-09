import React, { useState } from 'react';

function FacilitiesFilter(props) {
  const {hdlFacilityCheck,facilities} = props
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="p-4 bg-[#fef6e4] rounded-lg shadow">
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-md font-semibold text-center flex-grow">Hotel Facilities</h3>
        <span className="text-lg">{isOpen ? '▲' : '▼'}</span>
      </div>
      {isOpen && (
        <div className="mt-4">
          <label className="flex items-center mb-2">
            <input type="checkbox" className="mr-2 accent-orange-500"
            name='isRoomService'
            value={facilities?.isRoomService}
            onChange={hdlFacilityCheck}/>
            <span>Room Service</span>
          </label>
          <label className="flex items-center mb-2">
            <input type="checkbox" className="mr-2 accent-orange-500"
            name='isReception'
            value={facilities?.isReception}
            onChange={hdlFacilityCheck}/>
            <span>Reception</span>
          </label>
          <label className="flex items-center mb-2">
            <input type="checkbox" className="mr-2 accent-orange-500"
            name='isFitness'
            value={facilities?.isFitness}
            onChange={hdlFacilityCheck}/>
            <span>Fitness</span>
          </label>
          <label className="flex items-center mb-2">
            <input type="checkbox" className="mr-2 accent-orange-500"
            name='isParking'
            value={facilities?.isParking}
            onChange={hdlFacilityCheck}/>
            <span>Parking</span>
          </label>
          <label className="flex items-center mb-2">
            <input type="checkbox" className="mr-2 accent-orange-500"
            name='isEVCharging'
            value={facilities?.isEVCharging}
            onChange={hdlFacilityCheck}/>
            <span>EVCharging</span>
          </label>
          <label className="flex items-center mb-2">
            <input type="checkbox" className="mr-2 accent-orange-500"
            name='isSwimmingPool'
            value={facilities?.isSwimmingPool}
            onChange={hdlFacilityCheck}/>
            <span>Swimming Pool</span>
          </label>
          <label className="flex items-center mb-2">
            <input type="checkbox" className="mr-2 accent-orange-500"
            name='isRestaurant'
            value={facilities?.isRestaurant}
            onChange={hdlFacilityCheck}/>
            <span>Restaurant</span>
          </label>
          <label className="flex items-center mb-2">
            <input type="checkbox" className="mr-2 accent-orange-500"
            name='isBreakfast'
            value={facilities?.isBreakfast}
            onChange={hdlFacilityCheck}/>
            <span>Breakfast</span>
          </label>
          <label className="flex items-center mb-2">
            <input type="checkbox" className="mr-2 accent-orange-500"
            name='isChildren'
            value={facilities?.isChildren}
            onChange={hdlFacilityCheck}/>
            <span>Children</span>
          </label>
          <label className="flex items-center mb-2">
            <input type="checkbox" className="mr-2 accent-orange-500"
            name='isPetFriendly'
            value={facilities?.isPetFriendly}
            onChange={hdlFacilityCheck}/>
            <span>Pet Friendly</span>
          </label>
          <label className="flex items-center mb-2">
            <input type="checkbox" className="mr-2 accent-orange-500"
            name='isElevator'
            value={facilities?.isElevator}
            onChange={hdlFacilityCheck}/>
            <span>Elevator</span>
          </label>

        </div>
      )}
    </div>
  );
}

export default FacilitiesFilter;
