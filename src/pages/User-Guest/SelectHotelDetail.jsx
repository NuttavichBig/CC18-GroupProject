import React, { useEffect, useState } from 'react';
import HeaderUserPage from '../../Components/Nav-Footer-Chat/HeaderUserPage';
import SearchBoxMain from '../../Components/FilterSearch/SearchBoxMain';
import FilterPanel from '../../Components/FilterSearch/FilterPanel';
import PictureSlide from '../../Components/Nav-Footer-Chat/PictureSlide';
import Footer from '../../Components/Nav-Footer-Chat/Footer';
import HotelDetailMain from '../../Components/SelectHotelDetail/HotelDetailMain';
import HotelDetailMap from '../../Components/SelectHotelDetail/HotelDetailMap';
import HotelDetailReview from '../../Components/SelectHotelDetail/HotelDetailReview';
import HotelDetailRoom from '../../Components/SelectHotelDetail/HotelDetailRoom';
import HotelDetailRecommend from '../../Components/SelectHotelDetail/HotelDetailRecommend';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import useHotelStore from '../../stores/hotel-store';


function SelectHotelDetail() {
    const [hotelData, setHotelData] = useState(null);
    const currentHotel = useHotelStore(state=>state.currentHotel)

    useEffect(() => {
        const fetchHotelData = async () => {
            if (currentHotel) {
                try {
                    const res = await axios.get(`http://localhost:8000/hotel/${currentHotel.id}`);
                    setHotelData(res.data);
                } catch (error) {
                    console.log('error fetch hotel detail', error);
                }
            }
        };
    
        fetchHotelData();
    }, [currentHotel]);
    

    if(!hotelData){
        return <div>Loading...</div>
    }

    return (
        <div>
            <div className='bg-gray-400 relative h-[100px]'>
                <HeaderUserPage />
            </div>
            <div className='min-h-screen relative bg-[#f9f9f9] flex justify-center items-start'>
                <div className="container mx-auto p-6 grid gap-5">
                    <SearchBoxMain />

                    <div className="grid grid-cols-4 gap-6">
                        <div className="col-span-1 h-full w-full">
                            <FilterPanel />
                        </div>


                        <div className="col-span-3 bg-[#fef6e4] ">
                            <div className="flex flex-col space-y-6 w-full">
                                <HotelDetailMain hotelData={hotelData} />
                                <div className="flex gap-6">
                                    <div className="w-1/2 ml-3">
                                    <HotelDetailMap location={{ lat: hotelData.lat, lng: hotelData.lng }} />
                                    </div>
                                    <div className="w-1/2 mr-3">
                                        <HotelDetailReview reviews={hotelData.reviews} />
                                    </div>
                                </div>
                                <HotelDetailRoom rooms={hotelData.rooms} />
                            </div>
                        </div>
                    </div>


                    <div className="grid grid-cols-4 gap-6 mb-[500px]">
                        <div className="col-span-1"></div>
                        <div className="col-span-3 bg-[#fef6e4]">
                            <HotelDetailRecommend />
                        </div>
                    </div>
                </div>
            </div>
            <PictureSlide />
            <Footer />
        </div>
    );
}

export default SelectHotelDetail;
