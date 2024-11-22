import React, { useEffect } from 'react'
import HeaderUserPage from '../../Components/Nav-Footer-Chat/HeaderUserPage'
import useCompareStore from '../../stores/compare-store';
import check from "../../assets/check-circle.svg"
import no from "../../assets/fail.png"
export default function ComparePage() {
    const items = useCompareStore(state => state.items)
    const roomFacilities = [
        "isSmoking",
        "isAirCondition",
        "isPrivateBathroom",
        "isBalcony",
        "isView",
        "isTelevision",
        "isRefrigerator",
        "isShower",
        "isBathtub",
        "isWifi"
    ]
    const hotelFacilities = [
            "isRoomService",
            "isReception",
            "isFitness",
            "isParking",
            "isEVCharging",
            "isSwimmingPool",
            "isRestaurant",
            "isBreakfast",
            "isChildren",
            "isPetFriendly",
            "isElevator",
    ]
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }, [])

    console.log(items)
    return (
        <div>
            <div className='bg-white relative h-[132px] shadow-md'>
                <HeaderUserPage />
            </div>
            <div className='min-h-screen bg-[#f9f9f9] pb-40 flex justify-center items-start'>
                <table className='mt-20'>
                    <tr>
                        <th></th>
                        {items.map((item, index) => <td key={index} className='px-4 py-2 border border-black bg-white'>
                            <div className='flex flex-col justify-start items-center'>
                                <img src={item.hotel?.img} alt="hotel name" className='h-60 w-60 object-cover rounded-lg' />
                                <h2 className='text-sm font-semibold text-gray-500'>
                                    Hotel
                                </h2>
                                <p className='text-lg text-black font-semibold'>{item.hotel?.name}</p>
                                <div className='flex gap-0.5 text-lg'>
                                    <span className="text-yellow-500">{'★'.repeat(item.hotel?.star)}</span>
                                    <span className="text-gray-300">{'★'.repeat(5 - item.hotel?.star)}</span>
                                </div>
                            </div>
                        </td>)}
                    </tr>
                    <tr className='bg-gradient-to-r from-[#f08a4b] to-[#e05b3c] text-white text-center font-semibold'>
                        <th className='px-4 py-2 border border-black '>Room name</th>
                        {items.map((item, index) => <td key={index} className='px-4 py-2 border border-black'>{item.room?.name}</td>)}
                    </tr>
                    <tr className='bg-white font-semibold text-center'>
                        <th className='px-4 py-2 border border-black'>Room Images</th>
                        {items.map((item, index) =>
                            <td className='px-4 py-2 border border-black '>
                                <div key={index} className='h-60 overflow-x-scroll overflow-y-hidden bg-slate-100 mx-auto rounded-lg'>
                                    <div className='flex gap-1 w-60 h-60'>
                                        {item.room?.images?.map((image, index) => <img index={index} src={image.img} alt='room image' className='w-60 h-60 object-contain' />)}
                                    </div>
                                </div>
                            </td>
                        )}
                    </tr>
                    <tr className='bg-white text-center'>
                        <th className='px-4 py-2 border border-black font-semibold'>Address</th>
                        {items.map((item, index) =>
                            <td className='px-4 py-2 border border-black' key={index}>
                                {item.hotel?.address}
                            </td>
                        )}
                    </tr>
                    <tr className='bg-white text-center'>
                        <th className='px-4 py-2 border border-black font-semibold'>
                            Type
                        </th>
                        {items.map((item, index) => <td key={index} className='px-4 py-2 border border-black'>{item.room?.type}</td>)}
                    </tr>
                    <tr className='bg-white text-center'>
                        <th className='px-4 py-2 border border-black font-semibold'>Size (square meters)</th>
                        {items.map((item, index) =>
                            <td className='px-4 py-2 border border-black' key={index}>
                                {item.room?.size}
                            </td>
                        )}
                    </tr>
                    <tr className='bg-white text-center'>
                        <th className='px-4 py-2 border border-black font-semibold'>For</th>
                        {items.map((item, index) =>
                            <td className='px-4 py-2 border border-black' key={index}>
                                {item.room?.recommendPeople} persons
                            </td>
                        )}
                    </tr>
                    <tr className='bg-white text-center'>
                        <th className='px-4 py-2 border border-black font-semibold'>Price</th>
                        {items.map((item, index) =>
                            <td className='px-4 py-2 border border-black' key={index}>
                                {item.room?.price} THB
                            </td>
                        )}
                    </tr>
                    <tr className='bg-gradient-to-r from-[#f08a4b] to-[#e05b3c] text-white font-semibold'>
                        <th className='px-4 py-2 border border-black' colSpan={items.length + 1}>Room Facilities</th>
                    </tr>
                    {roomFacilities.map((word, index) =>
                        <tr className='bg-white text-center' key={index}>
                            <th className='px-4 py-2 border border-black font-semibold'>{word.slice(2)}</th>
                            {items.map((item, index) =>
                                <td className='px-4 py-2 border border-black' key={index}>
                                    <div className='flex justify-center'>

                                    {item.room?.facilitiesRoom[word] ?
                                        <img src={check} alt="yes" className='w-9 h-9'/>
                                        :
                                        <img src={no} alt='No' className='w-12 h-12' />
                                    }
                                    </div>
                                </td>
                            )}
                        </tr>
                    )}
                     <tr className='bg-gradient-to-r from-[#f08a4b] to-[#e05b3c] text-white font-semibold'>
                        <th className='px-4 py-2 border border-black' colSpan={items.length + 1}>Hotel Facilities</th>
                    </tr>
                    {hotelFacilities.map((word, index) =>
                        <tr className='bg-white text-center' key={index}>
                            <th className='px-4 py-2 border border-black font-semibold'>{word.slice(2)}</th>
                            {items.map((item, index) =>
                                <td className='px-4 py-2 border border-black' key={index}>
                                    <div className='flex justify-center'>

                                    {item.hotel?.facilitiesHotel[word] ?
                                        <img src={check} alt="yes" className='w-9 h-9'/>
                                        :
                                        <img src={no} alt='No' className='w-12 h-12' />
                                    }
                                    </div>
                                </td>
                            )}
                        </tr>
                    )}
                </table>
            </div>
        </div>
    )
}
