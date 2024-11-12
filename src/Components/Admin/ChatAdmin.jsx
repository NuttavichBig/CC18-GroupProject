import React, { useEffect, useRef, useState } from "react";
import sent from "../../assets/sent.png";
import useAdminStore from "../../stores/socket-store";
import { useShallow } from "zustand/shallow";
import userChat2 from "../../assets/userchat2.png";

export default function ChatAdmin() {
  const { socket, chatRoom, addMessage } = useAdminStore(useShallow(state => ({
    socket: state.socket,
    chatRoom: state.chatRoom,
    addMessage: state.addMessage
  })));
  const [input, setInput] = useState('');
  const chatBoxRef = useRef(null);

  useEffect(() => {
    if (socket) {
      socket.on('message', (msg) => {
        addMessage(msg.data);
      });
    }
    return () => {
      if (socket) {
        socket.off('message');
      }
    };
  }, []);

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [chatRoom?.messages]);

  const hdlSendMessage = (e) => {
    e.preventDefault();
    if (socket) {
      socket.emit('message', input);
      setInput('');
    }
  };

  const hdlChange = (e) => {
    setInput(e.target.value);
  };

  return (
    <div className="bg-white p-8 shadow-lg flex flex-col justify-between w-[800px] h-[700px] rounded-md">
      <div className="flex-1 overflow-y-auto space-y-4 p-4" ref={chatBoxRef}>
        {chatRoom !== null && chatRoom.messages.map((message, index) =>
          <div key={index} className={`flex gap-4 ${message.isAdmin ? 'flex-row-reverse' : 'justify-start'}`}>
            <img src={message.isAdmin ? userChat2 : chatRoom?.user?.image || userChat2} alt="" className="h-12 w-12 rounded-full border border-gray-300" />
            <div>
              <p className={`font-semibold ${message.isAdmin ? 'text-end text-blue-600' : 'text-start text-gray-700'}`}>
                {message.isAdmin ? 'Support' : chatRoom?.user?.email || 'guest'}
              </p>
              <p className={`p-3 rounded-lg shadow-sm ${message.isAdmin ? 'bg-gray-200 text-end' : 'bg-blue-100 text-start'}`}>
                {message.message}
              </p>
            </div>
          </div>
        )}
      </div>
      <form className="flex gap-3 mt-4" onSubmit={hdlSendMessage}>
        <input
          type="text"
          className="flex-grow p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
          placeholder="Type a message..."
          onChange={hdlChange}
          value={input}
        />
        <button className="bg-blue-500 p-3 rounded-full hover:bg-blue-600 transition shadow-lg">
          <img src={sent} alt="Send" className="w-6 h-6" />
        </button>
      </form>
    </div>
  );
}
