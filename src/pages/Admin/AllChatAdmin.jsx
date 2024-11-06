import React, { useState } from "react";
import SidebarChatAdmin from "../../Components/Admin/SidebarChatAdmin";
import ChatAdmin from "../../Components/Admin/ChatAdmin";

export default function CreatePromotion({ setChatOpen }) {
  return (
    <div
      onClick={() => setChatOpen(false)}
      className="flex pt-8 justify-center fixed inset-0 bg-[#543310] z-50"
    >
      <div className=" relative" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={() => setChatOpen(false)}
          className="absolute top-0 right-0 text-3xl font-semibold text-[#F8F4E1] bg-transparent border-none cursor-pointer"
        >
          &times;
        </button>
        <div className="text-center mb-8">
          <p className="text-2xl font-bold text-[#F8F4E1]">Chat</p>
        </div>
        <div className="flex gap-2">
          <SidebarChatAdmin />
          <ChatAdmin />
        </div>
      </div>
    </div>
  );
}
