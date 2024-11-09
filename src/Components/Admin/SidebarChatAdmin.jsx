import React from "react";
import userchat from "../../assets/userchat.png";
import useAdminStore from "../../stores/socket-store";
import { useShallow } from "zustand/shallow";

export default function SidebarChatAdmin({ chatBoxList }) {
  const {chatRoom,setChatBox} = useAdminStore(useShallow(state=>({
    chatRoom : state.chatRoom,
    setChatBox : state.setChatBox
  })))
  return (
    <>
      <div className="bg-[#F8F4E1] p-10 rounded-lg shadow-lg">
        <div className="flex flex-col gap-8 pb-8">
          {chatBoxList.map((item,index) =>

            <div className="flex gap-4 cursor-pointer" key={index} onClick={()=>{
              if(chatRoom){
                if(item.id === chatRoom.id) return
              }
              setChatBox(item.id)
                }}>
              
              <img src={item.user.image ||userchat} alt="" className="w-[50px]" />
              <div>
                <p className="font-bold">{item.user.email}</p>
                <p>{item.messages.message}</p>
              </div>
            </div>
          )}

        </div>
      </div >
    </>
  );
}
