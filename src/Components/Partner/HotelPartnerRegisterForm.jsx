import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import FormErrorIcon from '../../assets/ErrorToast1.gif'
import { FaArrowLeftLong } from "react-icons/fa6";
import { Link } from "react-router-dom";
function HotelPartnerRegisterForm(props) {
  const { setAllFormData, partnerData, setPage } = props;
  const [input, setInput] = useState({
    companyName: "",
    address: "",
    bankAccount: "",
    bankName: "",
    taxNo: "",
  });
  const [errMsg, setErrMsg] = useState({
    overall: '',
    companyName: '',
    address: '',
    bankAccount: '',
    bankName: '',
    taxNo: '',
  });
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
  console.log(errMsg)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      validator();
      setAllFormData((prv) => ({ ...prv, partner: input }));
      setPage((prv) => prv + 1);
 


    } catch (err) {
      const errMsg = err.response?.data?.message || err.message;
      setErrMsg(prv => ({ ...prv, overall: errMsg }));
      //alert error
      Swal.fire({
        html: `<div class="flex items-center gap-2">
           <img src="${FormErrorIcon}" alt="Error Animation" class="w-10 h-10" />
           <span style="font-size: 16px; font-weight: bold; color: red;">${errMsg}</span>
         </div>`,
        position: "top-end",
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false,
        toast: true,
        background: "#ffffff",
        didOpen: (toast) => {
          const progressBar = toast.querySelector(".swal2-timer-progress-bar");
          if (progressBar) {
            progressBar.style.backgroundColor = "#f44336";
          }
          toast.addEventListener("click", Swal.close);
        },
      });

    }
  };

  const handleChange = (e) => {
    setInput((prv) => ({ ...prv, [e.target.name]: e.target.value }));
  };

  const validator = () => {
    const err  = {
      overall: '',
      companyName: '',
      address: '',
      bankAccount: '',
      bankName: '',
      taxNo: '',
    }
    if (!input.companyName) {
      err.companyName = 'Company name is required'
    }
    if (!input.address) {
      err.address = 'Address is required'
    }
    const bankAccountRegEx = /^[0-9]{8,16}$/
    if (!input.bankAccount) {
      err.bankAccount = 'Bank Account is required'
    } else if (!bankAccountRegEx.test(input.bankAccount)) {
      err.bankAccount = 'Bank Account is invalid'
    }
    if (!input.bankName) {
      err.bankName  ='Bank name is required'
    }
    if (!input.taxNo) {
      err.taxNo = 'Tax No. is required'
    } else if (input.taxNo.length !== 13) {
      err.taxNo = 'Tax No. is invalid'
    }
    setErrMsg(err)
    if(err.taxNo || err.bankName || err.bankAccount || err.address || err.companyName){
      throw new Error('You have to complete all info')
    }

  }

  return (
    <form
      className="bg-cream-gradient text-[#543310] p-8 rounded-lg shadow-md max-w-4xl mx-auto"
      onSubmit={handleSubmit}
    >
      <Link to={'/'} className="p-2 absolute cursor-pointer">
      <FaArrowLeftLong size={25} color="gray"/>
      </Link>
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
          <p className="text-sm text-red-500">{errMsg.companyName}</p>
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
          <p className="text-sm text-red-500">{errMsg.address}</p>
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
          <p className="text-sm text-red-500">{errMsg.bankAccount}</p>
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
          <p className="text-sm text-red-500">{errMsg.bankName}</p>
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
          <p className="text-sm text-red-500">{errMsg.taxNo}</p>
        </div>
      </div>
      <div className="flex flex-col justify-center mt-8">
        <p className="text-sm text-red-500">{errMsg.overall}</p>
        <div className="flex gap-2">
        <button
          type="submit"
          className="bg-gradient-to-r from-[#f08a4b] to-[#e05b3c] w-full text-white py-2 px-4 rounded-full font-bold shadow-lg transition-transform duration-200 cursor-pointer hover:scale-105 hover:shadow-[inset_0_0_8px_rgba(240,138,75,0.4),0_4px_15px_rgba(240,138,75,0.6),0_4px_15px_rgba(224,91,60,0.4)]"
        >
          NEXT
        </button>
        </div>
      </div>
    </form>
  );
}

export default HotelPartnerRegisterForm;
