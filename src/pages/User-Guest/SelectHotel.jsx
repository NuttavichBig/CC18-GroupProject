// HotelSelected.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PictureSlide from '../../Components/Nav-Footer-Chat/PictureSlide';
import Footer from '../../Components/Nav-Footer-Chat/Footer';
import FilterPanel from '../../Components/FilterSearch/FilterPanel';
import HeaderUserPage from '../../Components/Nav-Footer-Chat/HeaderUserPage';
import HotelList from '../../Components/HotelListSelectHotel/HotelList';
import SearchBoxMain from '../../Components/FilterSearch/SearchBoxMain';
import useUserStore from '../../stores/user-store';
import { useShallow } from 'zustand/shallow';
const API = import.meta.env.VITE_API

const SelectHotel = () => {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const {selectedLocation,filter} = useUserStore(useShallow(state=>({
    selectedLocation : state.selectedLocation,
    filter : state.filter
  })))
  useEffect(()=>{
    handleSearch()
  },[])

  const handleSearch = async() => {
    try {
    const {journeyDate,returnDate} = filter
      // console.log('location:', location);
    const params ={
      lat : selectedLocation.lat,
      lng : selectedLocation.lng
    }
    if(journeyDate){
      params.checkinDate = new Date(journeyDate)
    }
    if(returnDate){
      params.checkoutDate = new Date(returnDate)
    }
    
    setLoading(true);
    setError('');
      const res = await  axios.get(`${API}/hotel`,{
        params : params
      })
      console.log(res)
      setLocations(res.data.hotels || []);
    } catch (error) {
      console.log('fail to fetch', error)
      setError('Error fetching data');
    } finally {
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
          <SearchBoxMain handleSearch={handleSearch}/>

          <div className="grid grid-cols-4 gap-6">
            <div className="col-span-1 h-full w-full">
              <FilterPanel />
            </div>

            <div className="col-span-3 mb-[500px]">
              <HotelList hotels={locations} />
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
