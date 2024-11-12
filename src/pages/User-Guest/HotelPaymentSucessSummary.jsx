import React from "react";
import HotelDetailMain from "../../Components/SelectHotelDetail/HotelDetailMain";
import SearchBoxMain from "../../Components/FilterSearch/SearchBoxMain";
import HeaderUserPage from "../../Components/Nav-Footer-Chat/HeaderUserPage";
import Footer from "../../Components/Nav-Footer-Chat/Footer";
import PaymentResult from "../../Components/HotelPaymentSucessSummary/PaymentResult";
import BookingProgressBallRight from "../../Components/BookingProgrssBall/BookingProgressBallRight";

function HotelPaymentSucessSummary() {
  return (
    <div>
      <div className="text-[#543310]">
        <HeaderUserPage />
      </div>
      <div className="flex justify-center items-start mt-[150px] border-t-2">
        <div className="container mx-auto p-6 grid gap-5 px-[50px]">
          <div className="mx-auto ">
            {/* <HotelDetailMain /> */}
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
    </div>
  );
}

export default HotelPaymentSucessSummary;
