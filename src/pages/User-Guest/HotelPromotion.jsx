import React from 'react';
import PictureSlide from '../../Components/Nav-Footer-Chat/PictureSlide';
import Footer from '../../Components/Nav-Footer-Chat/Footer';
import HeaderUserPage from '../../Components/Nav-Footer-Chat/HeaderUserPage';
import SearchBoxMain from '../../Components/FilterSearch/SearchBoxMain';
import PromotionListShowAll from '../../Components/HotelPromotion/PromotionListShowAll';



function HotelPromotion() {

    return (
        <div>
            <div className='bg-gray-400 relative h-[100px]'>
                <HeaderUserPage />
            </div>
            <div className='min-h-screen relative bg-[#f9f9f9] flex justify-center items-start'>
                <div className="container mx-auto p-6 grid gap-5">
                    <SearchBoxMain />




                    <div className="grid grid-cols-3 gap-6 mb-[500px]">

                        <div className="col-span-3 h-full">
                            <div>
                                <PromotionListShowAll />
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <PictureSlide />
            <Footer />
        </div>
    );
}

export default HotelPromotion;
