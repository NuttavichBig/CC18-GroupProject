import React, { useState } from "react";
import travellogo from "../../assets/TRAVELHOMELOGO-USER.png";
import { useShallow } from "zustand/shallow";
import useUserStore from "../../stores/user-store";

const Register = ({ setIsRegisterModalOpen }) => {
  const [input, setInput] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    gender: "MALE",
    password: "",
    confirmPassword: "",
    date: 1,
    month: 1,
    year: 1998,
    err: "",
  });
  const { register, login } = useUserStore(
    useShallow((state) => ({
      register: state.register,
      login: state.login,
    }))
  );
  const hdlChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const hdlCheck = (e) => {
    if (e.target.checked) {
      setInput({ ...input, [e.target.name]: e.target.value });
    }
  };
  const hdlRegister = async (e) => {
    try {
      e.stopPropagation();
      const { date, month, year, err, ...body } = input;
      body.birthdate = `${year}-${month.toString().padStart(2, "0")}-${date
        .toString()
        .padStart(2, "0")}`;
      await register(body);
      console.log("after registered");
      await login({ email: body.email, password: body.password });
      setIsRegisterModalOpen(false);
    } catch (err) {
      const errMsg = err?.response?.data?.message || err.message;
      setInput((prv) => ({ ...prv, err: errMsg }));
    }
  };
  return (
    <div
      onClick={() => setIsRegisterModalOpen(false)}
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 text-[#543310]"
    >
      <div
        className="bg-[#FFF8EB] rounded-lg shadow-lg p-12 w-full max-w-4xl relative flex"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setIsRegisterModalOpen(false)}
          className="absolute top-4 right-4 text-gray-600 hover:text-red-500 focus:outline-none"
        >
          ✕
        </button>

        <div className="absolute top-[-4rem] left-1/2 transform -translate-x-1/2">
          <img
            src={travellogo}
            alt="Travel Logo"
            className="w-[100px] h-[100px] rounded-lg shadow-lg bg-[#FFF8EB]"
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
              <label className="block text-sm pb-2">First Name</label>
              <input
                name="firstName"
                type="text"
                placeholder="First Name"
                className="bg-[#FFE4B0] w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                onChange={hdlChange}
                value={input.firstName}
              />
            </div>
            <div>
              <label className="block text-sm pb-2">Last Name</label>
              <input
                name="lastName"
                type="text"
                placeholder="Last Name"
                className="bg-[#FFE4B0] w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                onChange={hdlChange}
                value={input.lastName}
              />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm pb-2">Day</label>
              <input
                name="date"
                type="text"
                placeholder="Day"
                className="bg-[#FFE4B0] w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                onChange={hdlChange}
                value={input.date}
              />
            </div>
            <div>
              <label className="block text-sm pb-2">Month</label>
              <input
                name="month"
                type="text"
                placeholder="Month"
                className="bg-[#FFE4B0] w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                onChange={hdlChange}
                value={input.month}
              />
            </div>
            <div>
              <label className="block text-sm pb-2">Year</label>
              <input
                name="year"
                type="text"
                placeholder="Year"
                className="bg-[#FFE4B0] w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                onChange={hdlChange}
                value={input.year}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm pb-2">Email</label>
            <input
              name="email"
              type="email"
              placeholder="Email"
              className="bg-[#FFE4B0] w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              onChange={hdlChange}
              value={input.email}
            />
          </div>
          <div>
            <label className="block text-sm pb-2">Phone</label>
            <input
              name="phone"
              type="text"
              placeholder="Phone"
              className="bg-[#FFE4B0] w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              onChange={hdlChange}
              value={input.phone}
            />
          </div>
          <div>
            <label className="block text-sm pb-2">Gender</label>
            <div className="flex space-x-4">
              <label>
                <input
                  type="radio"
                  name="gender"
                  value={"MALE"}
                  onChange={hdlCheck}
                  defaultChecked={true}
                />{" "}
                Male
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value={"FEMALE"}
                  onChange={hdlCheck}
                />{" "}
                Female
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value={"OTHER"}
                  onChange={hdlCheck}
                />{" "}
                Other
              </label>
            </div>
          </div>
          <div>
            <label className="block text-sm pb-2">Password</label>
            <input
              name="password"
              type="password"
              placeholder="Password"
              className="bg-[#FFE4B0] w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              onChange={hdlChange}
              value={input.password}
            />
          </div>
          <div>
            <label className="block text-sm pb-2">Confirm Password</label>
            <input
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              className="bg-[#FFE4B0] w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              onChange={hdlChange}
              value={input.confirmPassword}
            />
          </div>
        </div>

        <div className="absolute bottom-[-20px] left-1/2 transform -translate-x-1/2">
          <button
            className="font-bold shadow-lg bg-gradient-to-t from-orange-400 to-orange-500 text-white p-2 outline-none border-none transition-transform duration-200 rounded-lg overflow-hidden hover:scale-105 w-28 h-10"
            onClick={hdlRegister}
          >
            REGISTER
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
