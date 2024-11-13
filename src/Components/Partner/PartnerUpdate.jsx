import React, { useEffect, useState } from "react";
import usePartnerStore from "../../stores/partner-store";
import { useShallow } from "zustand/shallow";
import Swal from "sweetalert2";
import FormErrorAlert from '../../assets/ErrorToast1.gif'
import FormSuccessAlert from '../../assets/SuccessToast.gif'


export default function PartnerUpdate() {
  const { partner, updatePartner } = usePartnerStore(
    useShallow((state) => ({
      partner: state.partner,
      updatePartner: state.updatePartner,
    }))
  );

  const [input, setInput] = useState({
    address: '',
    bankName: '',
    bankAccount: '',
    isLoading: false,
    errMsg: '',
  });

  useEffect(() => {
    if (partner) {
      setInput((prev) => ({
        ...prev,
        address: partner.address,
        bankName: partner.bankName,
        bankAccount: partner.bankAccount,
      }));
    }
  }, [partner]);

  const hdlChange = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const confirmUpdate = async (e) => {
    e.preventDefault();
    try {
      if (
        input.address === partner.address &&
        input.bankAccount === partner.bankAccount &&
        input.bankName === partner.bankName
      ) {
        throw new Error("Change something before update");
      }
      setInput((prev) => ({ ...prev, isLoading: true }));
      const { isLoading, errMsg, ...body } = input;
      await updatePartner(body);
      setInput((prev) => ({ ...prev, errMsg: "Update Completed" }));
      //alert success
      Swal.fire({
        html: `<div class="flex items-center gap-2">
           <img src="${FormSuccessAlert}" alt="Error Animation" class="w-10 h-10" />
           <span style="font-size: 16px; font-weight: bold; color: green;">Partner Update Success</span>
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
            progressBar.style.backgroundColor = "green";
          }
          toast.addEventListener("click", Swal.close);
        },
      });
    } catch (err) {
      const errMsg = err.response?.data?.message || err.message;
      setInput((prev) => ({ ...prev, errMsg: errMsg }));
      //alert error
      Swal.fire({
        html: `<div class="flex items-center gap-2">
           <img src="${FormErrorAlert}" alt="Error Animation" class="w-10 h-10" />
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
    } finally {
      setInput((prev) => ({ ...prev, isLoading: false }));
    }
  };

  return (
    <form className="flex flex-col items-center gap-8 p-8 bg-orange-50 shadow-xl rounded-xl text-[#543310] max-w-lg mx-auto" onSubmit={confirmUpdate}>
      <h2 className="text-4xl font-bold text-orange-500 mb-6">Partner Info</h2>

      {/* Static Information */}
      <div className="w-full bg-white rounded-lg shadow-md p-4 mb-6 text-center">
        <div className="mb-4">
          <p className="text-gray-500 uppercase tracking-wide text-xs">Company Name</p>
          <p className="text-xl font-medium text-gray-800">{partner?.companyName}</p>
        </div>
        <div>
          <p className="text-gray-500 uppercase tracking-wide text-xs">Tax No.</p>
          <p className="text-xl font-medium text-gray-800">{partner?.taxNo}</p>
        </div>
      </div>

      {/* Editable Inputs */}
      <div className="w-full flex flex-col gap-4">
        {[
          { label: "Address", name: "address", value: input.address },
          { label: "Bank Name", name: "bankName", value: input.bankName },
          { label: "Bank Account", name: "bankAccount", value: input.bankAccount },
        ].map((field, idx) => (
          <div key={idx} className="w-full">
            <label className="text-gray-600 text-sm font-semibold mb-1 block">{field.label}</label>
            <input
              type="text"
              placeholder={field.label}
              name={field.name}
              value={field.value}
              onChange={hdlChange}
              className="w-full p-3 rounded-md border border-orange-300 bg-white focus:outline-none focus:ring-2 focus:ring-orange-400 transition duration-200"
            />
          </div>
        ))}
        {/* Error Message */}
        <p className={`text-sm text-center mt-2 ${input.errMsg === "Update Completed" ? "text-green-500" : "text-red-500"}`}>
          {input.errMsg}
        </p>
      </div>

      {/* Submit Button */}
      {input.isLoading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : (
        <button
          type="submit"
          className="w-full py-3 mt-4 rounded-lg bg-orange-500 text-white font-semibold shadow-lg hover:bg-orange-600 transition-all duration-300 ease-in-out focus:outline-none"
        >
          Update
        </button>
      )}
    </form>
  );
}
