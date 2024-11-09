import React, { useEffect, useState } from "react";
import booking from "../../assets/booking.png";
import hotel from "../../assets/hotel.png";
import star from "../../assets/star.png";
import user from "../../assets/user.png";
import AllChatAdmin from "../../pages/Admin/AllChatAdmin";
import useAdminStore from "../../stores/socket-store";
import { useShallow } from "zustand/shallow";

export default function DashboardAdmin({ }) {
  const { socket, connect,setChatBoxNull } = useAdminStore(useShallow(state => ({
    socket: state.socket,
    connect: state.connect,
    setChatBoxNull : state.setChatBoxNull
  })))
    const [chatBoxList , setChatBoxList] = useState([])
    const [chatOpen, setChatOpen] = useState(false);
  useEffect(() => {
    connect()
  }, [])
  useEffect(() => {
    if (socket) {
      socket.on('adminJoinComplete',(allLastMessage)=>{
        setChatBoxList(allLastMessage)
      })
      socket.emit('adminJoin')
      socket.on('userMessage',(data)=>{
        setChatBoxList(prevChatBoxList => {
          const newData = data.data;
          const indx = prevChatBoxList.findIndex(item => item.id === newData.id);
          let newArr = [...prevChatBoxList];
          if (indx !== -1) {
            newArr.splice(indx, 1);  // Remove the old item
          }
          newArr = [newData, ...newArr];  // Add the new item at the start
          return newArr;
        });
      })
      socket.on('userLeave',(delChat)=>{
        console.log('someone leave')
        setChatBoxList(prev=>{
          const newData = prev.filter(item=>item.id !== delChat.id)
          return newData
        })
        setChatBoxNull()
      })
    }
    return (() => {
      if (socket) {
        socket.off('userMessage')
        socket.off('userLeave')
      }
    })
  }, [socket])
  return (
    <>
      {chatOpen && <AllChatAdmin setChatOpen={setChatOpen} chatBoxList={chatBoxList} />}  
      <div className="p-8 min-h-screen ">
        <p className="text-2xl font-bold text-[#543310] mb-6">DASHBOARD</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <a
            href="bookingDetailAdmin"
            className="rounded-lg p-6  bg-[#F8F4E1] text-[#543310] font-semibold shadow-lg hover:bg-[#AF8F6F] hover:text-white transition-all duration-100 ease-in-out"
          >
            <div className="flex items-center gap-4">
              <img src={booking} alt="" className="w-16" />
              <span className="text-xl">TOTAL BOOKING</span>
            </div>
          </a>
          <a
            href="userDetailAdmin"
            className="rounded-lg p-6 bg-[#F8F4E1] text-[#543310] font-semibold shadow-lg hover:bg-[#AF8F6F] hover:text-white transition-all duration-100 ease-in-out"
          >
            <div className="flex items-center gap-4">
              <img src={user} alt="" className="w-16" />
              <span className="text-xl">TOTAL USERS</span>
            </div>
          </a>
          <a
            href="hotelDetailAdmin"
            className="rounded-lg p-6  bg-[#F8F4E1] text-[#543310] font-semibold shadow-lg hover:bg-[#AF8F6F] hover:text-white transition-all duration-100 ease-in-out"
          >
            <div className="flex items-center gap-4">
              <img src={hotel} alt="" className="w-16" />
              <span className="text-xl">TOTAL HOTELS</span>
            </div>
          </a>
          <a
            href="reviewDetailAdmin"
            className="rounded-lg p-6 bg-[#F8F4E1] text-[#543310] font-semibold shadow-lg hover:bg-[#AF8F6F] hover:text-white transition-all duration-100 ease-in-out"
          >
            <div className="flex items-center gap-4">
              <img src={star} alt="" className="w-16" />
              <span className="text-xl">TOTAL REVIEWS</span>
            </div>
          </a>
        </div>
        <div className="bg-[#F8F4E1] rounded-lg text-center p-6 mb-6">
          <div className="flex space-x-4 justify-around">
            <div className="flex flex-col justify-center items-center rounded-full border-4 border-[#AF8F6F] bg-[#F8F4E1] w-[200px] h-[200px] shadow-md">
              <p className="text-xl font-bold text-[#543310]">TOTAL CHATS</p>
              <p className="text-3xl font-bold text-[#543310]">{chatBoxList.length}</p>
            </div>
            <button
              onClick={() => {
                setChatOpen(true);
              }}
              className="relative flex flex-col justify-center items-center rounded-full p-6 border-4 border-[#AF8F6F] bg-[#F8F4E1] text-[#543310] font-semibold shadow-lg hover:bg-[#AF8F6F] hover:text-white transition-all duration-100 ease-in-out"
            >
              <p className="text-2xl font-bold ">WAITING CHAT</p>
              <p className="absolute top-8 right-5 transform translate-x-1/2 -translate-y-1/2 text-3xl font-bold text-[#FF0000] rounded-full border-4 border-[#AF8F6F] bg-[#F8F4E1] p-2">
                {(chatBoxList.filter(el=>el.isAdmin === false)).length}
              </p>
            </button>
          </div>
        </div>
        <div className="bg-[#F8F4E1] rounded-lg text-center p-6">
          <div className="flex space-x-4 justify-around">
            <div className="bg-[#F8F4E1] text-[#543310] font-semibold">
              <p className="text-2xl font-bold ">BOOKING EACH DAY</p>
              <p>IMAGE BAR GRAPH</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
