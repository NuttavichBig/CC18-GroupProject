import React from 'react';
import Unauthorizelogo from '../assets/Unauthorize.gif';
import HeaderUserPage from '../Components/Nav-Footer-Chat/HeaderUserPage';

export default function Unauthorization() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white">
      <HeaderUserPage />
      <h1 className="text-2xl font-semibold mb-4 text-gray-800">Unauthorization</h1>
      <img src={Unauthorizelogo} alt="Page Not Found" className="w-[600] h-[600px]" />
    </div>
  );
}
