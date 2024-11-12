import React from "react";
import PictureSlide from "../../Components/Nav-Footer-Chat/PictureSlide";
import Footer from "../../Components/Nav-Footer-Chat/Footer";
import HeaderUserPage from "../../Components/Nav-Footer-Chat/HeaderUserPage";
import PromotionListShowAll from "../../Components/HotelPromotion/PromotionListShowAll";

function HotelPromotion() {
  return (
    <div>
      <HeaderUserPage />
      <div className="border-b mt-8 h-[100px]"></div>
      <div className="min-h-screen relative flex justify-center items-start">
        <div className="container mx-auto p-6 grid gap-5">
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
