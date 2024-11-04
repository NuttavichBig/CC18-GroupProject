import React from 'react';
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



function SelectHotelDetail() {


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
                                <HotelDetailMain />
                                <div className="flex gap-6">
                                    <div className="w-1/2 ml-3">
                                        <HotelDetailMap />
                                    </div>
                                    <div className="w-1/2 mr-3">
                                        <HotelDetailReview />
                                    </div>
                                </div>
                                <HotelDetailRoom />
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
