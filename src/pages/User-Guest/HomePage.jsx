import React, { useEffect } from "react";
import HeaderHomePage from "../../Components/Nav-Footer-Chat/HeaderHomePage";
import HomePageSlider from "../../Components/BannerSlide/HomePageSlider";
import HomePageSearchBox from "../../Components/FilterSearch/HomePageSearchBox";
import PromotionHomePage from "../../Components/Promotion/PromotionHomePage";
import PictureSlide from "../../Components/Nav-Footer-Chat/PictureSlide";
import Footer from "../../Components/Nav-Footer-Chat/Footer";
import useUserStore from "../../stores/user-store";
import ContentMainPage from "../../Components/ModalOther/ContentMainPage";

const HomePage = () => {
  const setAllFilterDefault = useUserStore(
    (state) => state.setAllFilterDefault
  );
  useEffect(() => {
    setAllFilterDefault();
  }, []);
  return (
    <>
      <HeaderHomePage />
      <div className="min-h-screen relative">
        <HomePageSlider />

        <div className="relative flex justify-center w-full">
          <div className="absolute top-[-120px] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full z-20">
            <HomePageSearchBox />
          </div>
        </div>

        <div className="mt-[200px]">
          <PromotionHomePage />
        </div>
        <div className="mt-10">
          <ContentMainPage />
        </div>

        <PictureSlide />
        <Footer />
      </div>
    </>
  );
};

export default HomePage;
