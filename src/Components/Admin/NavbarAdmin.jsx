import React from "react";

export default function NavbarAdmin() {
  return (
    <>
      <div className="bg-gradient-to-b from-[#0047AB] via-[#d7f5ff] to-[#002366] p-6 rounded-2xl shadow-2xl flex justify-between items-center">
        {/* Home Button */}
        <button className="font-semibold text-lg text-white p-3 hover:bg-blue-700 hover:text-white rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105">
          HOME
        </button>

        {/* Search Form */}
        <form action="" className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="SEARCH"
            className="bg-white border border-transparent rounded-lg p-3 w-64 focus:outline-none focus:ring-2 focus:ring-blue-500 text-center placeholder-gray-600"
          />
          <button className="rounded-lg p-3 w-40 border-2 border-white bg-blue-600 text-white font-semibold shadow-lg hover:bg-blue-700 hover:text-white transition-all duration-300 ease-in-out transform hover:scale-105">
            SEARCH
          </button>
        </form>
      </div>
    </>
  );
}
