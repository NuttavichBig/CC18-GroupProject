import React, { useEffect, useState } from "react";
import usePartnerStore from "../../stores/partner-store";
import { useShallow } from "zustand/shallow";

export default function PartnerUpdate() {
  const { partner, updatePartner } = usePartnerStore(useShallow(state => ({
    partner: state.partner,
    updatePartner: state.updatePartner
  })))
  useEffect(() => {
    if (partner) {
      setInput(prv => ({
        ...prv,
        address: partner.address,
        bankName: partner.bankName,
        bankAccount: partner.bankAccount,
      }))
    }
  }, [partner])
  const [input, setInput] = useState({
    address: '',
    bankName: '',
    bankAccount: '',
    isLoading: false,
    errMsg: '',
  })
  const hdlChange = (e) => {
    setInput(prv => ({ ...prv, [e.target.name]: e.target.value }))
  }
  const confirmUpdate = async (e) => {
    e.preventDefault()
    try {
      if (input.address === partner.address && input.bankAccount === partner.bankAccount && input.bankName === partner.bankName) {
        throw new Error('Change something before update')
      }
      setInput(prv => ({ ...prv, isLoading: true }))
      const { isLoading, errMsg, ...body } = input
      await updatePartner(body)
      setInput(prv => ({ ...prv, errMsg: 'Update Completed' }))
    } catch (err) {
      const errMsg = err.response?.data?.message || err.message
      setInput(prv => ({ ...prv, errMsg: errMsg }))

    } finally {
      setInput(prv => ({ ...prv, isLoading: false }))
    }
  }
  return (
    <>
      <form className="flex flex-col gap-6 text-[#543310]" onSubmit={confirmUpdate}>
        <div className="flex flex-col items-center gap-4 border p-2 rounded-lg bg-[#F8F4E1]">
          <p className="text-4xl font-bold">PARTNER INFO</p>
          <div className="flex flex-col gap-4 mt-4">
            <div className="flex flex-col">
              <p className="w-64 text-sm space-y-0 text-gray-500 text-center">
                company name</p>
              <p className="w-64 text-2xl font-semibold text-center">
                {partner?.companyName}</p>
            </div>
            <div className="flex flex-col">
              <p className="w-64 text-sm space-y-0 text-gray-500 text-center">
                tax no.</p>
              <p className="w-64 text-xl font-semibold text-center">
                {partner?.taxNo}</p>
            </div>
          </div>
          <div className="flex flex-col gap-2 justify-start">
            <div className="flex gap-2 items-center">
              <p>ADDRESS : </p>
              <input
                type="text"
                placeholder="ADDRESS"
                name="address"
                value={input.address}
                onChange={hdlChange}
                className="bg-white border-2 border-[#543310] rounded-lg p-3 w-64 focus:outline-none focus:ring-2 focus:ring-[#F8F4E1] text-center"
              />
            </div>
            <div className="flex gap-2 items-center">
              <p>BANK NAME : </p>
              <input
                type="text"
                placeholder="BANK NAME"
                name="bankName"
                value={input.bankName}
                onChange={hdlChange}
                className="bg-white border-2 border-[#543310] rounded-lg p-3 w-64 focus:outline-none focus:ring-2 focus:ring-[#F8F4E1] text-center"
              />
            </div>
            <div className="flex gap-2 items-center">
              <p>BANK ACCOUNT : </p>
              <input
                type="text"
                placeholder="BANK ACCOUNT"
                name="bankAccount"
                value={input.bankAccount}
                onChange={hdlChange}
                className="bg-white border-2 border-[#543310] rounded-lg p-3 w-64 focus:outline-none focus:ring-2 focus:ring-[#F8F4E1] text-center"
              />
            </div>
            <p className={`text-sm ${input.errMsg === 'Update Completed' ? 'text-green-400' : 'text-red-500'}`}>{input.errMsg}</p>
            {input.isLoading ?
              <p>Loading ...</p>
              :
              <button className="mt-4 p-3 rounded-lg bg-[#543310] border-2 border-[#543310] text-white font-semibold shadow-lg hover:bg-[#FFDBB5] hover:text-[#543310] transition-all duration-300 ease-in-out">
                UPDATE
              </button>}
          </div>
        </div>
      </form>
    </>
  );
}
