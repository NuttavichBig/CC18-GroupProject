import React, { useEffect, useState } from "react";
import HeaderUserPage from "../../Components/Nav-Footer-Chat/HeaderUserPage";
import SearchBoxMain from "../../Components/FilterSearch/SearchBoxMain";
import FilterPanel from "../../Components/FilterSearch/FilterPanel";
import PictureSlide from "../../Components/Nav-Footer-Chat/PictureSlide";
import Footer from "../../Components/Nav-Footer-Chat/Footer";
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
          const res = await axios.get(`http://localhost:8000/hotel/${currentHotel.id}`);
          setHotelData(res.data);
        } catch (error) {
          console.log('Error fetching hotel detail:', error);
        }
      }
    };

    fetchHotelData();
  }, [currentHotel]);

  if (!hotelData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="text-[#543310]">
      <HeaderUserPage />
      <div className="min-h-screen flex justify-center items-start">
        <div className="container mx-auto p-6 grid gap-5">
          <SearchBoxMain />

          <div className="grid grid-cols-4 gap-6">
            <div className="col-span-1">
              <FilterPanel />
            </div>

            <div className="col-span-3 bg-[#fef6e4] p-6 rounded-lg">
              <HotelDetailMain hotelData={hotelData} />
              <div className="flex gap-6 mt-6">
                <div className="w-1/2">
                  <HotelDetailMap location={{ lat: hotelData.lat, lng: hotelData.lng }} />
                </div>
                <div className="w-1/2">
                  <HotelDetailReview reviews={hotelData.reviews} />
                </div>
              </div>
              <HotelDetailRoom rooms={hotelData.rooms} />
            </div>
          </div>

          <div className="grid grid-cols-4 gap-6 mb-10">
            <div className="col-span-1"></div>
            <div className="col-span-3 bg-[#fef6e4] rounded-lg p-6">
              <HotelDetailRecommend />
            </div>
          </div>
        </div>
        <PictureSlide />
      </div>
      <Footer />
    </div>
  );
}

export default SelectHotelDetail;
