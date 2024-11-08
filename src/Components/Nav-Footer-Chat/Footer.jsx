import React, { useState } from "react";
import mastercard from "../../assets/mastercard.png";
import visa from "../../assets/visa.png";
import ChatFormUser from "./ChatFormUser";

const Footer = () => {
  return (
    <>
      <footer className="w-screen bottom-0">
        <div className="relative">
          <svg viewBox="0 0 120 28" className="w-full">
            <defs>
              <mask id="mask">
                <circle cx="7" cy="12" r="40" fill="#fff" />
              </mask>
              <filter id="goo">
                <feGaussianBlur
                  in="SourceGraphic"
                  stdDeviation="2"
                  result="blur"
                />
                <feColorMatrix
                  in="blur"
                  mode="matrix"
                  values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 13 -9"
                  result="goo"
                />
                <feBlend in="SourceGraphic" in2="goo" />
              </filter>
              <path
                id="wave"
                d="M 0,10 C 30,10 30,15 60,15 90,15 90,10 120,10 150,10 150,15 180,15 210,15 210,10 240,10 v 28 h -240 z"
              />
            </defs>
            <use
              href="#wave"
              x="0"
              y="-2"
              className="wave fill-blue-500 opacity-30 animate-wave"
            />
            <use
              href="#wave"
              x="0"
              y="0"
              className="wave fill-blue-500 opacity-60 animate-waveReverse"
            />
            <g className="gooeff" style={{ filter: "url(#goo)" }}>
              <use
                id="wave1"
                href="#wave"
                x="0"
                y="1"
                className="wave fill-blue-500 animate-wave"
              />
            </g>
          </svg>

          {/* Text Sections */}
          <div className="text-white absolute top-[250px] right-0 left-0 flex justify-around">
            <div className="flex flex-col items-center">
              <p className="text-lg font-bold pb-4">PAYMENT PARTNER</p>
              <div className="flex gap-4">
                <img
                  src={mastercard}
                  alt=""
                  className="w-[70px] rounded-full bg-white "
                />
                <img
                  src={visa}
                  alt=""
                  className="w-[70px]  rounded-full bg-white "
                />
              </div>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-lg font-bold pb-4">CONTACT US</p>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-lg font-bold pb-4">FOLLOW US ON</p>
            </div>
          </div>
          <button className="fixed z-50 top-full right-0 left-0 flex justify-end items-end">
            <ChatFormUser />
          </button>
          {/* Footer Copyright */}
          <div className="bg-blue-500 text-white text-center py-2">
            Copyright © 2024 TravelCome. All rights reserved
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
