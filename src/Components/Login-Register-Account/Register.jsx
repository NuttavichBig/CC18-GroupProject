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

  const [errMsg, setErrMsg] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    birthdate: "",
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
      validator();
      if (
        errMsg.firstName ||
        errMsg.lastName ||
        errMsg.birthdate ||
        errMsg.email ||
        errMsg.phone ||
        errMsg.password ||
        errMsg.confirmPassword
      ) {
        throw new Error("Please complete all your form");
      }
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

  const validator = () => {
    if (!input.firstName) {
      setErrMsg((prv) => ({ ...prv, firstName: "First name is required" }));
    } else {
      setErrMsg((prv) => ({ ...prv, firstName: "" }));
    }
    if (!input.lastName) {
      setErrMsg((prv) => ({ ...prv, lastName: "Last name is required" }));
    } else {
      setErrMsg((prv) => ({ ...prv, lastName: "" }));
    }
    if (!input.date || !input.month || !input.year) {
      setErrMsg((prv) => ({ ...prv, birthdate: "Birth day is required" }));
    } else if (
      input.date.length > 2 ||
      input.month.length > 2 ||
      !input.year.length > 4
    ) {
      setErrMsg((prv) => ({ ...prv, birthdate: "Birth day should be valid" }));
    } else {
      setErrMsg((prv) => ({ ...prv, birthdate: "" }));
    }
    if (!input.email) {
      setErrMsg((prv) => ({ ...prv, email: "Email should be provided" }));
    } else if (!input.email.includes("@")) {
      setErrMsg((prv) => ({ ...prv, email: "Email is invalid" }));
    } else {
      setErrMsg((prv) => ({ ...prv, email: "" }));
    }
    if (!input.phone) {
      setErrMsg((prv) => ({ ...prv, phone: "Phone should be provided" }));
    } else if (input.phone.length < 9 || input.phone.length > 10) {
      setErrMsg((prv) => ({ ...prv, phone: "Phone should be 9-10 number" }));
    } else {
      setErrMsg((prv) => ({ ...prv, phone: "" }));
    }
    if (!input.password) {
      setErrMsg((prv) => ({ ...prv, password: "Password should be provided" }));
    } else {
      setErrMsg((prv) => ({ ...prv, password: "" }));
    }
    if (!input.confirmPassword) {
      setErrMsg((prv) => ({
        ...prv,
        confirmPassword: "Confirm password should be provided",
      }));
    } else if (input.password !== input.confirmPassword) {
      setErrMsg((prv) => ({ ...prv, confirmPassword: "Password not match" }));
    } else {
      setErrMsg((prv) => ({ ...prv, confirmPassword: "" }));
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

        <div className="absolute top-[-3.5rem] left-1/2 transform -translate-x-1/2">
          <img
            src={travellogo}
            alt="Travel Logo"
            className="w-[90px] h-[90px] rounded-lg shadow-lg bg-[#FFF8EB]"
          />
        </div>

        <div className="w-1/2 pr-4 mt-2">
          <img
            src="/1.jpg"
            alt="Hotel Preview"
            className="w-full h-full rounded-lg object-cover"
          />
        </div>

        <div className="w-1/2 pl-4 space-y-1">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm pb-1">First Name</label>
              <input
                name="firstName"
                type="text"
                placeholder="First Name"
                className="bg-[#FFE4B0] w-full p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                onChange={hdlChange}
                value={input.firstName}
              />
              <p className="text-sm text-red-500">{errMsg.firstName}</p>
            </div>
            <div>
              <label className="block text-sm pb-1">Last Name</label>
              <input
                name="lastName"
                type="text"
                placeholder="Last Name"
                className="bg-[#FFE4B0] w-full p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                onChange={hdlChange}
                value={input.lastName}
              />
              <p className="text-sm text-red-500">{errMsg.lastName}</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm pb-1">Day</label>
              <input
                name="date"
                type="text"
                placeholder="Day"
                className="bg-[#FFE4B0] w-full p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                onChange={hdlChange}
                value={input.date}
                maxLength={2}
              />
              <p className="text-sm text-red-500">{errMsg.birthdate}</p>
            </div>
            <div>
              <label className="block text-sm pb-1">Month</label>
              <input
                name="month"
                type="text"
                placeholder="Month"
                className="bg-[#FFE4B0] w-full p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                onChange={hdlChange}
                value={input.month}
                maxLength={2}
              />
            </div>
            <div>
              <label className="block text-sm pb-1">Year</label>
              <input
                name="year"
                type="text"
                placeholder="Year"
                className="bg-[#FFE4B0] w-full p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                onChange={hdlChange}
                value={input.year}
                maxLength={4}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm pb-1">Email</label>
            <input
              name="email"
              type="email"
              placeholder="Email"
              className="bg-[#FFE4B0] w-full p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              onChange={hdlChange}
              value={input.email}
            />
            <p className="text-sm text-red-500">{errMsg.email}</p>
          </div>
          <div>
            <label className="block text-sm pb-1">Phone</label>
            <input
              name="phone"
              type="text"
              placeholder="Phone"
              className="bg-[#FFE4B0] w-full p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              onChange={hdlChange}
              value={input.phone}
              minLength={9}
              maxLength={10}
            />
            <p className="text-sm text-red-500">{errMsg.phone}</p>
          </div>
          <div>
            <label className="block text-sm pb-1">Gender</label>
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
            <label className="block text-sm pb-1">Password</label>
            <input
              name="password"
              type="password"
              placeholder="Password"
              className="bg-[#FFE4B0] w-full p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              onChange={hdlChange}
              value={input.password}
            />
            <p className="text-sm text-red-500">{errMsg.password}</p>
          </div>
          <div>
            <label className="block text-sm pb-1">Confirm Password</label>
            <input
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              className="bg-[#FFE4B0] w-full p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              onChange={hdlChange}
              value={input.confirmPassword}
            />
            <p className="text-sm text-red-500">{errMsg.confirmPassword}</p>
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
