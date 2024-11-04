import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import { Pagination, Autoplay } from 'swiper/modules';


const HomePageSlider = () => {
    const [backgroundImage, setBackgroundImage] = useState("/1.jpg");
    const [title, setTitle] = useState("KERALA");
    const [description, setDescription] = useState("Discover the beauty of Kerala's landscapes and culture.");
    const [activeIndex, setActiveIndex] = useState(0);

    const slides = [

        { src: "/1.jpg", title: "B2 South Pattaya Premier Hotel", description: "Discover the beauty of Pattaya landscapes and culture." },
        { src: "/2.jpg", title: "Buddha Serenity Hotel, Thailand", description: "Experience the serenity of Thailand's Buddha temples." },
        { src: "/3.jpg", title: "Broken Beach Resort, Bali", description: "Explore the stunning Broken Beach in Bali." },
        { src: "/4.jpg", title: "Mount Fuji Inn, Japan", description: "Admire the iconic Mount Fuji in Japan." },
        { src: "/5.jpg", title: "Great Wall Heritage Hotel, China", description: "Walk along the historic Great Wall of China." },
        { src: "/6.jpg", title: "Paris Romance Hotel, France", description: "Enjoy the romantic cityscape of Paris." }


    ];

    const handleSlideChange = (swiper) => {
        const realIndex = swiper.realIndex;
        setBackgroundImage(slides[realIndex].src);
        setTitle(slides[realIndex].title);
        setDescription(slides[realIndex].description);
        setActiveIndex(realIndex);
    };

    return (
        <div
            className="slider-container relative"
            style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                transition: 'background-image 0.5s ease',
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
            }}
        >


            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0, 0, 0, 0.4)',
                    zIndex: 1,
                }}
            ></div>

            <div className="text-content text-white ml-5 w-1/3 mr-10 relative z-20">
                <h1 className="text-4xl font-bold ">{title}</h1>
                <p className="text-lg mt-2">{description}</p>
            </div>


            <Swiper
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
                    width: '70%',
                    paddingTop: '20px',
                    paddingBottom: '20px',
                    position: 'relative',
                    zIndex: 2,
                    marginLeft: 'auto',
                    paddingLeft: '10px',
                    paddingRight: '10px',
                }}
            >
                {slides.map((slide, index) => (
                    <SwiperSlide
                        key={index}
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            transform: index === activeIndex ? 'scale(1.1)' : 'scale(0.9)',
                            transition: 'transform 0.3s ease',
                        }}
                    >
                        <img
                            src={slide.src}
                            alt={`Slide ${index + 1}`}
                            className="slide-image"

                            style={{
                                width: '100%',
                                height: '300px',
                                borderRadius: '10px',
                                boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.4)',
                            }}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default HomePageSlider;
