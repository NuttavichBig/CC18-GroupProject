
import React from 'react';
import HeaderHomePage from '../../Components/Nav-Footer-Chat/HeaderHomePage';
import HomePageSlider from '../../Components/BannerSlide/HomePageSlider';
import HomePageSearchBox from '../../Components/FilterSearch/HomePageSearchBox';
import PromotionHomePage from '../../Components/Promotion/PromotionHomePage';
import PictureSlide from '../../Components/Nav-Footer-Chat/PictureSlide';
import Footer from '../../Components/Nav-Footer-Chat/Footer';



const HomePage = () => {
  return (
    <div>
      <HeaderHomePage />
      <div className="min-h-screen relative">
        <HomePageSlider />


        {/* ทำabsoluteติดไว้search */}
        <div className="relative flex justify-center w-full">
          <div className="absolute top-[50%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl z-20">
            <HomePageSearchBox/>
          </div>
        </div>

        <div className="mt-[150px]">
          <PromotionHomePage />
        </div>

        <PictureSlide />
        <Footer />
      </div>
    </div>
  );
};

export default HomePage;
