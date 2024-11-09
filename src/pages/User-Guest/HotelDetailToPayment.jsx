import React, { useEffect, useState } from 'react';
import HeaderUserPage from '../../Components/Nav-Footer-Chat/HeaderUserPage';
import SearchBoxMain from '../../Components/FilterSearch/SearchBoxMain';
import HotelDetailMain from '../../Components/SelectHotelDetail/HotelDetailMain';
import Footer from '../../Components/Nav-Footer-Chat/Footer';
import RoomSelection from '../../Components/HotelDetailToPayment/RoomSelection';
import TravelerDetailForm from '../../Components/HotelDetailToPayment/TravelerDetailForm';
import useHotelStore from '../../stores/hotel-store';
import { useShallow } from 'zustand/shallow';
import useUserStore from '../../stores/user-store';



function HotelDetailToPayment() {
    const filter = useUserStore(state => state.filter)
    const { selectedRoom, actionSetSummary ,actionSetRoom} = useHotelStore(useShallow(state => ({
        selectedRoom: state.selectedRoom,
        actionSetSummary: state.actionSetSummary,
        actionSetRoom  :state.actionSetRoom
    })))


    const journeyDateObj = new Date(filter.journeyDate);
    const returnDateObj = new Date(filter.returnDate);
    const differenceInTime = returnDateObj - journeyDateObj;
    const [pageParams, setPageParams] = useState({
        breakfastIncluded: false,
        room: 1,
        coupon: null,
        discount: 0,
        totalPrice: 0,
        summaryPrice: 0,
        nights: 0
    })
    useEffect(()=>{
        console.log('fisrt effect')
        const nights = Math.max(1, Math.ceil(differenceInTime / (1000 * 60 * 60 * 24)))
        setPageParams(prv=>({
            ...prv, nights : nights
        }))
    },[])
    useEffect(() => {
        const breakfast = pageParams.breakfastIncluded ? 60 : 0
        // const price = (Number(selectedRoom.price) + breakfast) * pageParams.nights * pageParams.room;
        setPageParams(prv=>({ ...prv, totalPrice: (Number(selectedRoom.price) + breakfast) * prv.nights * prv.room }))
        actionSetRoom(pageParams.room)
    }, [pageParams.room, pageParams.breakfastIncluded,pageParams.nights])
    useEffect(() => {
        actionSetSummary(pageParams.summaryPrice)
    }, [pageParams.summaryPrice])
    useEffect(() => { // summary control
        setPageParams(prv=>({ ...prv, summaryPrice: prv.totalPrice - prv.discount }))
    }, [pageParams.discount, pageParams.totalPrice])
    // useEffect(()=>{
    //     console.log(pageParams)
    // },[pageParams])

    return (
        <div>
            <div className='bg-gray-400 relative h-[100px]'>
                <HeaderUserPage />
            </div>
            <div className='min-h-screen relative bg-[#f9f9f9] flex justify-center items-start'>
                <div className="container mx-auto p-6 grid gap-5">
                    <SearchBoxMain />

                    <div className="p-6">
                        <span className='ml-1'>Overview to pay</span>
                        <HotelDetailMain />
                    </div>


                    {/* Progress Bar */}
                    <div className="grid grid-cols-2 items-center mb-8">
                        <h2 className="text-5xl font-bold text-gray-600 ml-2">Your Accommodation Booking</h2>
                        <div className="flex justify-center items-center w-full">
                            <div className="flex items-center h-[100px]">
                                <div className="rounded-full bg-orange-500" style={{ width: '60px', height: '60px' }}></div>
                                <div className="h-1 w-52 bg-black mx-0"></div>
                                <div className="rounded-full bg-gray-300" style={{ width: '60px', height: '60px' }}></div>
                                <div className="h-1 w-52 bg-black mx-0"></div>
                                <div className="rounded-full bg-gray-300" style={{ width: '60px', height: '60px' }}></div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-6 ">

                        <div className="col-span-1 h-full">
                            <div>
                                <RoomSelection pageParams={pageParams} setPageParams={setPageParams} />
                            </div>
                        </div>


                        <div className="col-span-2 space-y-6 mb-[500px] mr-8">

                            <div className="flex gap-6">
                                <div className="w-full bg-[#fef6e4]">
                                    <TravelerDetailForm pageParams={pageParams} setPageParams={setPageParams} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default HotelDetailToPayment;
