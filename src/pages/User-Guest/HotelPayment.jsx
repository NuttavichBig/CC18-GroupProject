import React from 'react';
import HeaderUserPage from '../../Components/Nav-Footer-Chat/HeaderUserPage';
import SearchBoxMain from '../../Components/FilterSearch/SearchBoxMain';
import HotelDetailMain from '../../Components/SelectHotelDetail/HotelDetailMain';
import Footer from '../../Components/Nav-Footer-Chat/Footer';
import SummaryRoomDetail from '../../Components/HotelPayment/SummaryRoomDetail';
import PaymentMethodForm from '../../Components/HotelPayment/PaymentMethodForm';
import CheckoutForm from '../../Components/HotelPayment/CheckoutForm';
import PaymentProvider from '../../Components/HotelPayment/PaymentProvider';
import BookingProgressBallMiddle from '../../Components/BookingProgrssBall/BookingProgressBallMiddle';



function HotelPayment() {


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

                    <BookingProgressBallMiddle />




                    <div className="grid grid-cols-3 gap-6">

                        <div className="col-span-1 h-full">
                            <div>
                                <SummaryRoomDetail />
                            </div>
                        </div>

                        <div className="col-span-2 space-y-6 mb-[500px]">

                            <div className="flex gap-6">
                                <div className="w-full bg-[#fef6e4]">
                                    {/* <PaymentMethodForm /> */}
                                    {/* ใช้stripe แทน */}
                                    <PaymentProvider >
                                        <CheckoutForm />
                                    </PaymentProvider >
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

export default HotelPayment;
