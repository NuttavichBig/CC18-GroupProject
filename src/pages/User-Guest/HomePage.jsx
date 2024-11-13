import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import HeaderHomePage from "../../Components/Nav-Footer-Chat/HeaderHomePage";
import HomePageSlider from "../../Components/BannerSlide/HomePageSlider";
import HomePageSearchBox from "../../Components/FilterSearch/HomePageSearchBox";
import PromotionHomePage from "../../Components/Promotion/PromotionHomePage";
import PictureSlide from "../../Components/Nav-Footer-Chat/PictureSlide";
import Footer from "../../Components/Nav-Footer-Chat/Footer";
import useUserStore from "../../stores/user-store";
import ContentMainPage from "../../Components/ModalOther/ContentMainPage";

const HomePage = () => {
  const controls = useAnimation();
  const setAllFilterDefault = useUserStore((state) => state.setAllFilterDefault);

  useEffect(() => {
    setAllFilterDefault();

    const handleScroll = () => {
      if (window.scrollY > 250) {
        controls.start({
          top: "0",
          transform: "translate(-50%, -50%)",
          transition: { duration: 0.5, ease: "easeOut" },
        });
      } else {
        controls.start({
          top: "auto",
          bottom: "60px",
          transform: "translateX(-50%)",
          transition: { duration: 0.5, ease: "easeOut" },
        });
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [controls, setAllFilterDefault]);

  return (
    <>
      <HeaderHomePage />
      <div className="min-h-screen relative">
        <HomePageSlider />

        <div className="relative flex justify-center w-full">
          <motion.div
            className="absolute left-1/2 transform  w-full z-20"
            animate={controls}
            initial={{ bottom: "60px", top: "auto", transform: "translateX(-50%)" }}
          >
            <HomePageSearchBox />
          </motion.div>
        </div>

        <div className="mt-[200px]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <PromotionHomePage />
          </motion.div>
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
