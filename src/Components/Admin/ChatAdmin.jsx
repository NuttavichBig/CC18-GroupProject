import React, { useEffect, useRef, useState } from "react";
import userchat from "../../assets/userchat.png";
import sent from "../../assets/sent.png";
import useAdminStore from "../../stores/socket-store";
import { useShallow } from "zustand/shallow";

export default function ChatAdmin() {
  const { socket, chatRoom, addMessage } = useAdminStore(useShallow(state => ({
    socket: state.socket,
    chatRoom: state.chatRoom,
    addMessage: state.addMessage
  })))
  const [input,setInput] = useState('')
  const chatBoxRef = useRef(null);
  useEffect(() => {
    if (socket) {
      socket.on('message', (msg) => {
        console.log('this is message event')
        addMessage(msg.data)
      })
    }
    return (
      () => {
        if (socket) {
          socket.off('message')
        }
      }
    )
  }, [])
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [chatRoom?.messages]); 

  const hdlSendMessage = (e)=>{
    
    e.preventDefault()
    if(socket){
      socket.emit('message',(input))
      setInput('')
    }
  }
  const hdlChange = (e)=>{
    setInput(e.target.value)
  }
  return (
    <>
      <div className="bg-[#F8F4E1] p-10 rounded-lg shadow-lg flex flex-col justify-between w-[800px] h-[700px]">
        <div className="flex flex-col gap-8 overflow-auto " ref={chatBoxRef}>

          {chatRoom !== null && chatRoom.messages.map((message,index) =>
            <div key={index}className={`flex gap-4 ${message.isAdmin ? 'flex-row-reverse' : 'justify-start'}`}>
              <img src={message.isAdmin ? userchat : chatRoom?.user?.image || userchat} alt="" className="w-[50px]" />
              <div>
                <p className={`font-bold ${message?.isAdmin ? 'text-end':'text-start'}`}>{message?.isAdmin ? 'Support' : chatRoom?.user?.email || 'guest'}</p>
                <p className={` ${message?.isAdmin ? 'text-end':'text-start'}`}>{message?.message}</p>
              </div>
            </div>
          )}

        </div>
        <form className="flex gap-2 mt-4" onSubmit={hdlSendMessage} >
          <input
            type="text"
            className="bg-[#F8F4E1] border-[#543310] border-2 rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-[#543310] text-center shadow-lg flex-grow"
            placeholder="Type a message..."
            onChange={hdlChange}
            value={input}
          />
          <button className="flex items-center rounded-full bg-[#F8F4E1] text-[#543310] border-[#543310] border-2 font-semibold shadow-lg hover:bg-[#FFFECB] hover:text-[#543310] transition-all duration-300 ease-in-out p-2">
            <img src={sent} alt="" className="w-[20px]" />
          </button>
        </form>
      </div>
    </>
  );
}
