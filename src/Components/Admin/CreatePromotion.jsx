import React, { useState } from "react";

export default function CreatePromotion({ setCreatePromotion }) {
  return (
    <>
      <div
        onClick={() => setCreatePromotion(false)}
        className=" text-[#543310] flex items-center justify-center top-0 left-0 z-50 bg-[#F2F7A140] w-screen h-screen fixed"
      >
        <div
          className="border-none px-8 py-8 rounded-xl bg-[#FFFECB] shadow-xl flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          <p className="text-3xl text-center font-bold pb-10">
            CREATE PROMOTION
          </p>
        </div>
      </div>
    </>
  );
}
