import React, { useEffect, useState } from "react";
import HeaderUserPage from "../../Components/Nav-Footer-Chat/HeaderUserPage";
import Footer from "../../Components/Nav-Footer-Chat/Footer";
import PictureSlide from "../../Components/Nav-Footer-Chat/PictureSlide";
import HotelDetailMain from "../../Components/SelectHotelDetail/HotelDetailMain";
import HotelDetailMap from "../../Components/SelectHotelDetail/HotelDetailMap";
import HotelDetailReview from "../../Components/SelectHotelDetail/HotelDetailReview";
import HotelDetailRoom from "../../Components/SelectHotelDetail/HotelDetailRoom";
import HotelDetailRecommend from "../../Components/SelectHotelDetail/HotelDetailRecommend";
import axios from "axios";
import useHotelStore from "../../stores/hotel-store";

function SelectHotelDetail() {
  const [hotelData, setHotelData] = useState(null);
  const currentHotel = useHotelStore((state) => state.currentHotel);

  useEffect(() => {
    const fetchHotelData = async () => {
      if (currentHotel) {
        try {
          const res = await axios.get(
            `http://localhost:8000/hotel/${currentHotel.id}`
          );
          setHotelData(res.data);
        } catch (error) {
          console.log("error fetch hotel detail", error);
        }
      }
    };

    fetchHotelData();
  }, [currentHotel]);

  if (!hotelData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <HeaderUserPage />
      <div className="flex justify-center items-start mt-[150px] border-t-2">
        <div className="p-6 grid gap-5 w-full max-w-7xl">
          <div className="flex flex-col space-y-6 w-full bg-cream-gradient rounded-lg px-3">
            <HotelDetailMain hotelData={hotelData} />
            <div className="flex gap-6">
              <div className="w-1/2 ml-3">
                <HotelDetailMap location={{ lat: hotelData.lat, lng: hotelData.lng }} />
              </div>
              <div className="w-1/2 mr-3">
                <HotelDetailReview reviews={hotelData.reviews} />
              </div>
            </div>
            <HotelDetailRoom rooms={hotelData.rooms} />
          </div>

          <div className="mt-[60px] mb-[48px]">
            <HotelDetailRecommend />
          </div>
        </div>
      </div>

      <PictureSlide />
      <Footer />
    </div>
  );
}

export default SelectHotelDetail;
