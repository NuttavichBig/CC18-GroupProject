import React from "react";
import userChat2 from "../../assets/userChat2.png";
import useAdminStore from "../../stores/socket-store";
import { useShallow } from "zustand/shallow";

export default function SidebarChatAdmin({ chatBoxList }) {
  const { chatRoom, setChatBox } = useAdminStore(useShallow(state => ({
    chatRoom: state.chatRoom,
    setChatBox: state.setChatBox
  })));
  return (
    <div className="w-1/4 bg-white p-4 border-r border-gray-300 overflow-y-auto rounded-md shadow-md">
      <h2 className="text-lg font-semibold border-b border-gray-300 mb-4">Recent Chats</h2>
      <div className="flex flex-col gap-4 pb-8">
        {chatBoxList.map((item, index) =>
          <div
            key={index}
            className={`flex items-center gap-4 p-3 cursor-pointer rounded-md overflow-hidden hover:bg-blue-50 transition ${
              chatRoom && item.id === chatRoom.id ? "bg-blue-100" : ""
            }`}
            onClick={() => {
              if (chatRoom && item.id === chatRoom.id) return;
              setChatBox(item.id);
            }}
          >
            <img src={item?.user?.image || userChat2} alt="" className="w-[50px] h-[50px] rounded-full border-2 border-gray-200" />
            <div>
              <p className="font-bold text-gray-700">{item?.user?.email || 'guest'}</p>
              <p className="text-gray-500 text-sm truncate">{item?.messages[0]?.message || ''}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
