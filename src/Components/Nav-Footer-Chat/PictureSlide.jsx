import React, { useRef } from 'react';
import Slider from 'react-slick';
import '../../utills/PictureSlideSlickCSS/slick.css';
import '../../utills/PictureSlideSlickCSS/slick-theme.css';

const Arrow = ({ direction, onClick }) => (
    <div
        className={`text-3xl text-black absolute top-1/2 transform -translate-y-1/2 cursor-pointer z-10 ${direction === 'next' ? 'right-12' : 'left-12'}`}
        onClick={onClick}
    >
        {direction === 'next' ? '›' : '‹'}
    </div>
);

const PictureSlide = () => {
    const sliderRef = useRef(null);
    // const [images, setImages] = useState([]);

    const settings = {
        centerMode: true,
        centerPadding: '100px',
        slidesToShow: 3,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 2000,
        swipe: true,
        draggable: true,
        nextArrow: <Arrow direction="next" />,
        prevArrow: <Arrow direction="prev" />,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    arrows: false,
                    centerMode: true,
                    centerPadding: '40px',
                    slidesToShow: 1,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    arrows: false,
                    centerMode: true,
                    centerPadding: '20px',
                    slidesToShow: 1,
                },
            },
        ],
    };

    const images = [
        "/1.jpg", "/2.jpg", "/3.jpg", "/4.jpg", "/5.jpg",
        "/6.jpg", "/7.jpg", "/8.jpg", "/9.jpg", "/10.jpg",
        "/11.jpg", "/12.jpg"
    ];
    // useEffect(() => {
    //     // ดึงข้อมูลภาพจาก API โดยใช้ axios const fetchImages = async () => {
    //         try {
    //             const response = await axios.get('');
    //             setImages(response.data.images); 
    //         } catch (error) {
    //             console.error('Error fetching images:', error);
    //         }
    //     };

    //     fetchImages();
    // }, []);



    const handleWheel = (event) => {
        if (event.deltaY > 0) {
            sliderRef.current.slickNext();
        } else {
            sliderRef.current.slickPrev();
        }
    };

    return (
        <div className="slider-container" onWheel={handleWheel}>
            <Slider ref={sliderRef} {...settings}>
                {images.map((image, index) => (
                    <div key={index} className="slide-item">
                        <img src={image} alt={`Slide ${index + 1}`} className="slide-image" />  {/* image.url แทนที่ตำแหน่ง URL ของภาพ */}
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default PictureSlide;
