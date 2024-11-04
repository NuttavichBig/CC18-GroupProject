// HotelSelected.jsx
import React from 'react';

import HomePageSearchBox from '../../Components/FilterSearch/HomePageSearchBox';
import PictureSlide from '../../Components/Nav-Footer-Chat/PictureSlide';
import Footer from '../../Components/Nav-Footer-Chat/Footer';
import FilterPanel from '../../Components/FilterSearch/FilterPanel';
import HeaderUserPage from '../../Components/Nav-Footer-Chat/HeaderUserPage';

const SelectHotel = () => {
  return (
    <div>
      <div className='bg-gray-400 relative h-[100px]'>
        <HeaderUserPage />
      </div>
      <div className='min-h-screen relative bg-[#f9f9f9] flex justify-center items-start'>
        <div className="container mx-auto p-6 grid gap-5">
          <HomePageSearchBox />

          <div className="grid grid-cols-4 gap-6">
            <div className="col-span-1 h-full w-full">
              <FilterPanel />
            </div>


            <div className="col-span-3 mb-[500px]">
              {/* <HotelList /> */}
            </div>

          </div>
        </div>
      </div>
      <PictureSlide />
      <Footer />
    </div>
  );
};

export default SelectHotel;
