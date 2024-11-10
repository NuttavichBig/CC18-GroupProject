import React from 'react';
import HotelDetailMain from '../../Components/SelectHotelDetail/HotelDetailMain';
import SearchBoxMain from '../../Components/FilterSearch/SearchBoxMain';
import HeaderUserPage from '../../Components/Nav-Footer-Chat/HeaderUserPage';
import Footer from '../../Components/Nav-Footer-Chat/Footer';
import PaymentResult from '../../Components/HotelPaymentSucessSummary/PaymentResult';
import BookingProgressBallRight from '../../Components/BookingProgrssBall/BookingProgressBallRight';



function HotelPaymentSucessSummary() {


    return (
        <div>
            <div className='bg-gray-400 relative h-[100px]'>
                <HeaderUserPage />
            </div>
            <div className='min-h-screen relative bg-[#f9f9f9] flex justify-center items-start'>
                <div className="container mx-auto p-6 grid gap-5">
                    <SearchBoxMain />

                    <div className="bg-[#fef6e4]">
                        <span className='ml-1'>Overview to pay</span>
                        <HotelDetailMain />
                    </div>


                    <BookingProgressBallRight />





                    <div className="grid grid-cols-3 gap-6 mb-[500px]">

                        <div className="col-span-3 h-full">
                            <div>

                                <PaymentResult />

                            </div>


                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div >
    );
}

export default HotelPaymentSucessSummary;
