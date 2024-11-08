import React, { useEffect, useRef, useState } from "react";
import chat from "../../assets/chat.png";
import { io } from "socket.io-client";
import useUserStore from "../../stores/user-store";
import { useShallow } from "zustand/shallow";
const API = import.meta.env.VITE_API
export default function ChatFormUser() {
  const [pageParams, setPageParams] = useState({
    isOpen: false,
    messages: [],
    input: ''
  })
  const chatBoxRef = useRef(null);
  const [socket, setSocket] = useState(null)
  const { token } = useUserStore(useShallow(state => ({
    token: state.token
  })))
  useEffect(() => {
    let socket = null
    if (token) {
      socket = io(API, {
        extraHeaders: {
          Authorization: `Bearer ${token}`
        },
      });
    } else {
      socket = io(API)
    }
    setSocket(socket)
  }, [])
  useEffect(() => {
    if (socket) {
      socket.on('joinComplete', (data) => {
        console.log(data.message)
      })
      socket.on('message', (data) => {
        setPageParams(prv => ({ ...prv, messages: [...prv.messages, data.data] }))
      })
      socket.emit('joinChat')
    }
    return (
      () => {
        if (socket) {
          socket.off('joinComplete')
          socket.off('message')
        }
      }
    )
  }, [socket])
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [pageParams?.messages]); 
  const toggleChat = () => {
    setPageParams({ ...pageParams, isOpen: !pageParams.isOpen });
  };

  const handleSendMessage = () => {
    if (socket) {
      if (pageParams.input.trim()) {
        socket.emit('message', (pageParams.input))
        setPageParams({ ...pageParams, input: '' })
      }
    }
  };
  return (
    <>
      <div className="fixed bottom-5 right-5">
        <button
          onClick={toggleChat}
          className="bg-white text-white px-4 py-2 rounded-full shadow-lg hover:bg-orange-300 transition duration-200"
        >
          {pageParams.isOpen ? (
            <img src={chat} alt="Close Chat" className="w-[40px] h-[40px]" />
          ) : (
            <img src={chat} alt="Open Chat" className="w-[40px] h-[40px]" />
          )}
        </button>

        {pageParams.isOpen && (
          <div className="w-80 h-96 bg-white rounded-lg shadow-lg flex flex-col mt-3">
            <div className="bg-orange-500 text-white p-4 rounded-t-lg flex justify-between items-center">
              <h2 className="font-bold">Chat</h2>
              <button
                onClick={toggleChat}
                className="text-white hover:text-gray-200 transition"
              >
                ✖
              </button>
            </div>

            <div className="flex-1 p-4 overflow-y-auto flex-col" ref={chatBoxRef}>
              {pageParams.messages.length ? (
                pageParams.messages.map((item, index) =>
                  <div key={index} className={`${item.isAdmin ? 'justify-end' : 'justify-start'} flex`}>
                    <div
                      className={`${item.isAdmin ? 'bg-slate-100' : 'bg-orange-100'} p-2 my-1 rounded-lg w-fit`}
                    >
                      {item.message}
                    </div>
                  </div>
                )
              ) : (
                <p className="text-gray-500 text-center">No messages yet.</p>
              )}
            </div>

            <div className="p-3 border-t border-gray-300">
              <input
                name="input"
                type="text"
                value={pageParams.input}
                onChange={(e) => setPageParams({ ...pageParams, [e.target.name]: e.target.value })}
                placeholder="Type a message..."
                className="w-full p-2 border rounded-lg focus:outline-none focus:border-orange-500"
              />
              <button
                onClick={handleSendMessage}
                className="w-full mt-2 bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition duration-200"
              >
                Send
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
