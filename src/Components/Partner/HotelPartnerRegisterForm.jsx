import axios from "axios";
import { use } from "framer-motion/m";
import React, { useState } from "react";
import useUserStore from "../../stores/user-store";

function HotelPartnerRegisterForm() {
  const [formData, setFormData] = useState({
    companyName: "",
    address: "",
    bankName: "",
    bankAccount: "",
    taxNo: "",
  });

  const token = useUserStore(state=>state.token)

  const handleSubmit = async (e) => {
    e.preventDefault()
    await axios.post("http://localhost:8000/partner",formData,{
        headers: { Authorization: `Bearer ${token}` },
      })
  };

  const handleChange = (e) => {
    setFormData((prv) => ({ ...prv, [e.target.name]: e.target.value }));
  };

  return (
    <form className="bg-[#fef6e4] p-8 rounded-lg shadow-md max-w-4xl mx-auto" onSubmit={handleSubmit}>
      <h2 className="text-2xl font-semibold text-center mb-8">
        Hotel Partner Registration
      </h2>
      <div className="grid grid-cols-2 gap-6">
        <div className="col-span-2">
          <label className="block text-gray-700 mb-2">Company Name</label>
          <input
            type="text"
            className="w-full p-3 rounded bg-[#fef0d6]"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            placeholder="Company Name"
          />
        </div>

        <div className="col-span-2">
          <label className="block text-gray-700 mb-2">Address</label>
          <input
            type="text"
            className="w-full p-3 rounded bg-[#fef0d6]"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Address"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-2">
            Bank Account Number
          </label>
          <input
            type="text"
            className="w-full p-3 rounded bg-[#fef0d6]"
            name="bankAccount"
            value={formData.bankAccount}
            onChange={handleChange}
            placeholder="Account Number"
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2">Bank Name</label>
          <select className="w-full p-3 rounded bg-[#fef0d6]" name="bankName" value={formData.bankName} onChange={handleChange}>
            <option>Select Bank</option>
            <option>ธนาคารกรุงเทพ</option>
            <option>ธนาคารกสิกรไทย</option>
            <option>ธนาคารกรุงไทย</option>
            <option>ธนาคารไทยพาณิชย์</option>
            <option>ธนาคารกรุงศรีอยุธยา</option>
          </select>
        </div>

        <div className="col-span-2">
          <label className="block text-gray-700 mb-2">Tax Number</label>
          <input
            type="text"
            className="w-full p-3 rounded bg-[#fef0d6]"
            name="taxNo"
            value={formData.taxNo}
            onChange={handleChange}
            placeholder="Tax Number"
          />
        </div>
      </div>
      <div className="flex justify-center mt-8">
        <button
          type="submit"
          className="bg-orange-500 text-white py-2 px-8 rounded-md"
        >
          Register Partner
        </button>
      </div>
    </form>
  );
}

export default HotelPartnerRegisterForm;
