import React from "react";
import { Link } from "react-router-dom";

export default function NavbarAdmin() {
  return (
    <>
      <div className="bg-[#543310] p-8 rounded-lg shadow-lg flex justify-between items-center">
        <Link to={""} className="font-semibold text-lg text-[#F8F4E1] p-3 hover:bg-[#F8F4E1] hover:text-amber-950 transition-all duration-100 ease-in-out hover:rounded-lg">
          HOME
        </Link>
        <form action="" className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="SEARCH"
            className="bg-[#F8F4E1] border border-[#F8F4E1] rounded-lg p-3 w-64 focus:outline-none focus:ring-2 focus:ring-[#F8F4E1] text-center"
          />
          <button className="rounded-lg p-3 w-40 border-2 border-[#F8F4E1] bg-[#543310] text-[#F8F4E1] font-semibold shadow-lg hover:bg-[#F8F4E1] hover:text-amber-950 transition-all duration-100 ease-in-out">
            SEARCH
          </button>
        </form>
      </div>
    </>
  );
}
