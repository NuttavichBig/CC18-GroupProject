import React from "react";
import userchat from "../../assets/userchat.png";
import sent from "../../assets/sent.png";

export default function ChatAdmin() {
  return (
    <>
      <div className="bg-[#F8F4E1] p-10 rounded-lg shadow-lg flex flex-col justify-between w-[800px] h-[700px]">
        <div className="flex flex-col gap-8 overflow-auto">
          <div className="flex gap-4">
            <img src={userchat} alt="" className="w-[50px]" />
            <div>
              <p className="font-bold">UserNAME</p>
              <p>Message :</p>
            </div>
          </div>
          <div className="flex gap-2 justify-end">
            <div>
              <p className="font-bold">UserNAME</p>
              <p>Message :</p>
            </div>
            <img src={userchat} alt="" className="w-[50px]" />
          </div>

        </div>
        <form className="flex gap-2 mt-4">
          <input
            type="text"
            className="bg-[#F8F4E1] border-[#543310] border-2 rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-[#543310] text-center shadow-lg flex-grow"
            placeholder="Type a message..."
          />
          <button className="flex items-center rounded-full bg-[#F8F4E1] text-[#543310] border-[#543310] border-2 font-semibold shadow-lg hover:bg-[#FFFECB] hover:text-[#543310] transition-all duration-300 ease-in-out p-2">
            <img src={sent} alt="" className="w-[20px]" />
          </button>
        </form>
      </div>
    </>
  );
}
