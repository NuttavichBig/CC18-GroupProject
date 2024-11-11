import React, { useEffect, useState } from "react";
import usePartnerStore from "../../stores/partner-store";
import { useShallow } from "zustand/shallow";

export default function HotelUpdate() {
  const { hotel, updateHotel } = usePartnerStore(useShallow(state => ({
    hotel: state.hotel,
    updateHotel: state.updateHotel
  })))
  useEffect(() => {
    if (hotel) {
      setInput(prv => ({
        ...prv,
        name: hotel.name,
        detail: hotel.detail,
        address: hotel.address,
        lat: hotel.lat,
        lng: hotel.lng,
        star: hotel.star,
        checkinTime: hotel.checkinTime,
        checkoutTime: hotel.checkoutTime,
        phone: hotel.phone,
        webPage: hotel.webPage || '',
        img: hotel.img,
        facilitiesHotel: {
          isRoomService: hotel.facilitiesHotel.isRoomService,
          isReception: hotel.facilitiesHotel.isReception,
          isFitness: hotel.facilitiesHotel.isFitness,
          isParking: hotel.facilitiesHotel.isParking,
          isEVCharging: hotel.facilitiesHotel.isEVCharging,
          isSwimmingPool: hotel.facilitiesHotel.isSwimmingPool,
          isRestaurant: hotel.facilitiesHotel.isRestaurant,
          isBreakfast: hotel.facilitiesHotel.isBreakfast,
          isChildren: hotel.facilitiesHotel.isChildren,
          isPetFriendly: hotel.facilitiesHotel.isPetFriendly,
          isElevator: hotel.facilitiesHotel.isElevator,
        }
      }))
    }
  }, [hotel])
  const [input, setInput] = useState({
    name: '',
    detail: '',
    address: '',
    lat: 0,
    lng: 0,
    star: 0,
    checkinTime: '',
    checkoutTime: '',
    phone: '',
    webPage: '',
    img: '',
    file: null,
    facilitiesHotel: {
      isRoomService: false,
      isReception: false,
      isFitness: false,
      isParking: false,
      isEVCharging: false,
      isSwimmingPool: false,
      isRestaurant: false,
      isBreakfast: false,
      isChildren: false,
      isPetFriendly: false,
      isElevator: false,
    }
  })
  const [pageParam, setPageParam] = useState({
    isLoading: false,
    errMsg: '',
  })
  console.log(hotel)
  const hdlTextChange = (e) => {
    setInput(prv => ({ ...prv, [e.target.name]: e.target.value }))
  }
  const hdlFileChange = (e) => {
    setInput(prv => ({ ...prv, file: e.target.files[0] }))
  }
  const hdlClickCheck = (e) => {
    setInput(prv => ({ ...prv, facilitiesHotel: { ...prv.facilitiesHotel, [e.target.name]: e.target.checked } }))
  }

  const confirmUpdate = async (e) => {
    e.preventDefault()
    try {
      setPageParam(prv => ({ ...prv, isLoading: true }))
      const body = new FormData()
      body.append('name', input.name)
      body.append('detail', input.detail)
      body.append('address', input.address)
      body.append('lat', input.lat)
      body.append('lng', input.lng)
      body.append('star', input.star)
      body.append('checkinTime', input.checkinTime)
      body.append('checkoutTime', input.checkoutTime)
      body.append('phone', input.phone)
      body.append('webPage', input.webPage)
      Object.entries(input.facilitiesHotel).forEach(([key, value]) => {
        body.append(`facilitiesHotel[${key}]`, value)
      });
      if (input.file) {
        body.append('img', input.file)
      }
      await updateHotel(body)
      setPageParam(prv => ({ ...prv, errMsg: 'Update Completed' }))
    } catch (err) {
      const errMsg = err.response?.data?.message || err.message
      setPageParam(prv => ({ ...prv, errMsg }))
    } finally {
      setPageParam(prv => ({ ...prv, isLoading: false }))
    }

  }
  return (
    <>
      <form className="flex flex-col gap-6 text-[#543310]" onSubmit={confirmUpdate}>
        <div className="flex flex-col items-center gap-4 border p-2 rounded-lg bg-[#F8F4E1]">
          <p className="text-2xl w-full font-bold">HOTEL DETAIL</p>
          <div className="flex flex-col gap-2 w-full relative">
            <input type='file' id='input-file' className='hidden' onChange={hdlFileChange}></input>
            <div className="absolute bg-black bg-opacity-0 hover:bg-opacity-50 w-[640px] h-[420px] self-center rounded-xl cursor-pointer "
              onClick={() => document.getElementById('input-file').click()}>
              <p className="justify-center items-center flex text-4xl text-white w-full h-full opacity-0 hover:opacity-100">Click to upload</p>
            </div>
            <img src={input.file ? URL.createObjectURL(input.file) : input.img} alt="hotel image"
              className="w-[640px] h-[420px] rounded-xl shadow-lg object-cover self-center"
            />
            <div className="flex flex-col self-center">
              <p className="text-gray-500 text-sm s self-center">Hotel name</p>
              <input
                type="text"
                placeholder="HOTEL NAME"
                name="name"
                value={input.name}
                onChange={hdlTextChange}
                className="bg-white border-2 border-[#543310] rounded-lg p-3 w-64 focus:outline-none focus:ring-2 focus:ring-[#F8F4E1] text-center"
              />
            </div>
            <div className="flex flex-col">
              <p className="text-gray-500 text-sm self-center">Detail</p>
              <textarea
                className="bg-white border-2 border-[#543310] rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-[#F8F4E1]"
                placeholder="DETAIL"
                name="detail"
                value={input.detail}
                onChange={hdlTextChange}
                rows={input.detail.split('\n').length}
              ></textarea>
            </div>

            <hr className="border-2 border-gray-400 my-4" />
            <div className="flex w-full px-20 justify-between">
              <div className="flex flex-col gap-2 w-1/2">


                <div className="flex flex-col">
                  <p className="text-gray-500 text-sm">Star</p>
                  <input
                    type="number"
                    placeholder="STAR"
                    name="star"
                    min={1}
                    value={input.star}
                    onChange={hdlTextChange}
                    className="bg-white border-2 border-[#543310] rounded-lg p-3 w-64 focus:outline-none focus:ring-2 focus:ring-[#F8F4E1] text-center"
                  />
                </div>
                <div className="flex flex-col">
                  <p className="text-gray-500 text-sm">Address</p>
                  <input
                    type="text"
                    placeholder="ADDRESS"
                    name="address"
                    value={input.address}
                    onChange={hdlTextChange}
                    className="bg-white border-2 border-[#543310] rounded-lg p-3 w-64 focus:outline-none focus:ring-2 focus:ring-[#F8F4E1] text-center"
                  />
                </div>
                <div className="flex flex-col">
                  <p className="text-gray-500 text-sm">Check-in Time</p>
                  <input
                    type="text"
                    placeholder="CHECK-IN TIME"
                    name="checkinTime"
                    value={input.checkinTime}
                    onChange={hdlTextChange}
                    className="bg-white border-2 border-[#543310] rounded-lg p-3 w-64 focus:outline-none focus:ring-2 focus:ring-[#F8F4E1] text-center"
                  />
                </div>
                <div className="flex flex-col">
                  <p className="text-gray-500 text-sm">Check-out Time</p>
                  <input
                    type="text"
                    placeholder="CHECK-OUT TIME"
                    name="checkoutTime"
                    value={input.checkoutTime}
                    onChange={hdlTextChange}
                    className="bg-white border-2 border-[#543310] rounded-lg p-3 w-64 focus:outline-none focus:ring-2 focus:ring-[#F8F4E1] text-center"
                  />
                </div>
                <div className="flex flex-col">
                  <p className="text-gray-500 text-sm">Phone</p>
                  <input
                    type="text"
                    placeholder="PHONE"
                    name="phone"
                    value={input.phone}
                    onChange={hdlTextChange}
                    className="bg-white border-2 border-[#543310] rounded-lg p-3 w-64 focus:outline-none focus:ring-2 focus:ring-[#F8F4E1] text-center"
                  />
                </div>
                <div className="flex flex-col">
                  <p className="text-gray-500 text-sm">Web page</p>
                  <input
                    type="text"
                    placeholder="WEBSITE HOTEL"
                    name="webPage"
                    value={input.webPage}
                    onChange={hdlTextChange}
                    className="bg-white border-2 border-[#543310] rounded-lg p-3 w-64 focus:outline-none focus:ring-2 focus:ring-[#F8F4E1] text-center"
                  />
                </div>
              </div>
              <div className="w-1/5 my-auto flex flex-col gap-2">
                <label className='flex gap-2 items-center text-center'>
                  <input type="checkbox" name="isRoomService" value={input.facilitiesHotel.isRoomService}
                    onChange={hdlClickCheck} checked={input.facilitiesHotel.isRoomService} />Room Service
                </label>
                <label className='flex gap-2 items-center text-center'>
                  <input type="checkbox" name="isReception" value={input.facilitiesHotel.isReception}
                    onChange={hdlClickCheck} checked={input.facilitiesHotel.isReception} />Reception
                </label>
                <label className='flex gap-2 items-center text-center'>
                  <input type="checkbox" name="isFitness" value={input.facilitiesHotel.isFitness}
                    onChange={hdlClickCheck} checked={input.facilitiesHotel.isFitness} />Fitness
                </label>
                <label className='flex gap-2 items-center text-center'>
                  <input type="checkbox" name="isParking" value={input.facilitiesHotel.isParking}
                    onChange={hdlClickCheck} checked={input.facilitiesHotel.isParking} />Parking
                </label>
                <label className='flex gap-2 items-center text-center'>
                  <input type="checkbox" name="isEVCharging" value={input.facilitiesHotel.isEVCharging}
                    onChange={hdlClickCheck} checked={input.facilitiesHotel.isEVCharging} />EVCharging
                </label>
                <label className='flex gap-2 items-center text-center'>
                  <input type="checkbox" name="isSwimmingPool" value={input.facilitiesHotel.isSwimmingPool}
                    onChange={hdlClickCheck} checked={input.facilitiesHotel.isSwimmingPool} />Swimming Pool
                </label>
                <label className='flex gap-2 items-center text-center'>
                  <input type="checkbox" name="isRestaurant" value={input.facilitiesHotel.isRestaurant}
                    onChange={hdlClickCheck} checked={input.facilitiesHotel.isRestaurant} />Restaurant
                </label>
                <label className='flex gap-2 items-center text-center'>
                  <input type="checkbox" name="isBreakfast" value={input.facilitiesHotel.isBreakfast}
                    onChange={hdlClickCheck} checked={input.facilitiesHotel.isBreakfast} />Breakfast
                </label>
                <label className='flex gap-2 items-center text-center'>
                  <input type="checkbox" name="isChildren" value={input.facilitiesHotel.isChildren}
                    onChange={hdlClickCheck} checked={input.facilitiesHotel.isChildren} />Children
                </label>
                <label className='flex gap-2 items-center text-center'>
                  <input type="checkbox" name="isPetFriendly" value={input.facilitiesHotel.isPetFriendly}
                    onChange={hdlClickCheck} checked={input.facilitiesHotel.isPetFriendly} />Pet Friendly
                </label>
                <label className='flex gap-2 items-center text-center'>
                  <input type="checkbox" name="isElevator" value={input.facilitiesHotel.isElevator}
                    onChange={hdlClickCheck} checked={input.facilitiesHotel.isElevator} />Elevator
                </label>
              </div>
            </div>
            <hr className="border-2 border-gray-400 mt-4" />
          </div>
          <p className={`text-sm ${pageParam.errMsg === 'Update Completed' ? 'text-green-400' : 'text-red-500'}`}>{pageParam.errMsg}</p>
          {pageParam.isLoading ?
            <p>Loading ...</p>
            :
            <button className="mt-4 p-3 rounded-lg bg-[#543310] border-2 border-[#543310] text-white font-semibold shadow-lg hover:bg-[#FFDBB5] hover:text-[#543310] transition-all duration-300 ease-in-out">
              UPDATE
            </button>
          }
        </div>
      </form>
    </>
  );
}
