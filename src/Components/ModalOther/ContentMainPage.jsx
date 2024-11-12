import React from "react";
import tripbag from "../../assets/tripbag.png";
import envelope from "../../assets/envelope.png";
import tag from "../../assets/tag.png";
import secure from "../../assets/secure.png";

export default function ContentMainPage() {
  return (
    <>
      <div className="pb-10">
        <p className="text-2xl font-semibold  text-[#543310] text-center">
          Why book with Us ?
        </p>
        <div className="bg-cream-gradient rounded-lg p-8 mt-10 shadow-lg grid grid-cols-1 md:grid-cols-4 gap-8 text-[#543310] m-12">
          <div className="p-3 bg-white rounded-lg shadow-md flex items-center">
            <img src={tripbag} alt="" className="w-[60px] h-[60px] mr-3" />
            <div className="flex flex-col">
              <p className="text-lg font-semibold mb-2">
                One place for all your needs
              </p>
              <p className="text-sm">
                From flights, stays, to sights, just count on our complete
                products and Travel Guides.
              </p>
            </div>
          </div>
          <div className="p-3 bg-white rounded-lg shadow-md flex items-center ">
            <img src={tag} alt="" className="w-[50px] h-[50px] mr-3" />
            <div className="flex flex-col">
              <p className="text-lg font-semibold mb-2">
                Convenient Member Benefits
              </p>
              <p className="text-sm">
                Saved List and Flight Price Alert allow you to keep track of
                favorite items and monitor airfare changes.
              </p>
            </div>
          </div>
          <div className="p-3 bg-white rounded-lg shadow-md flex items-center">
            <img src={envelope} alt="" className="w-[50px] h-[50px] mr-3" />
            <div className="flex flex-col">
              <p className="text-lg font-semibold mb-2">
                Flexible booking options support
              </p>
              <p className="text-sm">
                Sudden change of plan? No worries! Reschedule or Refund without
                hassle.
              </p>
            </div>
          </div>

          <div className="p-3 bg-white rounded-lg shadow-md flex items-center ">
            <img src={secure} alt="" className="w-[50px] h-[50px] mr-3" />
            <div className="flex flex-col">
              <p className="text-lg font-semibold mb-2">
                Secure & Convenient payment
              </p>
              <p className="text-sm">
                Enjoy many secure ways to pay, in the currency that's most
                convenient for you.
              </p>
            </div>
          </div>
        </div>
      </div>
      <p className="text-2xl font-semibold mb-10 text-[#543310] text-center">
        Rediscover yourself in Thailand and beyond
      </p>
    </>
  );
}
