import React from 'react';
import travellogo from '../../assets/TRAVELHOMELOGO-USER.png';

const Login = ({ onClose }) => {
  const handleClickOutside = (e) => {
    if (e.target.id === "modal-overlay") {
      onClose();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();


    console.log("Form submitted");
    onClose();

  };

  return (
    <div
      id="modal-overlay"
      onClick={handleClickOutside}
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
    >
      <form
        onSubmit={handleSubmit}
        className="bg-[#FFF8EB] rounded-lg shadow-lg p-8 w-full max-w-2xl relative flex"
      >

        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-red-500 focus:outline-none transition duration-200"
        >
          ✕
        </button>


        <div className="absolute top-[-3rem] left-1/2 transform -translate-x-1/2">
          <img
            src={travellogo}
            alt="Travel Logo"
            className="w-[100px] h-[100px] rounded-lg shadow-lg bg-[#FFF8EB]"
          />
        </div>


        <div className="w-1/2 pr-4 mt-6">
          <img
            src="/1.jpg"
            alt="Hotel Preview"
            className="w-full h-full rounded-lg object-cover"
          />
        </div>

        <div className="w-1/2 pl-4 space-y-4">
          <div className="mt-8 space-y-4">
            <label>Email</label>
            <input
              type="email"
              placeholder="Email"
              className="bg-[#FFE4B0] w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
            <label className="block mt-4">Password</label>
            <input
              type="password"
              placeholder="Password"
              className="bg-[#FFE4B0] w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>
          <div className="text-right text-xs text-gray-500 cursor-pointer hover:underline">
            Forget Password
          </div>


          <button
            type="button"
            className="w-full flex items-center justify-center p-3  border-2 border-black rounded-lg  shadow-md hover:bg-gray-100 transition bg-[#FFF8EB]"
          >
            <span className="mr-2">🌐</span>
            <span className="font-medium">Continue with Google</span>
          </button>
        </div>


        <div className="absolute bottom-[-29px] left-1/2 transform -translate-x-1/2">
          <button
            type="submit"
            className="bg-orange-500 text-white font-bold px-6 py-3 rounded-lg shadow-lg hover:bg-orange-600 transition"
          >
            LOGIN
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
