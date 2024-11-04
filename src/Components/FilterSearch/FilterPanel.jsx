import React from 'react';
import PriceRangeFilter from './PriceRangeFilter';
import PromotionFilter from './PromotionFilter';
import FacilitiesFilter from './FacilitiesFilter';
import StarFilter from './StarFilter';


const FilterPanel = () => {
    return (
        <div className="w-full  ">
            <div className="mb-6 shadow-md rounded-lg ">
                <PriceRangeFilter />
            </div>
            <div className="mb-6 shadow-md rounded-lg">
                <PromotionFilter />
            </div>
            <div className="mb-6 shadow-md rounded-lg">
                <FacilitiesFilter />
            </div>
            <div className="shadow-md rounded-lg">
                <StarFilter />
            </div>
        </div>
    );
};

export default FilterPanel;
