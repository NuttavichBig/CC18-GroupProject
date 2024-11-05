// HotelSelected.jsx
import React, { useState } from 'react';
import axios from 'axios';

import PictureSlide from '../../Components/Nav-Footer-Chat/PictureSlide';
import Footer from '../../Components/Nav-Footer-Chat/Footer';
import FilterPanel from '../../Components/FilterSearch/FilterPanel';
import HeaderUserPage from '../../Components/Nav-Footer-Chat/HeaderUserPage';
import HotelList from '../../Components/HotelListSelectHotel/HotelList';
import SearchBoxMain from '../../Components/FilterSearch/SearchBoxMain';

const SelectHotel = () => {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSelectLocation = async(location) => {
    console.log('location:', location);
    setLoading(true);
    setError('');
    try {
      const res = await  axios.get('http://localhost:8000/hotel',{
        params:{
          lat:location.lat,
          lng:location.lng
        }
      })
      setLocations(res.data.hotels || []);
    }catch(error){
      console.log('fail to fetch',error)
      setError('Error fetching data');
    }finally{
      setLoading(false);
    }
  }

  return (
    <div>
      <div className='bg-gray-400 relative h-[100px]'>
        <HeaderUserPage />
      </div>
      <div className='min-h-screen relative bg-[#f9f9f9] flex justify-center items-start'>
        <div className="container mx-auto p-6 grid gap-5">
          <SearchBoxMain onLocationSelect={handleSelectLocation}/>

          <div className="grid grid-cols-4 gap-6">
            <div className="col-span-1 h-full w-full">
              <FilterPanel />
            </div>


            <div className="col-span-3 mb-[500px]">
              <HotelList hotels={locations}/>
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
