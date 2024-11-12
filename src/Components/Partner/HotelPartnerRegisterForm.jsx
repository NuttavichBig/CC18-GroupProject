import React, { useEffect, useState } from "react";

function HotelPartnerRegisterForm(props) {
  const { setAllFormData, partnerData, setPage } = props;
  const [input, setInput] = useState({
    companyName: "",
    address: "",
    bankAccount: "",
    bankName: "",
    taxNo: "",
  });
  const [errMsg, setErrMsg] = useState("");
  useEffect(() => {
    if (partnerData) {
      setInput((prv) => ({
        ...prv,
        companyName: partnerData.companyName,
        address: partnerData.address,
        bankAccount: partnerData.bankAccount,
        bankName: partnerData.bankName,
        taxNo: partnerData.taxNo,
      }));
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (
        !input.companyName ||
        !input.address ||
        !input.bankAccount ||
        !input.bankName ||
        !input.taxNo
      ) {
        throw new Error("You have to complete all info");
      }
      setAllFormData((prv) => ({ ...prv, partner: input }));
      setPage((prv) => prv + 1);
    } catch (err) {
      const errMsg = err.response?.data?.message || err.message;
      setErrMsg(errMsg);
    }
  };

  const handleChange = (e) => {
    setInput((prv) => ({ ...prv, [e.target.name]: e.target.value }));
  };

  return (
    <form
      className="bg-cream-gradient text-[#543310] p-8 rounded-lg shadow-md max-w-4xl mx-auto"
      onSubmit={handleSubmit}
    >
      <h2 className="text-3xl font-semibold text-center mb-8">
        Hotel Partner Registration
      </h2>
      <div className="grid grid-cols-2 gap-6">
        <div className="col-span-2">
          <label className="block mb-2">Company Name</label>
          <input
            type="text"
            className="w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            name="companyName"
            value={input.companyName}
            onChange={handleChange}
            placeholder="Company Name"
          />
        </div>
        <div className="col-span-2">
          <label className="block  mb-2">Address</label>
          <input
            type="text"
            className="w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            name="address"
            value={input.address}
            onChange={handleChange}
            placeholder="Address"
          />
        </div>

        <div>
          <label className="block  mb-2">Bank Account Number</label>
          <input
            type="text"
            className="w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            name="bankAccount"
            value={input.bankAccount}
            onChange={handleChange}
            placeholder="Account Number"
          />
        </div>
        <div>
          <label className="block  mb-2">Bank Name</label>
          <select
            className="w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            name="bankName"
            value={input.bankName}
            onChange={handleChange}
          >
            <option>Select Bank</option>
            <option value={"ธนาคารกรุงเทพ"}>ธนาคารกรุงเทพ</option>
            <option value={"ธนาคารกสิกรไทย"}>ธนาคารกสิกรไทย</option>
            <option value={"ธนาคารกรุงไทย"}>ธนาคารกรุงไทย</option>
            <option value={"ธนาคารไทยพาณิชย์"}>ธนาคารไทยพาณิชย์</option>
            <option value={"ธนาคารกรุงศรีอยุธยา"}>ธนาคารกรุงศรีอยุธยา</option>
          </select>
        </div>

        <div className="col-span-2">
          <label className="block  mb-2">Tax Number</label>
          <input
            type="text"
            className="w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            name="taxNo"
            value={input.taxNo}
            onChange={handleChange}
            placeholder="Tax Number"
          />
        </div>
      </div>
      <div className="flex flex-col justify-center mt-8">
        <p className="text-sm text-red-500">{errMsg}</p>
        <button
          type="submit"
          className="bg-gradient-to-r from-[#f08a4b] to-[#e05b3c] text-white py-2 px-4 rounded-full font-bold shadow-lg transition-transform duration-200 cursor-pointer hover:scale-105 hover:shadow-[inset_0_0_8px_rgba(240,138,75,0.4),0_4px_15px_rgba(240,138,75,0.6),0_4px_15px_rgba(224,91,60,0.4)]"
        >
          NEXT
        </button>
      </div>
    </form>
  );
}

export default HotelPartnerRegisterForm;
