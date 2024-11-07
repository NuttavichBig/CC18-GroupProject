import React from "react";

export default function PartnerUpdate() {
  return (
    <>
      <form className="flex flex-col gap-6 text-[#543310]">
        <div className="flex flex-col items-center gap-4 border p-2 rounded-lg bg-[#F8F4E1]">
          <p className="text-lg font-semibold">PARTNER UPDATE</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <input
              type="text"
              placeholder="COMPANY NAME"
              className="bg-white border-2 border-[#543310] rounded-lg p-3 w-64 focus:outline-none focus:ring-2 focus:ring-[#F8F4E1] text-center"
            />
            <input
              type="text"
              placeholder="ADDRESS"
              className="bg-white border-2 border-[#543310] rounded-lg p-3 w-64 focus:outline-none focus:ring-2 focus:ring-[#F8F4E1] text-center"
            />
            <input
              type="text"
              placeholder="TAX NO."
              className="bg-white border-2 border-[#543310] rounded-lg p-3 w-64 focus:outline-none focus:ring-2 focus:ring-[#F8F4E1] text-center"
            />
            <input
              type="text"
              placeholder="BANK NAME"
              className="bg-white border-2 border-[#543310] rounded-lg p-3 w-64 focus:outline-none focus:ring-2 focus:ring-[#F8F4E1] text-center"
            />
            <input
              type="text"
              placeholder="BANK ACCOUNT"
              className="bg-white border-2 border-[#543310] rounded-lg p-3 w-64 focus:outline-none focus:ring-2 focus:ring-[#F8F4E1] text-center"
            />
          </div>
        <button className="mt-4 p-3 rounded-lg bg-[#543310] border-2 border-[#543310] text-white font-semibold shadow-lg hover:bg-[#FFDBB5] hover:text-[#543310] transition-all duration-300 ease-in-out">
          UPDATE
        </button>
        </div>
      </form>
    </>
  );
}
