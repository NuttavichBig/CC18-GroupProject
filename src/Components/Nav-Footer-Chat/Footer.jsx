import React from 'react';

const Footer = () => {
  return (
    <div className="bg-gray-100 py-8 mt-8 px-10 border-t border-gray-300">
      <div className="container mx-auto flex justify-between">

        <div className="text-center">
          <h2 className="font-semibold mb-2">Contact Us</h2>
          <div className="flex justify-center space-x-4">
            {/* <img
                            // src="https://via.placeholder.com/40"
                            
                            alt="Facebook"
                            className="w-8 h-8 cursor-pointer hover:opacity-80"
                        /> */}
            🅵
            {/* <img
                            src="https://via.placeholder.com/40"
                            alt="Line"
                            className="w-8 h-8 cursor-pointer hover:opacity-80"
                        /> */}
            💬
            {/* <img
                            src="https://via.placeholder.com/40"
                            alt="Email"
                            className="w-8 h-8 cursor-pointer hover:opacity-80"
                        /> */}
            ✉️
          </div>
        </div>

        <div className="text-center">
          <h2 className="font-semibold mb-2">About Us</h2>
          <ul className="space-y-1 text-gray-600">
            <li>Promotion</li>
            <li>Achievement</li>
            <li>News</li>
            <li>??????</li>
          </ul>
        </div>


        <div className="text-center">
          <h2 className="font-semibold mb-2">Partner</h2>
          <ul className="space-y-1 text-gray-600">
            <li>Promotion</li>
            <li>Achievement</li>
            <li>News</li>
            <li>??????</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
