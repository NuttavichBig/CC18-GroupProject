import React from 'react';
import Unauthorizelogo from '../assets/Unauthorize.gif';
import HeaderUserPage from '../Components/Nav-Footer-Chat/HeaderUserPage';

export default function Unauthorization() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white">
      <HeaderUserPage />
          <img src={Unauthorizelogo} alt="Page Not Found" className="w-[600] h-[600px]" />
    </div>
  );
}
