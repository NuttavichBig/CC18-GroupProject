import React, { memo, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Pagination, Autoplay } from "swiper/modules";
import axios from "axios";
const API = import.meta.env.VITE_API;

const HomePageSlider = () => {
  const [slides, setSlides] = useState([]);
  const [pageParameter, setPageParameter] = useState({
    backgroundImage: "",
    title: "",
    description: "",
    activeIndex: 0,
  });
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    const result = await axios.get(`${API}/hotel?sortBy=rating`);
    const {hotels} = result.data
    if(hotels){
      setSlides(result.data?.hotels);
    }
  };

  const handleSlideChange = (swiper) => {
    const realIndex = swiper.realIndex;
    setPageParameter({
      ...pageParameter,
      backgroundImage: slides[realIndex]?.img,
      title: slides[realIndex]?.name,
      description: slides[realIndex]?.detail,
      activeIndex: realIndex,
    });
  };

  return (
    <div
      className="slider-container relative"
      style={{
        backgroundImage: `url(${pageParameter.backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        transition: "background-image 0.5s ease",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.4)",
          zIndex: 1,
        }}
      ></div>

      <div className="text-content text-white ml-5 w-1/3 mr-10 relative z-20">
        <h1 className="text-4xl font-bold ">{pageParameter.title}</h1>
        <p className="text-lg mt-2">{pageParameter.description}</p>
      </div>

      <Swiper
        key={slides}
        pagination={{ clickable: true }}
        modules={[Pagination, Autoplay]}
        onSlideChange={handleSlideChange}
        centeredSlides={false}
        slidesPerView={3}
        spaceBetween={20}
        loop={true}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        className="mySwiper"
        style={{
          width: "70%",
          paddingTop: "20px",
          paddingBottom: "20px",
          position: "relative",
          zIndex: 2,
          marginLeft: "auto",
          paddingLeft: "10px",
          paddingRight: "10px",
        }}
      >
        {slides.map((slide, index) => (
          <SwiperSlide
            key={index}
            style={{
              display: "flex",
              justifyContent: "center",
              transform:
                index === pageParameter.activeIndex
                  ? "scale(1.1)"
                  : "scale(0.9)",
              transition: "transform 0.3s ease",
            }}
          >
            <img
              src={slide.img}
              alt={`Slide ${index + 1}`}
              className="slide-image"
              style={{
                width: "100%",
                height: "300px",
                borderRadius: "10px",
                boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.4)",
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default memo(HomePageSlider);
