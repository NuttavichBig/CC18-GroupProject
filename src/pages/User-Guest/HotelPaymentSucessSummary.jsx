import React, { useEffect } from "react";
import HotelDetailMain from "../../Components/SelectHotelDetail/HotelDetailMain";
import SearchBoxMain from "../../Components/FilterSearch/SearchBoxMain";
import HeaderUserPage from "../../Components/Nav-Footer-Chat/HeaderUserPage";
import Footer from "../../Components/Nav-Footer-Chat/Footer";
import PaymentResult from "../../Components/HotelPaymentSucessSummary/PaymentResult";
import BookingProgressBallRight from "../../Components/BookingProgrssBall/BookingProgressBallRight";
import Swal from "sweetalert2";

function HotelPaymentSucessSummary() {

  useEffect(()=>{
    Swal.fire({
      html: `<div class="flex items-center gap-2">
         <img src="https://res.cloudinary.com/dvtkfd3jj/image/upload/v1731934480/%E0%B8%AD_%E0%B8%95_%E0%B9%89_qtfehz.gif" alt="Error Animation" class="w-10 h-10" />
         <div class="flex flex-col gap-1">
         <span class="text-sm font-bold text-gray-300">Achievement Unlock</span>
         <span class="text-base font-bold text-white">Beginning of Journey</span>
         </div>
       </div>`,
      position: "top-end",
      timer: 3000,
      timerProgressBar: true,
      showConfirmButton: false,
      toast: true,
      background: "#00000090",
      didOpen: (toast) => {
        const progressBar = toast.querySelector(".swal2-timer-progress-bar");
        if (progressBar) {
          progressBar.style.backgroundColor = "white";
        }
        toast.addEventListener("click", Swal.close);
      },
    });
  },[])
  return (
    <div>
      <div className="text-[#543310]">
        <HeaderUserPage />
      </div>
      <div className="flex justify-center items-start mt-[150px] border-t-2">
        <div className="mx-auto px-[50px] py-10 w-[80%]">
          <div className="mx-auto ">
            {/* <HotelDetailMain /> */}
          </div>

          <BookingProgressBallRight />
          <div className="grid grid-cols-3 gap-6 ">
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
