import React, { useState } from "react";
import mastercard from "../../assets/mastercard.png";
import visa from "../../assets/visa.png";
import ChatFormUser from "./ChatFormUser";

const Footer = () => {
  return (
    <>
      <footer className="w-screen bottom-0">
        <div className="relative overflow-hidden">
          <svg viewBox="0 0 120 28" className="w-full relative z-10">
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

          {/* Text Sections inside the wave */}
          <div className="absolute inset-0 flex justify-around h-20 my-56 z-50">
            <div className="flex flex-col items-center text-white">
              <p className="text-lg font-bold pb-4">PAYMENT PARTNER</p>
              <div className="flex gap-4">
                <img
                  src={mastercard}
                  alt="Mastercard"
                  className="w-16 rounded-lg p-1 bg-white"
                />
                <img
                  src={visa}
                  alt="Visa"
                  className="w-16 rounded-lg p-1 bg-white"
                />
              </div>
            </div>
            <div className="flex flex-col text-white">
              <p className="text-lg font-bold pb-2">CONTACT US</p>
              <p>About Us</p>
              <p>News</p>
              <p>Condition</p>
            </div>
            <div className="flex flex-col text-white">
              <p className="text-lg font-bold pb-2">FOLLOW US ON</p>
              <p>Facebook</p>
              <p>Instagram</p>
              <p>Line official</p>
            </div>
          </div>

          {/* Chat Button */}
          <div className="fixed bottom-5 right-5 z-50">
            <ChatFormUser />
          </div>

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
