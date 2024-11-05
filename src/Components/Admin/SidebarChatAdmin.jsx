import React from "react";
import userchat from "../../assets/userchat.png";

export default function SidebarChatAdmin() {
  return (
    <>
      <div className="bg-[#F8F4E1] p-10 rounded-lg shadow-lg">
        <div className="flex flex-col gap-8 pb-8">
          <div className="flex gap-4">
            <img src={userchat} alt="" className="w-[50px]" />
            <div>
              <p className="font-bold">UserNAME</p>
              <p>Message : </p>
            </div>
          </div>
          <div className="flex gap-4">
            <img src={userchat} alt="" className="w-[50px]" />
            <div>
              <p className="font-bold">UserNAME</p>
              <p>Message : </p>
            </div>
          </div>
          <div className="flex gap-4">
            <img src={userchat} alt="" className="w-[50px]" />
            <div>
              <p className="font-bold">UserNAME</p>
              <p>Message : </p>
            </div>
          </div>
          <div className="flex gap-4">
            <img src={userchat} alt="" className="w-[50px]" />
            <div>
              <p className="font-bold">UserNAME</p>
              <p>Message : </p>
            </div>
          </div>
          <div className="flex gap-4">
            <img src={userchat} alt="" className="w-[50px]" />
            <div>
              <p className="font-bold">UserNAME</p>
              <p>Message : </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
