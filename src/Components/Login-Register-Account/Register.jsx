import React from "react";
import travellogo from "../../assets/TRAVELHOMELOGO-USER.png";

const Register = ({ setIsRegisterModalOpen }) => {
  return (
    <div
      onClick={() => setIsRegisterModalOpen(false)}
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
    >
      <div className="bg-[#FFF8EB] rounded-lg shadow-lg p-8 w-full max-w-2xl relative flex">
        <button
          onClick={() => setIsRegisterModalOpen(false)}
          className="absolute top-4 right-4 text-gray-600 hover:text-red-500 focus:outline-none"
        >
          ✕
        </button>

        <div className="absolute top-[-3rem] left-1/2 transform -translate-x-1/2">
          <img
            src={travellogo}
            alt="Travel Logo"
            className="w-20 h-20 rounded-lg shadow-lg bg-[#FFF8EB]"
          />
        </div>

        <div className="w-1/2 pr-4 mt-2">
          <img
            src="/1.jpg"
            alt="Hotel Preview"
            className="w-full h-full rounded-lg object-cover"
          />
        </div>

        <div className="w-1/2 pl-4 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                First Name
              </label>
              <input
                type="text"
                placeholder="First Name"
                className="bg-[#FFE4B0] w-full p-3 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <input
                type="text"
                placeholder="Last Name"
                className="bg-[#FFE4B0] w-full p-3 border rounded-lg"
              />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Day
              </label>
              <input
                type="text"
                placeholder="Day"
                className="bg-[#FFE4B0] w-full p-3 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Month
              </label>
              <input
                type="text"
                placeholder="Month"
                className="bg-[#FFE4B0] w-full p-3 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Year
              </label>
              <input
                type="text"
                placeholder="Year"
                className="bg-[#FFE4B0] w-full p-3 border rounded-lg"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              placeholder="Email"
              className="bg-[#FFE4B0] w-full p-3 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone
            </label>
            <input
              type="text"
              placeholder="Phone"
              className="bg-[#FFE4B0] w-full p-3 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Gender
            </label>
            <div className="flex space-x-4">
              <label>
                <input type="radio" name="gender" /> Male
              </label>
              <label>
                <input type="radio" name="gender" /> Female
              </label>
              <label>
                <input type="radio" name="gender" /> Other
              </label>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              placeholder="Password"
              className="bg-[#FFE4B0] w-full p-3 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="Confirm Password"
              className="bg-[#FFE4B0] w-full p-3 border rounded-lg"
            />
          </div>
          <button className="w-full flex items-center justify-center p-3 border-2 border-black rounded-lg bg-[#FFF8EB] mt-4">
            <span className="mr-2">🌐</span> Continue with Google
          </button>
        </div>

        <div className="absolute bottom-[-25px] left-1/2 transform -translate-x-1/2">
          <button className="bg-orange-500 text-white font-bold px-6 py-3 rounded-lg shadow-lg">
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
