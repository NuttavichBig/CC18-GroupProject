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
        <div className='text-[#543310]'>
                <HeaderUserPage />
            <div className='flex justify-center items-start mt-[150px] border-t-2'>
                <div className="">
               

                    <div className="">

                        {/* <HotelDetailMain /> */}
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
                                <div className="w-full ">
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
