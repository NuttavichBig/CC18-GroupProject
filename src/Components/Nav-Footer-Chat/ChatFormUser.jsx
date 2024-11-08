import React, { useState } from "react";
import chat from "../../assets/chat.png";

export default function ChatFormUser() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = () => {
    if (input.trim()) {
      setMessages([...messages, input]);
      setInput("");
    }
  };

  return (
    <>
      <div className="fixed bottom-5 right-5">
        <button
          onClick={toggleChat}
          className="bg-white text-white px-4 py-2 rounded-full shadow-lg hover:bg-orange-300 transition duration-200"
        >
          {isOpen ? (
            <img src={chat} alt="Close Chat" className="w-[40px] h-[40px]" />
          ) : (
            <img src={chat} alt="Open Chat" className="w-[40px] h-[40px]" />
          )}
        </button>

        {isOpen && (
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

            <div className="flex-1 p-4 overflow-y-auto">
              {messages.length ? (
                messages.map((message, index) => (
                  <div
                    key={index}
                    className="bg-orange-100 p-2 my-1 rounded-lg"
                  >
                    {message}
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center">No messages yet.</p>
              )}
            </div>

            <div className="p-3 border-t border-gray-300">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
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
