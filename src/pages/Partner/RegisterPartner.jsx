import React, { useState } from "react";
import HeaderUserPage from "../../Components/Nav-Footer-Chat/HeaderUserPage";
import Footer from "../../Components/Nav-Footer-Chat/Footer";
import HotelPartnerRegisterForm from "../../Components/Partner/HotelPartnerRegisterForm";
import UserHotelRegisterForm from "../../Components/Partner/UserHotelRegisterForm";
import RoomPartnerRegisterForm from "../../Components/Partner/RoomPartnerRegisterForm";

function RegisterPartner() {
  const [allFormData , setAllFormData] =useState({
    partner : null,
    hotel : null,
    room : null
  })
  console.log(allFormData)
  const [page,setPage] = useState(1)
  return (
    <div>
      <div className="bg-gray-400 relative h-[100px]">
        <HeaderUserPage />
      </div>
      <div className="min-h-[] relative bg-[#f9f9f9] flex justify-center items-start">
        <div className="container mx-auto p-6 py-24 grid gap-5">
          {/* <SearchBoxMain /> */}

          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-3 h-full">
              <div>{
                page === 1 &&
                <HotelPartnerRegisterForm  setAllFormData={setAllFormData} setPage={setPage} partnerData={allFormData.partner}/>
                }
                  {
                    page === 2 &&
                    <UserHotelRegisterForm setAllFormData={setAllFormData} setPage={setPage} hotelData={allFormData.hotel}/>
                  }
                  {
                    page === 3 &&
                    <RoomPartnerRegisterForm setAllFormData={setAllFormData} setPage={setPage} allFormData={allFormData}/>
                  }
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="-mt-8">
        <Footer />
      </div>
    </div>
  );
}

export default RegisterPartner;
