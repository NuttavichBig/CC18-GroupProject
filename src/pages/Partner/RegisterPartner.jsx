import React, { useState } from "react";
import HeaderUserPage from "../../Components/Nav-Footer-Chat/HeaderUserPage";
import Footer from "../../Components/Nav-Footer-Chat/Footer";
import HotelPartnerRegisterForm from "../../Components/Partner/HotelPartnerRegisterForm";
import UserHotelRegisterForm from "../../Components/Partner/UserHotelRegisterForm";
import RoomPartnerRegisterForm from "../../Components/Partner/RoomPartnerRegisterForm";
import PartnerRegisterComplete from "../../Components/Partner/PartnerRegisterComplete";

function RegisterPartner() {
  const [allFormData, setAllFormData] = useState({
    partner: null,
    hotel: null,
    room: null,
  });
  console.log(allFormData);
  const [page, setPage] = useState(1);
  return (
    <div>
      <HeaderUserPage />
      <div className="border-b mt-8 h-[100px]"></div>
      <div className="min-h-screen relative flex justify-center items-start">
        <div className="container mx-auto p-6 grid gap-5">
          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-3 h-full">
              <div className="pt-20">
                {page === 1 && (
                  <HotelPartnerRegisterForm
                    setAllFormData={setAllFormData}
                    setPage={setPage}
                    partnerData={allFormData.partner}
                  />
                )}
                {page === 2 && (
                  <UserHotelRegisterForm
                    setAllFormData={setAllFormData}
                    setPage={setPage}
                    hotelData={allFormData.hotel}
                  />
                )}
                {page === 3 && (
                  <RoomPartnerRegisterForm
                    setAllFormData={setAllFormData}
                    setPage={setPage}
                    allFormData={allFormData}
                  />
                )}
                {page === 4 && <PartnerRegisterComplete />}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="-mt-40">
        <Footer />
      </div>
    </div>
  );
}

export default RegisterPartner;
