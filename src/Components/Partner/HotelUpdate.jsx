import React, { useEffect, useState } from "react";
import usePartnerStore from "../../stores/partner-store";
import { useShallow } from "zustand/shallow";
import Swal from "sweetalert2";
import FormErrorAlert from '../../assets/ErrorToast1.gif'
import FormSuccessAlert from '../../assets/SuccessToast.gif'

export default function HotelUpdate() {
  const { hotel, updateHotel } = usePartnerStore(useShallow(state => ({
    hotel: state.hotel,
    updateHotel: state.updateHotel
  })));

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
  });

  const [pageParam, setPageParam] = useState({
    isLoading: false,
    errMsg: '',
  });

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
  }, [hotel]);

  const hdlTextChange = (e) => {
    setInput(prv => ({ ...prv, [e.target.name]: e.target.value }));
  };

  const hdlFileChange = (e) => {
    setInput(prv => ({ ...prv, file: e.target.files[0] }));
  };

  const hdlClickCheck = (e) => {
    setInput(prv => ({ ...prv, facilitiesHotel: { ...prv.facilitiesHotel, [e.target.name]: e.target.checked } }));
  };

  const confirmUpdate = async (e) => {
    e.preventDefault();
    try {
      setPageParam(prv => ({ ...prv, isLoading: true }));
      const body = new FormData();
      body.append('name', input.name);
      body.append('detail', input.detail);
      body.append('address', input.address);
      body.append('lat', input.lat);
      body.append('lng', input.lng);
      body.append('star', input.star);
      body.append('checkinTime', input.checkinTime);
      body.append('checkoutTime', input.checkoutTime);
      body.append('phone', input.phone);
      body.append('webPage', input.webPage);
      Object.entries(input.facilitiesHotel).forEach(([key, value]) => {
        body.append(`facilitiesHotel[${key}]`, value);
      });
      if (input.file) {
        body.append('img', input.file);
      }
      await updateHotel(body);
      //alert success
      Swal.fire({
        html: `<div class="flex items-center gap-2">
           <img src="${FormSuccessAlert}" alt="Error Animation" class="w-10 h-10" />
           <span style="font-size: 16px; font-weight: bold; color: green;">Update Hotel Detail Success</span>
         </div>`,
        position: "top-end",
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false,
        toast: true,
        background: "#ffffff",
        didOpen: (toast) => {
          const progressBar = toast.querySelector(".swal2-timer-progress-bar");
          if (progressBar) {
            progressBar.style.backgroundColor = "green";
          }
          toast.addEventListener("click", Swal.close);
        },
      });

      setPageParam(prv => ({ ...prv, errMsg: 'Update Completed' }));
    } catch (err) {
      const errMsg = err.response?.data?.message || err.message;

      //alert error
      Swal.fire({
        html: `<div class="flex items-center gap-2">
           <img src="${FormErrorAlert}" alt="Error Animation" class="w-10 h-10" />
           <span style="font-size: 16px; font-weight: bold; color: red;">${errMsg}</span>
         </div>`,
        position: "top-end",
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false,
        toast: true,
        background: "#ffffff",
        didOpen: (toast) => {
          const progressBar = toast.querySelector(".swal2-timer-progress-bar");
          if (progressBar) {
            progressBar.style.backgroundColor = "#f44336";
          }
          toast.addEventListener("click", Swal.close);
        },
      });

      setPageParam(prv => ({ ...prv, errMsg }));
    } finally {
      setPageParam(prv => ({ ...prv, isLoading: false }));
    }
  };

  return (
    <form className="flex flex-col gap-6 text-[#543310]" onSubmit={confirmUpdate}>
      <div className="flex flex-col items-center gap-4 border p-4 rounded-lg bg-orange-50 shadow-lg ">
        <p className="text-2xl font-bold text-orange-500">HOTEL DETAIL</p>

        {/* Image Upload Section */}
        <div className="relative w-full flex flex-col items-center gap-2">
          <input type="file" id="input-file" className="hidden" onChange={hdlFileChange} />
          <div
            className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-50 rounded-xl flex items-center justify-center text-white text-4xl cursor-pointer transition-opacity duration-300"
            onClick={() => document.getElementById('input-file').click()}
          >
            <span className="opacity-0 hover:opacity-100">Click to upload</span>
          </div>
          <img src={input.file ? URL.createObjectURL(input.file) : input.img} alt="hotel"
            className="rounded-xl shadow-lg w-[640px] h-[420px] object-cover"
          />
        </div>

        {/* Hotel Details */}
        <div className="flex flex-col w-full lg:flex-row gap-6 mt-4">
          <div className="flex flex-col gap-4 w-full lg:w-1/2">
            <label className="text-gray-500 text-sm">Hotel Name</label>
            <input type="text" placeholder="HOTEL NAME" name="name" value={input.name} onChange={hdlTextChange}
              className="border border-orange-500 rounded-lg p-3 w-full focus:ring-2 focus:ring-orange-300"
            />

            <label className="text-gray-500 text-sm">Detail</label>
            <textarea placeholder="DETAIL" name="detail" value={input.detail} onChange={hdlTextChange}
              className="border border-orange-500 rounded-lg p-3 w-full focus:ring-2 focus:ring-orange-300"
              rows={input.detail.split('\n').length}
            ></textarea>

            <label className="text-gray-500 text-sm">Address</label>
            <input type="text" placeholder="ADDRESS" name="address" value={input.address} onChange={hdlTextChange}
              className="border border-orange-500 rounded-lg p-3 w-full focus:ring-2 focus:ring-orange-300"
            />

            <label className="text-gray-500 text-sm">Phone</label>
            <input type="text" placeholder="PHONE" name="phone" value={input.phone} onChange={hdlTextChange}
              className="border border-orange-500 rounded-lg p-3 w-full focus:ring-2 focus:ring-orange-300"
            />

            <label className="text-gray-500 text-sm">Website</label>
            <input type="text" placeholder="WEBSITE HOTEL" name="webPage" value={input.webPage} onChange={hdlTextChange}
              className="border border-orange-500 rounded-lg p-3 w-full focus:ring-2 focus:ring-orange-300"
            />
          </div>

          <div className="flex flex-col gap-4 w-full lg:w-1/2">
            <label className="text-gray-500 text-sm">Star Rating</label>
            <input type="number" placeholder="STAR" name="star" min={1} value={input.star} onChange={hdlTextChange}
              className="border border-orange-500 rounded-lg p-3 w-full focus:ring-2 focus:ring-orange-300"
            />

            <label className="text-gray-500 text-sm">Check-in Time</label>
            <input type="time" placeholder="CHECK-IN TIME" name="checkinTime" value={input.checkinTime} onChange={hdlTextChange}
              className="border border-orange-500 rounded-lg p-3 w-full focus:ring-2 focus:ring-orange-300"
            />

            <label className="text-gray-500 text-sm">Check-out Time</label>
            <input type="time" placeholder="CHECK-OUT TIME" name="checkoutTime" value={input.checkoutTime} onChange={hdlTextChange}
              className="border border-orange-500 rounded-lg p-3 w-full focus:ring-2 focus:ring-orange-300"
            />

            {/* Facilities Section */}
            <div className="flex flex-col mt-4">
              <p className="text-gray-500 text-sm">Facilities</p>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {Object.keys(input.facilitiesHotel).map(facilityKey => (
                  <label key={facilityKey} className="flex items-center gap-2">
                    <input type="checkbox" name={facilityKey} checked={input.facilitiesHotel[facilityKey]}
                      onChange={hdlClickCheck} className="form-checkbox text-orange-500 rounded"
                    />
                    {facilityKey.replace(/is/, '').replace(/([A-Z])/g, ' $1')}
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Update Button and Loading/Error Messages */}
        <p className={`text-sm mt-4 ${pageParam.errMsg === 'Update Completed' ? 'text-green-500' : 'text-red-500'}`}>
          {pageParam.errMsg}
        </p>

        {pageParam.isLoading ? (
          <p>Loading...</p>
        ) : (
          <button className="mt-4 p-3 rounded-lg bg-orange-500 text-white font-semibold shadow-lg hover:bg-orange-400 transition-all duration-300 ease-in-out">
            UPDATE
          </button>
        )}
      </div>
    </form>
  );
}
