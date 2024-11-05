import React from "react";

export default function AllChatAdmin({ setChatOpen }) {
  return (
    <>
      <div
        onClick={() => setChatOpen(false)}
        className=" text-[#543310] flex items-center justify-center top-0 left-0 z-50 bg-[#F8F4E1] w-screen h-screen fixed"
      >
        <div
          className="border-none px-8 py-8 rounded-xl bg-[#AF8F6F] shadow-xl flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          <p className="text-3xl text-center font-bold pb-10">CHAT</p>
        </div>
      </div>
    </>
  );
}
