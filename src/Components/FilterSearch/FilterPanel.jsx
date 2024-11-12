import React, { useEffect } from 'react';
import PriceRangeFilter from './PriceRangeFilter';
import PromotionFilter from './PromotionFilter';
import FacilitiesFilter from './FacilitiesFilter';
import StarFilter from './StarFilter';
import useUserStore from '../../stores/user-store';
import { useShallow } from 'zustand/shallow';


const FilterPanel = () => {
    const { input, setInput } = useUserStore(useShallow(state => ({
        input: state.filter,
        setInput: state.setFilter
    })))

    useEffect(() => {
        setInput({
            ...input,
            maxPrice: 5000,
            facilities: {
                isRoomService: false,
                isReception: false,
                isFitness: false,
                isParking: false,
                isEVCharging: false,
                isSwimmingPool: false,
                isRestaurant: false,
                isBreakfast: false,
                isChildren: false,
                isPetFriendly: false,
                isElevator: false,
            },
            star: null
        })
    }, [])
    const hdlChange = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }
    const hdlFacilityCheck = (e) => {
        setInput({ ...input, facilities: { ...input.facilities, [e.target.name]: e.target.checked } })
    }
    const hdlStarCheck = (e) => {
        if (e.target.checked) {
            setInput({ ...input, [e.target.name]: e.target.value })
        }
    }

    return (
        <div className="w-full text-[#543310]">
            <div className="mb-6 shadow-md rounded-lg ">
                <PriceRangeFilter hdlChange={hdlChange} />
            </div>

            <div className="mb-6 shadow-md rounded-lg">
                <FacilitiesFilter hdlFacilityCheck={hdlFacilityCheck} facilities={input.facilities} />
            </div>
            <div className="shadow-md rounded-lg">
                <StarFilter hdlStarCheck={hdlStarCheck} />
            </div>
        </div>
    );
};

export default FilterPanel;
